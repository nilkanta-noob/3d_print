import { NextRequest, NextResponse } from 'next/server';
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
    
    const file = formData.get('file') as File;

    if (!file || !name || !email || !verifiedToken || !material) {
      return NextResponse.json({ error: 'Missing required fields or verification token' }, { status: 400 });
    }

    // Verify the JWT
    const jwtResult = verifyQuoteJwt(verifiedToken);
    if (!jwtResult.valid || jwtResult.email !== email) {
      return NextResponse.json({ error: 'Invalid or expired token. Please verify your email again.' }, { status: 401 });
    }

    // Save the STL file temporarily to /tmp (since Vercel is serverless)
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const uploadDir = tmpdir();

    // Generate safe filename to avoid path traversal/collisions
    const randomSuffix = crypto.randomUUID();
    const originalExt = file.name.split('.').pop() || 'stl';
    const safeFileName = `${Date.now()}-${randomSuffix}.${originalExt}`;
    const filePath = join(uploadDir, safeFileName);
    await writeFile(filePath, buffer);

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
            fileName: file.name,
            storageKey: safeFileName,
            fileSize: file.size,
            mimeType: file.type || 'application/octet-stream'
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
        <p>The uploaded CAD file is attached.</p>
      </div>
    `;

    const isFileTooLarge = buffer.byteLength > 25 * 1024 * 1024; // 25 MB

    const emailPayload = {
      to: process.env.ADMIN_EMAIL || 'hello@printwarriors.com',
      subject: `New Quote Request: ${order.orderNumber}`,
      text: `New quote request received from ${name} (${email}). Phone: ${phone}. Material: ${material}.`,
      html: isFileTooLarge 
        ? emailHtml + '<p style="color: red;"><strong>Note:</strong> The uploaded file was too large (over 25MB) to attach to this email. Please check the admin dashboard for the file.</p>'
        : emailHtml,
      attachments: isFileTooLarge ? undefined : [{ filename: file.name, content: buffer }]
    };

    // Send admin notification
    const emailResult = await sendEmail(emailPayload);
    
    if (!emailResult.success) {
      console.error('Failed to send admin notification email with attachment, attempting fallback without attachment...', emailResult.error);
      await sendEmail({
        ...emailPayload,
        html: emailHtml + '<p style="color: red;"><strong>Note:</strong> The uploaded file could not be attached due to size or API limits. Please check the admin dashboard for the file.</p>',
        attachments: undefined
      });
    }

    return NextResponse.json({ success: true, orderNumber: order.orderNumber });

  } catch (error: any) {
    console.error('Error handling quote request:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
