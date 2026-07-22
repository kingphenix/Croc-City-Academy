/**
 * HTML email templates for the Croc City Football Academy registration system.
 * 
 * buildAdminEmail(data)        — rich branded email sent to the academy inbox
 * buildConfirmationEmail(data) — brief thank-you email sent to the applicant
 */

/**
 * Branded HTML email for the admin inbox with all submission details.
 */
export function buildAdminEmail(data) {
  const {
    fullName,
    email,
    phone,
    childAge,
    programInterest,
    parentName,
    message,
    timestamp,
  } = data;

  return `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8" /></head>
<body style="margin:0;padding:0;background:#111;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#1a1a1a;border-radius:12px;overflow:hidden;border:1px solid #2a2a2a;">
    
    <!-- Header -->
    <tr>
      <td style="background:linear-gradient(135deg,#0A5C36,#0d7a48);padding:28px 32px;text-align:center;">
        <h1 style="margin:0;color:#fff;font-size:22px;letter-spacing:1px;">
          🐊 CROC CITY FOOTBALL ACADEMY
        </h1>
        <p style="margin:6px 0 0;color:rgba(255,255,255,0.7);font-size:12px;letter-spacing:2px;text-transform:uppercase;">
          New Registration Submission
        </p>
      </td>
    </tr>

    <!-- Body -->
    <tr>
      <td style="padding:28px 32px;">
        <h2 style="margin:0 0 20px;color:#FF6600;font-size:18px;border-bottom:1px solid #333;padding-bottom:12px;">
          📋 Applicant Details
        </h2>

        <table width="100%" cellpadding="0" cellspacing="0" style="font-size:14px;color:#ddd;">
          <tr>
            <td style="padding:8px 0;color:#999;width:140px;vertical-align:top;">Full Name</td>
            <td style="padding:8px 0;font-weight:600;">${escapeHtml(fullName)}</td>
          </tr>
          <tr>
            <td style="padding:8px 0;color:#999;vertical-align:top;">Email</td>
            <td style="padding:8px 0;">
              <a href="mailto:${escapeHtml(email)}" style="color:#FF6600;text-decoration:none;">${escapeHtml(email)}</a>
            </td>
          </tr>
          <tr>
            <td style="padding:8px 0;color:#999;vertical-align:top;">Phone</td>
            <td style="padding:8px 0;">${escapeHtml(phone)}</td>
          </tr>
          <tr>
            <td style="padding:8px 0;color:#999;vertical-align:top;">Child Age</td>
            <td style="padding:8px 0;">${escapeHtml(childAge)}</td>
          </tr>
          <tr>
            <td style="padding:8px 0;color:#999;vertical-align:top;">Program Interest</td>
            <td style="padding:8px 0;">
              <span style="background:#0A5C36;color:#fff;padding:3px 10px;border-radius:20px;font-size:12px;">
                ${escapeHtml(programInterest)}
              </span>
            </td>
          </tr>
          <tr>
            <td style="padding:8px 0;color:#999;vertical-align:top;">Parent / Guardian</td>
            <td style="padding:8px 0;">${escapeHtml(parentName)}</td>
          </tr>
        </table>

        ${message ? `
        <div style="margin-top:20px;padding:16px;background:#222;border-radius:8px;border-left:3px solid #FF6600;">
          <p style="margin:0 0 6px;color:#999;font-size:11px;text-transform:uppercase;letter-spacing:1px;">Message / Notes</p>
          <p style="margin:0;color:#ddd;font-size:14px;line-height:1.6;">${escapeHtml(message)}</p>
        </div>
        ` : ''}

        <p style="margin:24px 0 0;color:#666;font-size:11px;border-top:1px solid #333;padding-top:16px;">
          ⏱ Submitted: ${escapeHtml(timestamp)}
        </p>
      </td>
    </tr>

    <!-- Footer -->
    <tr>
      <td style="background:#111;padding:16px 32px;text-align:center;">
        <p style="margin:0;color:#555;font-size:11px;">
          Croc City Football Academy · Kaduna, Nigeria
        </p>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/**
 * Brief confirmation email sent to the applicant.
 */
export function buildConfirmationEmail(data) {
  const { fullName } = data;

  return `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8" /></head>
<body style="margin:0;padding:0;background:#111;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#1a1a1a;border-radius:12px;overflow:hidden;border:1px solid #2a2a2a;">
    
    <tr>
      <td style="background:linear-gradient(135deg,#0A5C36,#0d7a48);padding:28px 32px;text-align:center;">
        <h1 style="margin:0;color:#fff;font-size:22px;letter-spacing:1px;">
          🐊 CROC CITY FOOTBALL ACADEMY
        </h1>
      </td>
    </tr>

    <tr>
      <td style="padding:28px 32px;">
        <h2 style="margin:0 0 16px;color:#fff;font-size:20px;">
          Welcome, ${escapeHtml(fullName)}! 🎉
        </h2>
        <p style="color:#ccc;font-size:14px;line-height:1.7;margin:0 0 16px;">
          Thank you for registering with Croc City Football Academy. We have received your application and our coaching staff will review it shortly.
        </p>
        <p style="color:#ccc;font-size:14px;line-height:1.7;margin:0 0 16px;">
          <strong style="color:#FF6600;">What happens next?</strong>
        </p>
        <ul style="color:#ccc;font-size:14px;line-height:1.8;padding-left:20px;margin:0 0 16px;">
          <li>Our team will contact you within 48 hours</li>
          <li>You'll receive trial session dates and location details</li>
          <li>Please bring appropriate training gear to your trial</li>
        </ul>
        <p style="color:#999;font-size:13px;margin:0;">
          If you have any questions, contact us at 
          <a href="mailto:croccityfainfo@gmail.com" style="color:#FF6600;text-decoration:none;">croccityfainfo@gmail.com</a>
          or call <strong>+234 802 965 6982</strong>.
        </p>
      </td>
    </tr>

    <tr>
      <td style="background:#111;padding:16px 32px;text-align:center;">
        <p style="margin:0;color:#555;font-size:11px;">
          Croc City Football Academy · Kaduna, Nigeria
        </p>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/**
 * Escape HTML special characters to prevent XSS in email templates.
 */
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
