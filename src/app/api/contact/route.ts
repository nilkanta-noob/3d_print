import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, project } = await request.json();

    if (!name || !email || !project) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 8px;">
        <h2 style="color: #000; border-bottom: 2px solid #eaeaea; padding-bottom: 10px;">New General Enquiry</h2>
        <p style="margin-top: 20px;"><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
        <div style="margin-top: 20px; padding: 15px; background-color: #f9fafb; border-radius: 5px; border-left: 4px solid #22d3ee;">
          <p style="margin-top: 0; margin-bottom: 10px; color: #6b7280; font-size: 14px; text-transform: uppercase; font-weight: bold;">Message / Project Details</p>
          <p style="white-space: pre-wrap; margin: 0; color: #111827;">${project}</p>
        </div>
        <p style="margin-top: 30px; font-size: 12px; color: #9ca3af;">This message was sent from the Contact Form on printwarriors.in.</p>
      </div>
    `;

    const emailPayload = {
      to: process.env.ADMIN_EMAIL || 'printwarriors.in@gmail.com',
      subject: `Enquiry from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || 'Not provided'}\n\nProject Details:\n${project}`,
      html: emailHtml,
    };

    const emailResult = await sendEmail(emailPayload);
      
    if (!emailResult.success) {
      console.error('Failed to send contact notification email:', emailResult.error);
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Message sent successfully' });

  } catch (error: unknown) {
    console.error('Error handling contact request:', error);
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Internal Server Error' }, { status: 500 });
  }
}
