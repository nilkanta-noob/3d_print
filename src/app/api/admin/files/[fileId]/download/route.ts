import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { join } from "path";
import { readFile } from "fs/promises";
import { existsSync } from "fs";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ fileId: string }> }
) {
  try {
    // 1. Verify ADMIN session
    const session = await getServerSession(authOptions);
    if (!session || (session.user as { role?: string })?.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { fileId } = await params;

    // 2. Look up the File by ID
    const fileRecord = await prisma.file.findUnique({
      where: { id: fileId },
    });

    if (!fileRecord) {
      return NextResponse.json({ error: "File not found in database" }, { status: 404 });
    }

    // 3. Read the file securely from /uploads using storageKey
    const uploadDir = join(process.cwd(), 'uploads');
    const filePath = join(uploadDir, fileRecord.storageKey);

    // Prevent directory traversal attacks by ensuring the resolved path is within uploadDir
    if (!filePath.startsWith(uploadDir)) {
      return NextResponse.json({ error: "Invalid file path" }, { status: 400 });
    }

    if (!existsSync(filePath)) {
      return NextResponse.json({ error: "File not found on disk" }, { status: 404 });
    }

    const fileBuffer = await readFile(filePath);

    // 4. Return as download with ORIGINAL fileName
    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": fileRecord.mimeType || "application/octet-stream",
        "Content-Disposition": `attachment; filename="${fileRecord.fileName}"`,
      },
    });

  } catch (error) {
    console.error("Error downloading file:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
