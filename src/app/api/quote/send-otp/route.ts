import { NextRequest, NextResponse } from 'next/server';
import { createOtpForEmail } from '@/lib/otp';
import { sendEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Generate and store OTP
    const otp = await createOtpForEmail(email);

    // Send OTP via email (currently mocked)
    const emailResult = await sendEmail({
      to: email,
      subject: 'Your 3D Printing Quote OTP',
      text: `Hello,\n\nYour OTP for the 3D printing quote request is: ${otp}\n\nThis OTP is valid for 10 minutes.\n\nThank you!`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 5px;">
          <h2 style="color: #333; margin-top: 0;">3D Printing Quote Request</h2>
          <p style="color: #555; line-height: 1.5;">Hello,</p>
          <p style="color: #555; line-height: 1.5;">Your One-Time Password (OTP) for the 3D printing quote request is:</p>
          <div style="background-color: #f4f4f4; padding: 15px; border-radius: 5px; text-align: center; margin: 20px 0;">
            <strong style="font-size: 24px; letter-spacing: 2px; color: #333;">${otp}</strong>
          </div>
          <p style="color: #555; line-height: 1.5; font-size: 14px;">This OTP is valid for 10 minutes.</p>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
          <p style="color: #888; font-size: 12px; margin-bottom: 0;">Thank you for using our service.</p>
        </div>
      `,
    });

    if (!emailResult.success) {
      console.error('Failed to send OTP email:', (emailResult as any).error);
      return NextResponse.json({ error: 'Failed to send OTP email' }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'OTP sent successfully' });
  } catch (error) {
    console.error('Error in send-otp:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
