import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  message: z.string().trim().min(1).max(2000),
});

const escapeHtml = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

async function sendBrevoEmail(payload: {
  to: { email: string; name?: string }[];
  subject: string;
  htmlContent: string;
  sender: { email: string; name: string };
  replyTo?: { email: string; name?: string };
}) {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) throw new Error("BREVO_API_KEY is not configured");

  const res = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "api-key": apiKey,
      "content-type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Brevo API error [${res.status}]: ${body}`);
  }
  return res.json();
}

export const Route = createFileRoute("/api/contact")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const json = await request.json();
          const parsed = contactSchema.safeParse(json);
          if (!parsed.success) {
            return Response.json(
              { error: "Invalid input", details: parsed.error.flatten() },
              { status: 400 },
            );
          }

          const { name, email, message } = parsed.data;
          const senderEmail = process.env.BREVO_SENDER_EMAIL;
          const senderName = process.env.BREVO_SENDER_NAME ?? "VenomUniverse";
          const notifyEmail = process.env.BREVO_NOTIFY_EMAIL ?? senderEmail;

          if (!senderEmail) {
            return Response.json(
              { error: "Sender email not configured" },
              { status: 500 },
            );
          }

          const safeName = escapeHtml(name);
          const safeEmail = escapeHtml(email);
          const safeMessage = escapeHtml(message).replace(/\n/g, "<br/>");

          // 1) Confirmation to the visitor
          const confirmationHtml = `
<!doctype html><html><body style="margin:0;background:#000;font-family:Inter,Arial,sans-serif;color:#fff">
  <div style="max-width:560px;margin:0 auto;padding:48px 32px;background:#0a0a0a;border:1px solid #1f1f1f">
    <div style="text-align:center;margin-bottom:32px">
      <div style="font-family:Anton,Impact,sans-serif;font-size:42px;letter-spacing:-0.02em;line-height:1">WE ARE VENOM</div>
      <div style="color:#888;font-size:11px;letter-spacing:0.3em;margin-top:8px">THE BOND IS FORMED</div>
    </div>
    <p style="font-size:15px;line-height:1.7;color:#e5e5e5">Hello ${safeName},</p>
    <p style="font-size:15px;line-height:1.7;color:#e5e5e5">
      Your transmission has reached the hive. The Symbiote has acknowledged your bond — expect first access drops, lore, and signals from the Spider-Man Universe straight to your inbox.
    </p>
    <div style="border-left:2px solid #fff;padding:12px 16px;margin:24px 0;background:#111;color:#bdbdbd;font-size:13px">
      <strong style="color:#fff;display:block;margin-bottom:6px">Your message</strong>
      ${safeMessage}
    </div>
    <p style="font-size:13px;color:#888;line-height:1.6">No noise. Only the Hive.</p>
    <p style="font-size:13px;color:#888;line-height:1.6">— ${escapeHtml(senderName)}</p>
    <hr style="border:none;border-top:1px solid #1f1f1f;margin:32px 0"/>
    <p style="font-size:11px;color:#555;text-align:center;letter-spacing:0.15em">VENOMUNIVERSE • SYMBIOTE TRANSMISSION</p>
  </div>
</body></html>`.trim();

          // 2) Notification to the site owner
          const notifyHtml = `
<!doctype html><html><body style="margin:0;background:#0a0a0a;font-family:Inter,Arial,sans-serif;color:#fff">
  <div style="max-width:560px;margin:0 auto;padding:32px;background:#111;border:1px solid #222">
    <h2 style="font-family:Anton,Impact,sans-serif;font-size:28px;margin:0 0 16px">NEW HIVE TRANSMISSION</h2>
    <table style="width:100%;font-size:14px;color:#ddd;border-collapse:collapse">
      <tr><td style="padding:6px 0;color:#888;width:90px">Name</td><td>${safeName}</td></tr>
      <tr><td style="padding:6px 0;color:#888">Email</td><td><a href="mailto:${safeEmail}" style="color:#fff">${safeEmail}</a></td></tr>
    </table>
    <div style="margin-top:20px;padding:16px;background:#0a0a0a;border-left:2px solid #fff;color:#e5e5e5;font-size:14px;line-height:1.6">
      ${safeMessage}
    </div>
  </div>
</body></html>`.trim();

          await Promise.all([
            sendBrevoEmail({
              to: [{ email, name }],
              subject: "The bond is formed — welcome to the Hive",
              htmlContent: confirmationHtml,
              sender: { email: senderEmail, name: senderName },
              replyTo: { email: notifyEmail!, name: senderName },
            }),
            sendBrevoEmail({
              to: [{ email: notifyEmail!, name: senderName }],
              subject: `New Hive transmission from ${name}`,
              htmlContent: notifyHtml,
              sender: { email: senderEmail, name: senderName },
              replyTo: { email, name },
            }),
          ]);

          return Response.json({ success: true });
        } catch (err) {
          console.error("Contact form error:", err);
          const msg = err instanceof Error ? err.message : "Unknown error";
          return Response.json({ error: msg }, { status: 500 });
        }
      },
    },
  },
});
