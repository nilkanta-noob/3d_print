import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { prisma } from '@/lib/prisma';
import { verifyQuoteJwt } from '@/lib/otp';
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
    
    const file = formData.get('file') as File;

    if (!file || !name || !email || !phone || !verifiedToken || !material) {
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
    const safeFileName = `${Date.now()}-${randomSuffix}.stl`;
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
        billingAddress: "Pending",
        billingCity: "Pending",
        billingState: "Pending",
        billingPin: "Pending",
        billingCountry: "Pending",
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

    return NextResponse.json({ success: true, orderNumber: order.orderNumber });

  } catch (error: any) {
    console.error('Error handling quote request:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
