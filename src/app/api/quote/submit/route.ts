import { NextRequest, NextResponse, after } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { prisma } from '@/lib/prisma';
import { verifyQuoteJwt } from '@/lib/otp';
import { sendEmail } from '@/lib/email';
import crypto from 'crypto';

import { tmpdir } from 'os';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const material = formData.get('material') as string;
    const verifiedToken = formData.get('verifiedToken') as string;
    
    // Address Fields
    const country = formData.get('country') as string || 'Pending';
    const state = formData.get('state') as string || 'Pending';
    const city = formData.get('city') as string || 'Pending';
    const pincode = formData.get('pincode') as string || 'Pending';
    
    const fileUrl = formData.get('fileUrl') as string;

    if (!fileUrl || !name || !email || !verifiedToken || !material) {
      return NextResponse.json({ error: 'Missing required fields or verification token' }, { status: 400 });
    }

    // Verify the JWT
    const jwtResult = verifyQuoteJwt(verifiedToken);
    if (!jwtResult.valid || jwtResult.email !== email) {
      return NextResponse.json({ error: 'Invalid or expired token. Please verify your email again.' }, { status: 401 });
    }

    // The file is already uploaded to UploadThing.
    // We will just send the link in the email to avoid Vercel/Resend latency.
    let fileName = fileUrl.split('/').pop() || '3d_model.stl';

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
        <h2 style="color: #333;">New Quote Request: ${order.orderNumber}</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Material:</strong> ${material}</p>
        <p><strong>Address:</strong> ${city}, ${state}, ${country} - ${pincode}</p>
        <div style="margin-top: 20px; padding: 15px; background-color: #f3f4f6; border-radius: 5px;">
          <p style="margin-top: 0;"><strong>3D Model File:</strong></p>
          <a href="${fileUrl}" style="display: inline-block; padding: 10px 15px; background-color: #22d3ee; color: #000; text-decoration: none; font-weight: bold; border-radius: 4px;">Download CAD File</a>
          <p style="font-size: 12px; color: #6b7280; margin-bottom: 0; margin-top: 10px;">Link: ${fileUrl}</p>
        </div>
      </div>
    `;

    const emailPayload = {
      to: process.env.ADMIN_EMAIL || 'hello@printwarriors.com',
      subject: `New Quote Request: ${order.orderNumber}`,
      text: `New quote request received from ${name} (${email}). Phone: ${phone}. Material: ${material}. Download Link: ${fileUrl}`,
      html: emailHtml,
      attachments: undefined
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

  } catch (error: any) {
    console.error('Error handling quote request:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
