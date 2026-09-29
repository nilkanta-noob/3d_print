import { NextRequest, NextResponse, after } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { tmpdir } from 'os';
import crypto from 'crypto';
import { PrismaClient } from '@prisma/client';
import { sendEmail } from '@/lib/email';
import { verifyQuoteJwt } from '@/lib/otp';

const prisma = new PrismaClient();

/*
 * Everything a customer types is interpolated into the notification email's HTML. Without this, a
 * quote mentioning "5 < 10 mm" silently loses the rest of the line, and anything sharper than that is
 * markup injected straight into whatever reads our mail.
 */
function escapeHtml(value: unknown): string {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const material = formData.get('material') as string;
    const isStudent = formData.get('isStudent') === 'on';
    const studentIdUrl = formData.get('studentIdUrl') as string | null;
    const infill = formData.get('infill') as string || 'Not Specified';
    const finalize = formData.get('finalize') as string || 'Not Specified';
    const notes = ((formData.get('notes') as string) || '').trim();
    const projectType = (formData.get('projectType') as string) || 'Not specified';
    
    // Address Fields
    const country = formData.get('country') as string || 'Pending';
    const state = formData.get('state') as string || 'Pending';
    const city = formData.get('city') as string || 'Pending';
    const pincode = formData.get('pincode') as string || 'Pending';
    const fileUrl = formData.get('fileUrl') as string;
    const verifiedToken = formData.get('verifiedToken') as string;

    if (!verifiedToken || !email || !fileUrl) {
      return NextResponse.json({ error: 'Missing required fields or unverified email' }, { status: 400 });
    }

    // The field is capped in the browser too, but that cap is a convenience, not a guarantee.
    if (notes.length > 1000) {
      return NextResponse.json({ error: 'Notes must be 1000 characters or fewer.' }, { status: 400 });
    }

    // Verify the JWT
    const jwtResult = verifyQuoteJwt(verifiedToken);
    if (!jwtResult.valid || jwtResult.email !== email) {
      return NextResponse.json({ error: 'Invalid or expired token. Please verify your email again.' }, { status: 401 });
    }

    // The file is already uploaded to UploadThing.
    // We will just send the link in the email to avoid Vercel/Resend latency.
    const fileName = fileUrl.split('/').pop() || '3d_model.stl';

    // Save to Database
    const dbUser = await prisma.user.upsert({
      where: { email },
      update: { name, phone },
      create: { email, name, phone },
    });

    const order = await prisma.order.create({
      data: {
        orderNumber: `ORD-${Date.now()}`,
        userId: dbUser.id,
        quantity: 1,
        material: material,
        color: "Not Specified",
        // Kept as one string so the settings and the customer's own words travel together without a
        // schema change.
        customerNotes: `Project: ${projectType} | Infill: ${infill} | Finish: ${finalize} | Student: ${isStudent ? 'Yes' : 'No'}\n\nCustomer notes: ${notes || 'None'}`,
        billingName: name,
        billingAddress: "Pending", // Address line not provided by UI
        billingCity: city,
        billingState: state,
        billingPin: pincode,
        billingCountry: country,
        files: {
          create: {
            fileName: fileName,
            storageKey: fileUrl,
            fileSize: 0,
            mimeType: 'application/octet-stream'
          }
        }
      }
    });

    // Send admin notification
    const emailHtml = `
      <div style="font-family: Arial, sans-serif;">
        <h2 style="color: #333;">New Query Request: ${order.orderNumber}</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
        <p><strong>Material:</strong> ${escapeHtml(material)}</p>
        <p><strong>Address:</strong> ${escapeHtml(city)}, ${escapeHtml(state)} - ${escapeHtml(pincode)}</p>
        <p><strong>Project type:</strong> ${escapeHtml(projectType)}</p>
        <p><strong>Infill:</strong> ${escapeHtml(infill)}</p>
        <p><strong>Finish:</strong> ${escapeHtml(finalize)}</p>
        <p><strong>Student discount:</strong> ${isStudent ? 'Yes' : 'No'}</p>
        <div style="margin-top: 16px; padding: 14px; background-color: #f3f4f6; border-radius: 5px;">
          <p style="margin-top: 0; margin-bottom: 6px;"><strong>Customer notes:</strong></p>
          <p style="margin: 0; white-space: pre-wrap;">${notes ? escapeHtml(notes).replace(/\n/g, '<br>') : 'None'}</p>
        </div>
        ${isStudent && studentIdUrl ? `
        <div style="margin-top: 10px; padding: 10px; background-color: #fef2f2; border-radius: 5px;">
          <p style="margin-top: 0; color: #dc2626; font-weight: bold;">Student ID Verification:</p>
          <a href="${studentIdUrl}" style="color: #ef4444;">View Student ID Image</a>
        </div>
        ` : ''}
        <div style="margin-top: 20px; padding: 15px; background-color: #f3f4f6; border-radius: 5px;">
          <p style="margin-top: 0;"><strong>3D Model File:</strong></p>
          <a href="${fileUrl}?download=true" style="display: inline-block; padding: 10px 15px; background-color: #22d3ee; color: #000; text-decoration: none; font-weight: bold; border-radius: 4px;">Download CAD File</a>
          <p style="font-size: 12px; color: #6b7280; margin-bottom: 0; margin-top: 10px;">Link: ${fileUrl}</p>
          <p style="font-size: 12px; color: #ef4444; margin-top: 5px;"><strong>Note:</strong> If the file opens as unreadable text in your browser, <strong>Right-Click</strong> the button above and select <strong>"Save Link As..."</strong> to download it to your computer.</p>
        </div>
      </div>
    `;

    const emailPayload = {
      to: process.env.ADMIN_EMAIL || 'hello@printwarriors.com',
      subject: `New Query: ${order.orderNumber}`,
      text: [
        `New query received from ${name} (${email}).`,
        `Phone: ${phone}`,
        `Project type: ${projectType}`,
        `Material: ${material}`,
        `Infill: ${infill}`,
        `Finish: ${finalize}`,
        `Student discount: ${isStudent ? 'Yes' : 'No'}`,
        '',
        `Customer notes: ${notes || 'None'}`,
        '',
        `Download File: ${fileUrl}`,
      ].join('\n'),
      html: emailHtml,
      attachments: undefined // No longer attaching the file to speed up delivery
    };

    // Send admin notification in the background using Next.js 'after'
    // This allows Vercel to return the response instantly without killing the background process!
    after(async () => {
      const emailResult = await sendEmail(emailPayload);
      
      if (!emailResult.success) {
        console.error('Failed to send admin notification email:', emailResult.error);
      }
    });

    return NextResponse.json({ success: true, orderNumber: order.orderNumber });

  } catch (error: unknown) {
    console.error('Error handling quote request:', error);
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Internal Server Error' }, { status: 500 });
  }
}
