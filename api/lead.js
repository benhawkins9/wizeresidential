// Vercel serverless function — handles lead-form submissions for wizeresidential.com.
// On submit it sends TWO emails via Resend:
//   1) a notification to the business (reply-to = the lead, so you reply straight to them)
//   2) a branded auto-reply to the lead from the business address
//
// Required env var (set in Vercel → Project → Settings → Environment Variables):
//   RESEND_API_KEY    — from resend.com (domain wizeresidential.com must be verified)
// Optional overrides:
//   LEAD_FROM         — default "Wise Residential <hello@wizeresidential.com>"
//   LEAD_NOTIFY_TO    — where lead notifications go (default below)
//   LEAD_REPLY_TO     — reply-to on the lead's auto-reply (default below)
//
// The site is static; Vercel serves this file as a serverless function at /api/lead.

const FROM = process.env.LEAD_FROM || "Wise Residential <hello@wizeresidential.com>";
const NOTIFY_TO = process.env.LEAD_NOTIFY_TO || "cwise@wizeresidential.com";
const REPLY_TO = process.env.LEAD_REPLY_TO || "cwise@wizeresidential.com";

const INK = "#1c222a";
const SKY = "#2f8db4";
const ORANGE = "#e8740f";

const esc = (s = "") =>
  String(s).replace(/[<>&"]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;" }[c]));

function isEmail(v) {
  return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v);
}

async function sendEmail(key, payload) {
  const r = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!r.ok) {
    const detail = await r.text().catch(() => "");
    throw new Error(`Resend ${r.status}: ${detail}`);
  }
  return r.json();
}

function notifyHtml(d) {
  const row = (label, value) =>
    value
      ? `<tr><td style="padding:6px 14px 6px 0;color:#5b6b80;font-size:13px;white-space:nowrap;vertical-align:top">${label}</td><td style="padding:6px 0;color:${INK};font-size:14px"><strong>${esc(value)}</strong></td></tr>`
      : "";
  return `<div style="font-family:-apple-system,Segoe UI,Roboto,Arial,sans-serif;max-width:560px;margin:0 auto">
    <div style="background:${INK};color:#fff;padding:18px 24px;border-radius:12px 12px 0 0">
      <div style="font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:${ORANGE}">New estimate request</div>
      <div style="font-size:20px;font-weight:800;margin-top:2px">${esc(d.name)}${d.city ? " · " + esc(d.city) : ""}</div>
    </div>
    <div style="border:1px solid #e2e8f0;border-top:0;border-radius:0 0 12px 12px;padding:20px 24px">
      <table style="border-collapse:collapse;width:100%">
        ${row("Email", d.email)}
        ${row("Phone", d.phone)}
        ${row("City", d.city)}
        ${row("Needs", d.interest)}
        ${row("Source", d.source)}
      </table>
      ${d.message ? `<div style="margin-top:14px;padding:14px;background:#f1f5f9;border-radius:8px;color:${INK};font-size:14px;line-height:1.6">${esc(d.message).replace(/\n/g, "<br>")}</div>` : ""}
      <div style="margin-top:18px">
        ${d.phone ? `<a href="tel:${esc(d.phone)}" style="display:inline-block;background:${SKY};color:#fff;text-decoration:none;padding:9px 16px;border-radius:8px;font-weight:600;font-size:14px;margin-right:8px">Call ${esc(d.phone)}</a>` : ""}
        <a href="mailto:${esc(d.email)}" style="display:inline-block;background:#eef2f7;color:${INK};text-decoration:none;padding:9px 16px;border-radius:8px;font-weight:600;font-size:14px">Reply by email</a>
      </div>
    </div>
  </div>`;
}

