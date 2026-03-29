import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Name, email and message are required." }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"${name}" <${process.env.GMAIL_USER}>`,
      to: process.env.CONTACT_RECEIVER,
      replyTo: email,
      subject: subject ? `[Portfolio] ${subject}` : `[Portfolio] New message from ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #0a0d0a; color: #fff7da; border-radius: 12px;">
          <h2 style="margin: 0 0 24px; font-size: 24px; letter-spacing: -0.03em;">New message from your portfolio</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,247,218,0.1); color: rgba(255,247,218,0.5); font-size: 12px; width: 100px;">NAME</td>
              <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,247,218,0.1); font-size: 15px;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,247,218,0.1); color: rgba(255,247,218,0.5); font-size: 12px;">EMAIL</td>
              <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,247,218,0.1); font-size: 15px;">${email}</td>
            </tr>
            ${subject ? `
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,247,218,0.1); color: rgba(255,247,218,0.5); font-size: 12px;">SUBJECT</td>
              <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,247,218,0.1); font-size: 15px;">${subject}</td>
            </tr>` : ""}
            <tr>
              <td style="padding: 12px 0; color: rgba(255,247,218,0.5); font-size: 12px; vertical-align: top; padding-top: 20px;">MESSAGE</td>
              <td style="padding: 12px 0; font-size: 15px; line-height: 1.7; padding-top: 20px;">${message.replace(/\n/g, "<br/>")}</td>
            </tr>
          </table>
          <p style="margin-top: 32px; font-size: 12px; color: rgba(255,247,218,0.3);">Sent from hemanthkonduri.dev · Reply directly to this email to respond to ${name}.</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json({ error: "Failed to send message. Please try again." }, { status: 500 });
  }
}
