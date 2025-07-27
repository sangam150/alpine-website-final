import { Resend } from "resend";

export const resend = new Resend(process.env.RESEND_API_KEY);

export interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
  from?: string;
  replyTo?: string;
  attachments?: Array<{
    filename: string;
    content: string;
    encoding: string;
  }>;
}

export async function sendTransactionalEmail({
  to,
  subject,
  html,
  from,
  replyTo,
  attachments,
}: SendEmailOptions) {
  try {
    const response = await resend.emails.send({
      from: from || "Alpine Education <no-reply@alpinevisa.com.np>",
      to,
      subject,
      html,
      reply_to: replyTo,
      attachments,
    });
    return { success: true, data: response };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to send email" };
  }
}
