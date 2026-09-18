import { NextRequest, NextResponse } from 'next/server';
import { verifyOtpForEmail, generateQuoteJwt } from '@/lib/otp';

export async function POST(request: NextRequest) {
  try {
    const { email, otp } = await request.json();

    if (!email || !otp) {
      return NextResponse.json({ error: 'Missing email or OTP' }, { status: 400 });
    }

    const isValid = await verifyOtpForEmail(email, otp);

    if (!isValid) {
      return NextResponse.json({ error: 'Invalid or expired OTP' }, { status: 400 });
    }

    // Generate a short-lived JWT for the quote submission
    const verifiedToken = generateQuoteJwt(email);

    return NextResponse.json({ success: true, verifiedToken });
  } catch (error) {
    console.error('Error in verify-otp:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