function autoReplyHtml(d) {
  return `<div style="font-family:-apple-system,Segoe UI,Roboto,Arial,sans-serif;max-width:560px;margin:0 auto">
    <div style="background:${INK};color:#fff;padding:24px;border-radius:12px 12px 0 0">
      <div style="font-size:20px;font-weight:800">Wise Residential</div>
      <div style="color:#9fb0bd;font-size:13px;margin-top:2px">A healthy home starts with a 'Wise' decision</div>
    </div>
    <div style="border:1px solid #e2e8f0;border-top:0;border-radius:0 0 12px 12px;padding:24px">
      <p style="color:${INK};font-size:16px;line-height:1.6;margin:0 0 14px">Hi ${esc(d.name.split(" ")[0] || d.name)},</p>
      <p style="color:#33475b;font-size:15px;line-height:1.7;margin:0 0 14px">
        Thanks for reaching out to Wise Residential — your request came through and I've got it.
      </p>
      <p style="color:#33475b;font-size:15px;line-height:1.7;margin:0 0 14px">
        <strong>What happens next:</strong> I'll review the details (photos help — feel free to text some over),
        then get back to you within <strong>one business day</strong> with a fair estimate and the next step.
        As a new customer, you've got <strong>$10 off your first service</strong>.
      </p>
      <p style="color:#33475b;font-size:15px;line-height:1.7;margin:0 0 20px">
        Need it sooner? Just call or text me at
        <a href="tel:+12512729682" style="color:${SKY};font-weight:600;text-decoration:none">(251) 272-9682</a>.
      </p>
      <a href="https://www.wizeresidential.com" style="display:inline-block;background:${ORANGE};color:#fff;text-decoration:none;padding:11px 20px;border-radius:8px;font-weight:700;font-size:15px">Visit wizeresidential.com</a>
      <p style="color:${INK};font-size:15px;line-height:1.6;margin:24px 0 0">
        Talk soon,<br><strong>Chris Wise</strong><br>
        <span style="color:#5b6b80;font-size:14px">Owner, Wise Residential</span>
      </p>
    </div>
    <p style="color:#94a3b8;font-size:12px;text-align:center;margin:16px 0 0">
      Wise Residential · Ocean Springs, MS · (251) 272-9682 · Licensed &amp; insured
    </p>
  </div>`;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ success: false, error: "Method not allowed" });
  }

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    // Not configured yet → tell the client so it shows the call-us fallback.
    return res.status(503).json({ success: false, error: "Email service not configured." });
  }

  // Parse body (Vercel usually pre-parses JSON; guard for string just in case).
  let d = req.body;
  if (typeof d === "string") {
    try { d = JSON.parse(d); } catch { d = {}; }
  }
  d = d || {};

  // Honeypot — pretend success, send nothing.
  if (d.botcheck) return res.status(200).json({ success: true });

  const data = {
    name: String(d.name || "").trim(),
    email: String(d.email || "").trim(),
    phone: String(d.phone || "").trim(),
    city: String(d.city || "").trim(),
    interest: String(d.interest || "").trim(),
    message: String(d.message || "").trim(),
    source: String(d.source || "website").trim(),
  };

  if (!data.name || !isEmail(data.email)) {
    return res.status(400).json({ success: false, error: "A name and valid email are required." });
  }

  try {
    // 1) Notify the business — reply-to the lead so you can answer them directly.
    await sendEmail(key, {
      from: FROM,
      to: [NOTIFY_TO],
      reply_to: data.email,
      subject: `🔨 New estimate request: ${data.name}${data.city ? " — " + data.city : ""}`,
      html: notifyHtml(data),
    });

    // 2) Branded auto-reply to the lead (best-effort — never fail the lead on this).
    try {
      await sendEmail(key, {
        from: FROM,
        to: [data.email],
        reply_to: REPLY_TO,
        subject: "Thanks — I've got your request | Wise Residential",
        html: autoReplyHtml(data),
      });
    } catch (e) {
      console.error("Auto-reply failed (lead still captured):", e);
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Lead notification failed:", err);
    return res.status(502).json({ success: false, error: "Could not send right now." });
  }
}
