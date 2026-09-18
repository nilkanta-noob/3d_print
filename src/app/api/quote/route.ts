import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { tmpdir } from 'os';
import crypto from 'crypto';
import { PrismaClient } from '@prisma/client';
import { sendEmail } from '@/lib/email';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const material = formData.get('material') as string;
    const isStudent = formData.get('isStudent') === 'on';
    
    const file = formData.get('file') as File;
    const studentIdFile = formData.get('studentId') as File | null;
    const infill = formData.get('infill') as string || 'Not Specified';
    const finalize = formData.get('finalize') as string || 'Not Specified';
    
    // Address Fields
    const country = formData.get('country') as string || 'Pending';
    const state = formData.get('state') as string || 'Pending';
    const city = formData.get('city') as string || 'Pending';
    const pincode = formData.get('pincode') as string || 'Pending';

    if (!file || !name || !email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Extract the STL file buffer directly (No local saving needed for Vercel)
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);


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
        customerNotes: `Infill: ${infill}, Finalize: ${finalize}, Student: ${isStudent ? 'Yes' : 'No'}`,
        billingName: name,
        billingAddress: "Pending", // Address line not provided by UI
        billingCity: city,
        billingState: state,
        billingPin: pincode,
        billingCountry: country,
        files: {
          create: {
            fileName: file.name,
            storageKey: file.name,
            fileSize: file.size,
            mimeType: file.type || 'application/octet-stream'
          }
        }
      }
    });

    // Send admin notification
    const emailHtml = `
      <div style="font-family: Arial, sans-serif;">
        <h2 style="color: #333;">New Query Request: ${order.orderNumber}</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Material:</strong> ${material}</p>
        <p><strong>Address:</strong> ${city}, ${state} - ${pincode}</p>
        <p><strong>Notes:</strong> Infill: ${infill}, Finalize: ${finalize}, Student: ${isStudent ? 'Yes' : 'No'}</p>
        <p>The uploaded CAD file is attached.</p>
      </div>
    `;

    const isFileTooLarge = buffer.byteLength > 35 * 1024 * 1024; // 35 MB limit (Resend max is 40MB)

    const attachmentsList = [];
    if (!isFileTooLarge) {
      attachmentsList.push({ filename: file.name, content: buffer });
    }

    if (isStudent && studentIdFile && studentIdFile.size > 0) {
      const studentIdBytes = await studentIdFile.arrayBuffer();
      const studentIdBuffer = Buffer.from(studentIdBytes);
      attachmentsList.push({ filename: `Student_ID_${studentIdFile.name}`, content: studentIdBuffer });
    }

    const emailPayload = {
      to: process.env.ADMIN_EMAIL || 'hello@printwarriors.com',
      subject: `New Query Request: ${order.orderNumber}`,
      text: `New query request received from ${name} (${email}). Phone: ${phone}. Material: ${material}.`,
      html: isFileTooLarge 
        ? emailHtml + '<p style="color: #eab308;"><strong>Note:</strong> The 3D file was larger than 35MB so it could not be attached due to Resend API limits.</p>'
        : emailHtml,
      attachments: attachmentsList.length > 0 ? attachmentsList : undefined
    };

    // Send admin notification (Must use await so Vercel doesn't kill the background process)
    const emailResult = await sendEmail(emailPayload);
    
    if (!emailResult.success) {
      console.error('Failed to send admin notification email with attachment, attempting fallback without attachment...', emailResult.error);
      const fallbackResult = await sendEmail({
        ...emailPayload,
        html: emailHtml + '<p style="color: red;"><strong>Note:</strong> The file attachment failed (likely due to Resend API timeout).</p>',
        attachments: undefined
      });
      if (!fallbackResult.success) {
        console.error('Fallback email also failed:', fallbackResult.error);
      }
    }

    return NextResponse.json({ success: true, orderNumber: order.orderNumber });

  } catch (error: any) {
    console.error('Error handling quote request:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
