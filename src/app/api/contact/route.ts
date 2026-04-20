import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const TO = process.env.CONTACT_EMAIL ?? "hello@arbc-agency.com";

function buildHtml(name: string, email: string, message: string): string {
  const escaped = (s: string) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New message from ${escaped(name)}</title>
</head>
<body style="margin:0;padding:0;background:#111111;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#111111;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#1c1c1c;border-radius:8px;overflow:hidden;max-width:600px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="background:#e7501e;padding:32px 40px;">
              <p style="margin:0;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:rgba(255,255,255,0.7);">New contact message</p>
              <h1 style="margin:8px 0 0;font-size:28px;font-weight:800;color:#ffffff;letter-spacing:-0.02em;">ARBC AGENCY</h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px;">

              <!-- Sender info -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
                <tr>
                  <td style="padding:16px;background:#242424;border-radius:6px;border-left:3px solid #e7501e;">
                    <p style="margin:0 0 4px;font-size:10px;letter-spacing:0.15em;text-transform:uppercase;color:rgba(255,255,255,0.45);">From</p>
                    <p style="margin:0;font-size:16px;font-weight:700;color:#e5e2e1;">${escaped(name)}</p>
                    <a href="mailto:${escaped(email)}" style="display:block;margin-top:4px;font-size:13px;color:#e7501e;text-decoration:none;">${escaped(email)}</a>
                  </td>
                </tr>
              </table>

              <!-- Message -->
              <p style="margin:0 0 12px;font-size:10px;letter-spacing:0.15em;text-transform:uppercase;color:rgba(255,255,255,0.45);">Message</p>
              <div style="background:#242424;border-radius:6px;padding:20px 24px;">
                <p style="margin:0;font-size:15px;line-height:1.75;color:#e5e2e1;white-space:pre-wrap;">${escaped(message)}</p>
              </div>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:24px 40px;border-top:1px solid rgba(255,255,255,0.06);">
              <p style="margin:0;font-size:11px;color:rgba(255,255,255,0.25);letter-spacing:0.08em;">
                © ${new Date().getFullYear()} ARBC AGENCY — KINETIC HERITAGE
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, message } = body as {
      name?: string;
      email?: string;
      message?: string;
    };

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    const { error } = await resend.emails.send({
      from: "ARBC Website <onboarding@resend.dev>",
      to: [TO],
      replyTo: email.trim(),
      subject: `New message from ${name.trim()} — ARBC Website`,
      html: buildHtml(name.trim(), email.trim(), message.trim()),
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: "Failed to send message." }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
