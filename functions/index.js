require("dotenv").config();

const { onRequest } = require("firebase-functions/v2/https");
const { Resend } = require("resend");

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const RESEND_FROM_EMAIL = process.env.RESEND_FROM_EMAIL;

if (!RESEND_API_KEY) {
  console.error("Missing RESEND_API_KEY in environment variables");
}

if (!RESEND_FROM_EMAIL) {
  console.error("Missing RESEND_FROM_EMAIL in environment variables");
}

const resend = new Resend(RESEND_API_KEY);

const contactHandler = onRequest(async (req, res) => {
  // CORS headers
  res.set("Access-Control-Allow-Origin", "*");

  if (req.method === "OPTIONS") {
    res.set("Access-Control-Allow-Methods", "POST");
    res.set("Access-Control-Allow-Headers", "Content-Type");
    return res.status(204).send("");
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, message } = req.body || {};

  if (!name || !email || !message) {
    console.warn("[contactForm] Missing fields:", { name: !!name, email: !!email, message: !!message });
    return res.status(400).json({ error: "Missing fields" });
  }

  try {
    console.log("[contactForm] Sending email via Resend...", { 
      from: RESEND_FROM_EMAIL, 
      to: "victoria.vavulina@gmail.com", 
      replyTo: email,
      subject: `New message from ${name}` 
    });

    await resend.emails.send({
      from: RESEND_FROM_EMAIL,
      to: "victoria.vavulina@gmail.com",
      replyTo: email,
      subject: `New message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });

    console.log("[contactForm] Email sent successfully!");
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("[contactForm] Resend error:", {
      message: err?.message,
      code: err?.code,
      stack: err?.stack,
    });
    return res.status(500).json({
      error: "Failed to send email",
      details: err?.message || String(err),
    });
  }
});

exports.contactForm = contactHandler;
exports.sendContactEmail = contactHandler;

