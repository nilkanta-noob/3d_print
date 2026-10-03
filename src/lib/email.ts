import { Resend } from 'resend';

interface SendEmailOptions {
  to: string;
  subject: string;
  text: string;
  html?: string;
  attachments?: { filename: string; content: Buffer | string }[];
}

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail({ to, subject, text, html, attachments }: SendEmailOptions) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'PrintWarriors <noreply@printwarriors.in>', // Custom domain to allow sending to anyone
      to: [to],
      subject: subject,
      text: text,
      html: html,
      attachments: attachments,
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
