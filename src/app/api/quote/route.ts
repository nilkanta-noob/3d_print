import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { PrismaClient } from '@prisma/client';

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

    if (!file || !name || !email || !phone) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Save the STL file locally
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const uploadDir = join(process.cwd(), 'uploads');
    
    // Ensure uploads directory exists
    try {
      await mkdir(uploadDir, { recursive: true });
    } catch (e) {
      // Ignore if exists
    }

    const fileName = `${Date.now()}-${file.name.replace(/\s+/g, '_')}`;
    const filePath = join(uploadDir, fileName);
    await writeFile(filePath, buffer);

    // Save to Database (Disabled during UI redesign phase until Auth/Order schema is finalized in Phase 5)
    /*
    const quotation = await prisma.quotationRequest.create({
      data: {
        name,
        email,
        phone,
        material,
        isStudent,
        filePath: fileName,
      }
    });
    */

    return NextResponse.json({ success: true, quotation: { filePath: fileName } });

  } catch (error) {
    console.error('Error handling quote request:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
