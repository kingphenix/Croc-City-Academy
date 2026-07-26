/**
 * Vercel Serverless Function — POST /api/contact
 *
 * Receives registration enquiry form data, validates & sanitizes it,
 * then sends a branded email to the academy inbox via Resend
 * and a confirmation email back to the applicant.
 *
 * Fields: name, phone, email, childAge, homeAddress
 */

import { Resend } from 'resend';
import { buildAdminEmail, buildConfirmationEmail } from './lib/email-template.js';

// ---------------------------------------------------------------------------
// Rate-limiter (simple in-memory sliding window, per cold-start instance)
// ---------------------------------------------------------------------------
const RATE_WINDOW_MS = 60_000; // 1 minute
const RATE_MAX = 10;           // max requests per IP per window
const ipHits = new Map();      // ip → [timestamp, timestamp, …]

function isRateLimited(ip) {
  const now = Date.now();
  const hits = (ipHits.get(ip) || []).filter((t) => now - t < RATE_WINDOW_MS);
  hits.push(now);
  ipHits.set(ip, hits);
  return hits.length > RATE_MAX;
}

// ---------------------------------------------------------------------------
// Input helpers
// ---------------------------------------------------------------------------

/** Strip HTML tags from a string. */
function sanitize(str) {
  if (!str) return '';
  return String(str).replace(/<[^>]*>/g, '').trim();
}

/** Basic email regex validation. */
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/** Accept digits, spaces, dashes, parens, leading +. */
function isValidPhone(phone) {
  return /^\+?[\d\s\-()]{8,20}$/.test(phone);
}

// ---------------------------------------------------------------------------
// Handler
// ---------------------------------------------------------------------------
export default async function handler(req, res) {
  // ── Method gate ──────────────────────────────────────────────────────────
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // ── Rate limiting ───────────────────────────────────────────────────────
  const clientIp =
    req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
    req.socket?.remoteAddress ||
    'unknown';

  if (isRateLimited(clientIp)) {
    return res.status(429).json({ error: 'Too many requests. Please try again later.' });
  }

  try {
    const body = req.body;

    // ── Honeypot check (hidden field "website" should be empty) ──────────
    if (body.website) {
      // Silently accept to not tip off bots, but don't actually send email
      return res.status(200).json({ success: true });
    }

    // ── Extract & sanitize ──────────────────────────────────────────────
    const name        = sanitize(body.name);
    const phone       = sanitize(body.phone);
    const email       = sanitize(body.email);
    const childAge    = sanitize(body.childAge);
    const homeAddress = sanitize(body.homeAddress);

    // ── Validate required fields ────────────────────────────────────────
    const errors = {};
    if (!name)                       errors.name        = 'Full name is required';
    if (!phone)                      errors.phone       = 'Phone number is required';
    else if (!isValidPhone(phone))   errors.phone       = 'Invalid phone number';
    if (!email)                      errors.email       = 'Email address is required';
    else if (!isValidEmail(email))   errors.email       = 'Invalid email address';
    if (!childAge)                   errors.childAge    = "Child's age is required";
    if (!homeAddress)                errors.homeAddress = 'Home address is required';

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ error: 'Validation failed', errors });
    }

    // ── Build email payload ─────────────────────────────────────────────
    const timestamp = new Date().toLocaleString('en-GB', {
      dateStyle: 'full',
      timeStyle: 'short',
      timeZone: 'Africa/Lagos',
    });

    const emailData = {
      name,
      phone,
      email,
      childAge,
      homeAddress,
      timestamp,
    };

    // ── Send emails via Resend ──────────────────────────────────────────
    const resend = new Resend(process.env.RESEND_API_KEY);

    const toEmail   = process.env.TO_EMAIL   || 'croccityfainfo@gmail.com';
    const fromEmail = process.env.FROM_EMAIL || 'onboarding@resend.dev';

    // Admin notification email
    const adminResult = await resend.emails.send({
      from: `Croc City Academy <${fromEmail}>`,
      to: [toEmail],
      subject: `New Enquiry — ${name}`,
      html: buildAdminEmail(emailData),
    });

    if (adminResult.error) {
      console.error('Resend admin email error:', adminResult.error);
      return res.status(500).json({ error: 'Failed to send notification email. Please try again.' });
    }

    // Confirmation email to applicant (best-effort — don't fail the whole request)
    try {
      await resend.emails.send({
        from: `Croc City Academy <${fromEmail}>`,
        to: [email],
        subject: 'Thank you for your enquiry — Croc City Football Academy 🐊',
        html: buildConfirmationEmail(emailData),
      });
    } catch (confirmErr) {
      console.warn('Confirmation email failed (non-critical):', confirmErr.message);
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Contact API error:', err);
    return res.status(500).json({ error: 'Internal server error. Please try again later.' });
  }
}
