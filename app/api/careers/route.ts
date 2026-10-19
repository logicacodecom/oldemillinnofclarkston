import { NextResponse } from "next/server";
import { en } from "@/lib/dictionaries/en";
import { careersEmail, isResumeFile, positions, resumeMaxBytes, type Position } from "@/lib/careers";
import { gmailConfigured, sendGmail } from "@/lib/mail";

// Job application handler: never accepts-and-drops an application.
// Delivery order: Gmail with the résumé attached (GMAIL_USER + GMAIL_APP_PASSWORD)
// → webhook (CONTACT_WEBHOOK_URL) → 501 so the form shows a clear error.
export async function POST(request: Request) {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const get = (key: string, max: number) => String(form.get(key) ?? "").trim().slice(0, max);
  // Honeypot: a hidden field people never see. Bots that fill it get a fake success.
  if (get("website", 200)) return NextResponse.json({ ok: true });

  const name = get("name", 200);
  const email = get("email", 200);
  const phone = get("phone", 50);
  const position = get("position", 50);
  const availability = get("availability", 1000);
  const message = get("message", 5000);
  const spanish = form.get("lang") === "es";
  const validPosition = position === "general" || (positions as readonly string[]).includes(position);
  if (!name || !email || !phone || !email.includes("@") || !validPosition) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }
  const positionTitle =
    position === "general" ? en.careersForm.general : en.careers.positions[position as Position].title;

  const file = form.get("resume");
  let resume: { filename: string; bytes: Buffer } | null = null;
  if (file instanceof File && file.size > 0) {
    if (file.size > resumeMaxBytes) {
      return NextResponse.json({ error: "Résumé is too large." }, { status: 413 });
    }
    if (!isResumeFile(file.name)) {
      return NextResponse.json({ error: "Unsupported résumé file type." }, { status: 415 });
    }
    resume = {
      filename: file.name.replace(/[^\w.\- ]+/g, "_").slice(-100),
      bytes: Buffer.from(await file.arrayBuffer()),
    };
  }

  const webhook = process.env.CONTACT_WEBHOOK_URL;

  // Preferred: email it through Gmail.
  if (gmailConfigured()) {
    const text = [
      "New job application from oldemillinnofclarkston.com (South location)",
      "",
      spanish ? "Language: Spanish (submitted from the Spanish site)" : "",
      `Position: ${positionTitle}`,
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      availability ? `Availability: ${availability}` : "",
      `Résumé: ${resume ? `attached (${resume.filename})` : "none"}`,
      "",
      message ? "About the applicant:" : "",
      message,
    ]
      .filter(Boolean)
      .join("\n");
    try {
      await sendGmail(
        {
          to: careersEmail,
          replyTo: email,
          subject: `Job application (South): ${positionTitle}${spanish ? " (Español)" : ""} — ${name}`,
          text,
          ...(resume ? { attachments: [{ filename: resume.filename, content: resume.bytes }] } : {}),
        },
        "Olde Mill Inn Website"
      );
      return NextResponse.json({ ok: true });
    } catch {
      return NextResponse.json({ error: "Could not deliver application." }, { status: 502 });
    }
  }

  // Fallback: forward the submission (résumé as base64) to a configured webhook.
  if (webhook) {
    try {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "job_application",
          name,
          email,
          phone,
          position: positionTitle,
          availability,
          message,
          lang: spanish ? "es" : "en",
          resume: resume && { filename: resume.filename, content: resume.bytes.toString("base64") },
          source: "oldemillinnofclarkston.com/careers",
        }),
      });
      if (!res.ok) throw new Error(`Webhook ${res.status}`);
      return NextResponse.json({ ok: true });
    } catch {
      return NextResponse.json({ error: "Could not deliver application." }, { status: 502 });
    }
  }

  // Nothing wired yet — fail loudly rather than silently discarding.
  return NextResponse.json({ error: "Careers backend is not configured." }, { status: 501 });
}
