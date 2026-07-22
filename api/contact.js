/**
 * Vercel Serverless Function — POST /api/contact
 *
 * Receives registration form data, validates & sanitizes it,
 * then sends a branded email to the academy inbox via Resend
 * and a confirmation email back to the applicant.
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

/** Basic email regex. */
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
    const fullName       = sanitize(body.fullName);
    const email          = sanitize(body.email);
    const phone          = sanitize(body.phone);
    const childAge       = sanitize(body.childAge);
    const programInterest = sanitize(body.programInterest);
    const parentName     = sanitize(body.parentName);
    const message        = sanitize(body.message || body.notes || '');

    // ── Validate required fields ────────────────────────────────────────
    const errors = {};
    if (!fullName)                   errors.fullName = 'Full name is required';
    if (!email)                      errors.email    = 'Email is required';
    else if (!isValidEmail(email))   errors.email    = 'Invalid email address';
    if (!phone)                      errors.phone    = 'Phone number is required';
    else if (!isValidPhone(phone))   errors.phone    = 'Invalid phone number';

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
      fullName,
      email,
      phone,
      childAge: childAge || 'Not provided',
      programInterest: programInterest || 'Not specified',
      parentName: parentName || 'Not provided',
      message,
      timestamp,
    };

    // ── Send emails via Resend ──────────────────────────────────────────
    const resend = new Resend(process.env.RESEND_API_KEY);

    const toEmail   = process.env.TO_EMAIL   || 'josephchiganu@gmail.com';
    const fromEmail = process.env.FROM_EMAIL  || 'onboarding@resend.dev';

    // Admin notification email
    const adminResult = await resend.emails.send({
      from: `Croc City Academy <${fromEmail}>`,
      to: [toEmail],
      subject: `New Football Academy Registration - ${fullName}`,
      html: buildAdminEmail(emailData),
    });

    if (adminResult.error) {
      console.error('Resend admin email error:', adminResult.error);
      return res.status(500).json({ error: 'Failed to send notification email. Please try again.' });
    }

    // Confirmation email to applicant (best-effort, don't fail the whole request)
    try {
      await resend.emails.send({
        from: `Croc City Academy <${fromEmail}>`,
        to: [email],
        subject: 'Welcome to Croc City Football Academy! 🐊',
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
