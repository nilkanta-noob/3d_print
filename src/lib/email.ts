import { Resend } from 'resend';

interface SendEmailOptions {
  to: string;
  subject: string;
  text: string;
  html?: string;
}

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail({ to, subject, text, html }: SendEmailOptions) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'PrintWarriors <onboarding@resend.dev>', // Default testing domain provided by Resend
      to: [to],
      subject: subject,
      text: text,
      html: html,
    });

    if (error) {
      console.error('Resend API Error:', error);
      return { success: false, error };
    }

    return { success: true, messageId: data?.id };
  } catch (err) {
    console.error('Failed to send email via Resend:', err);
    return { success: false, error: err };
  }
}
