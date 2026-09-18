import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
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

    if (!file || !name || !email || !phone) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Save the STL file locally
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const uploadDir = tmpdir();
    
    const randomSuffix = crypto.randomUUID();
    const fileName = `${Date.now()}-${randomSuffix}-${file.name.replace(/\s+/g, '_')}`;
    const filePath = join(uploadDir, fileName);
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
        customerNotes: `Infill: ${infill}, Finalize: ${finalize}, Student: ${isStudent ? 'Yes' : 'No'}`,
        billingName: name,
        billingAddress: "Pending",
        billingCity: "Pending",
        billingState: "Pending",
        billingPin: "Pending",
        billingCountry: "Pending",
        files: {
          create: {
            fileName: file.name,
            storageKey: fileName,
            fileSize: file.size,
            mimeType: file.type || 'application/octet-stream'
          }
        }
      }
    });

    // Send confirmation email to user
    await sendEmail({
      to: email,
      subject: 'Quotation Request Received - PrintWarriors',
      text: `Hello ${name},\n\nThank you for submitting your quotation request. We have received your 3D model and requirements (Material: ${material}).\n\nWe will review your request and reply to you within 30 minutes to 1 hour.\n\nYour Order Number is ${order.orderNumber}.\n\nBest regards,\nThe PrintWarriors Team`,
    });

    return NextResponse.json({ success: true, orderNumber: order.orderNumber });

  } catch (error: any) {
    console.error('Error handling quote request:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
