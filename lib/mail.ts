import "server-only";
import nodemailer from "nodemailer";

// Form email goes out through a Gmail account over SMTP, signed in with a Google
// app password (Google Account → Security → 2-Step Verification → App passwords).
// Env: GMAIL_USER (the address) and GMAIL_APP_PASSWORD (16 characters, spaces optional).

export type Mail = {
  to: string;
  replyTo: string;
  subject: string;
  text: string;
  attachments?: { filename: string; content: Buffer }[];
};

export function gmailConfigured(): boolean {
  return Boolean(process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD);
}

// Throws if Gmail rejects the message, so callers can show the form's error state.
export async function sendGmail(mail: Mail, fromName: string): Promise<void> {
  const user = process.env.GMAIL_USER as string;
  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass: (process.env.GMAIL_APP_PASSWORD as string).replace(/\s+/g, "") },
  });
  await transport.sendMail({ from: { name: fromName, address: user }, ...mail });
}
