/**
 * HTML email templates for the Croc City Football Academy enquiry system.
 *
 * buildAdminEmail(data)        — rich branded email sent to the academy inbox
 * buildConfirmationEmail(data) — thank-you email sent back to the applicant
 *
 * Fields: name, phone, email, childAge, homeAddress, timestamp
 */

// Academy logo — hosted on GitHub Pages / CDN so it renders in all email clients
const LOGO_URL = 'https://raw.githubusercontent.com/kingphenix/Croc-City-Academy/refs/heads/main/public/logo.png';

/**
 * Branded HTML email for the admin inbox with all submission details.
 */
export function buildAdminEmail(data) {
  const { name, phone, email, childAge, homeAddress, timestamp } = data;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New Enquiry — Croc City Football Academy</title>
</head>
<body style="margin:0;padding:0;background:#0d0d0d;font-family:'Segoe UI',Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0d0d0d;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#181f2e;border-radius:16px;overflow:hidden;border:1px solid #2a3347;">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#0A5C36 0%,#0d7a48 60%,#1a9055 100%);padding:32px 40px;text-align:center;">
              <img src="${LOGO_URL}" alt="Croc City Football Academy" width="72" height="72" style="border-radius:50%;margin-bottom:14px;display:block;margin-left:auto;margin-right:auto;border:3px solid rgba(255,255,255,0.2);" />
              <h1 style="margin:0;color:#ffffff;font-size:20px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;">
                Croc City Football Academy
              </h1>
              <p style="margin:8px 0 0;color:rgba(255,255,255,0.65);font-size:11px;letter-spacing:3px;text-transform:uppercase;">
                New Enquiry Received
              </p>
            </td>
          </tr>

          <!-- Alert banner -->
          <tr>
            <td style="background:#F7941D;padding:10px 40px;text-align:center;">
              <p style="margin:0;color:#fff;font-size:12px;font-weight:600;letter-spacing:1px;text-transform:uppercase;">
                📋 &nbsp;Action Required — Review Application
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:32px 40px;">
              <h2 style="margin:0 0 24px;color:#ffffff;font-size:17px;font-weight:600;border-bottom:1px solid #2a3347;padding-bottom:14px;">
                Applicant Details
              </h2>

              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">

                <!-- Name -->
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #1e2738;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td width="140" style="color:#6b7a99;font-size:12px;text-transform:uppercase;letter-spacing:1px;font-weight:600;padding-right:16px;vertical-align:top;padding-top:2px;">Full Name</td>
                        <td style="color:#f0f4ff;font-size:15px;font-weight:600;">${escapeHtml(name)}</td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Phone -->
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #1e2738;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td width="140" style="color:#6b7a99;font-size:12px;text-transform:uppercase;letter-spacing:1px;font-weight:600;padding-right:16px;vertical-align:top;padding-top:2px;">Phone</td>
                        <td style="color:#f0f4ff;font-size:15px;">
                          <a href="tel:${escapeHtml(phone)}" style="color:#F7941D;text-decoration:none;">${escapeHtml(phone)}</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Email -->
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #1e2738;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td width="140" style="color:#6b7a99;font-size:12px;text-transform:uppercase;letter-spacing:1px;font-weight:600;padding-right:16px;vertical-align:top;padding-top:2px;">Email</td>
                        <td style="color:#f0f4ff;font-size:15px;">
                          <a href="mailto:${escapeHtml(email)}" style="color:#F7941D;text-decoration:none;">${escapeHtml(email)}</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Child's Age -->
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #1e2738;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td width="140" style="color:#6b7a99;font-size:12px;text-transform:uppercase;letter-spacing:1px;font-weight:600;padding-right:16px;vertical-align:top;padding-top:2px;">Child's Age</td>
                        <td>
                          <span style="background:#0A5C36;color:#ffffff;padding:4px 12px;border-radius:20px;font-size:13px;font-weight:600;">${escapeHtml(childAge)} years old</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Home Address -->
                <tr>
                  <td style="padding:10px 0;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td width="140" style="color:#6b7a99;font-size:12px;text-transform:uppercase;letter-spacing:1px;font-weight:600;padding-right:16px;vertical-align:top;padding-top:2px;">Home Address</td>
                        <td style="color:#f0f4ff;font-size:14px;line-height:1.6;">${escapeHtml(homeAddress)}</td>
                      </tr>
                    </table>
                  </td>
                </tr>

              </table>

              <!-- Timestamp -->
              <p style="margin:28px 0 0;color:#4a5568;font-size:11px;border-top:1px solid #1e2738;padding-top:16px;">
                ⏱ &nbsp;Submitted: ${escapeHtml(timestamp)}
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#0f1521;padding:20px 40px;text-align:center;border-top:1px solid #1e2738;">
              <p style="margin:0;color:#4a5568;font-size:11px;">
                Croc City Football Academy &nbsp;·&nbsp; Kaduna, Nigeria
              </p>
              <p style="margin:6px 0 0;color:#4a5568;font-size:11px;">
                <a href="mailto:croccityfainfo@gmail.com" style="color:#F7941D;text-decoration:none;">croccityfainfo@gmail.com</a>
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

/**
 * Warm thank-you email sent to the applicant.
 */
export function buildConfirmationEmail(data) {
  const { name, email } = data;
  // First name only for a personal feel
  const firstName = name.split(' ')[0];

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Thank you — Croc City Football Academy</title>
</head>
<body style="margin:0;padding:0;background:#0d0d0d;font-family:'Segoe UI',Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0d0d0d;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#181f2e;border-radius:16px;overflow:hidden;border:1px solid #2a3347;">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#0A5C36 0%,#0d7a48 60%,#1a9055 100%);padding:36px 40px;text-align:center;">
              <img src="${LOGO_URL}" alt="Croc City Football Academy" width="80" height="80" style="border-radius:50%;margin-bottom:16px;display:block;margin-left:auto;margin-right:auto;border:3px solid rgba(255,255,255,0.25);" />
              <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:700;letter-spacing:1px;">
                Croc City Football Academy
              </h1>
              <p style="margin:8px 0 0;color:rgba(255,255,255,0.65);font-size:12px;letter-spacing:2px;text-transform:uppercase;">
                Kaduna, Nigeria
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:36px 40px;">

              <!-- Greeting -->
              <h2 style="margin:0 0 8px;color:#ffffff;font-size:24px;font-weight:700;">
                Thank you, ${escapeHtml(firstName)}! 🎉
              </h2>
              <p style="margin:0 0 24px;color:#8a9bbf;font-size:15px;line-height:1.7;">
                We have received your enquiry and we are thrilled to hear from you. Our coaching team will review your details and get back to you as soon as possible.
              </p>

              <!-- Divider -->
              <div style="height:1px;background:linear-gradient(to right,transparent,#2a3347,transparent);margin:0 0 28px;"></div>

              <!-- What happens next -->
              <h3 style="margin:0 0 16px;color:#F7941D;font-size:14px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;">
                What Happens Next?
              </h3>

              <!-- Step 1 -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:14px;">
                <tr>
                  <td width="36" valign="top">
                    <div style="width:28px;height:28px;border-radius:50%;background:#0A5C36;color:#fff;font-size:12px;font-weight:700;text-align:center;line-height:28px;">1</div>
                  </td>
                  <td style="padding-left:8px;vertical-align:top;">
                    <p style="margin:0;color:#e0e8f4;font-size:14px;line-height:1.6;">
                      <strong style="color:#ffffff;">Team review</strong><br />
                      Our team will review your enquiry and contact you within <strong style="color:#F7941D;">48 hours</strong>.
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Step 2 -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:14px;">
                <tr>
                  <td width="36" valign="top">
                    <div style="width:28px;height:28px;border-radius:50%;background:#0A5C36;color:#fff;font-size:12px;font-weight:700;text-align:center;line-height:28px;">2</div>
                  </td>
                  <td style="padding-left:8px;vertical-align:top;">
                    <p style="margin:0;color:#e0e8f4;font-size:14px;line-height:1.6;">
                      <strong style="color:#ffffff;">Trial invitation</strong><br />
                      You'll receive details of the next available trial session along with location and time.
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Step 3 -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
                <tr>
                  <td width="36" valign="top">
                    <div style="width:28px;height:28px;border-radius:50%;background:#0A5C36;color:#fff;font-size:12px;font-weight:700;text-align:center;line-height:28px;">3</div>
                  </td>
                  <td style="padding-left:8px;vertical-align:top;">
                    <p style="margin:0;color:#e0e8f4;font-size:14px;line-height:1.6;">
                      <strong style="color:#ffffff;">Join the Academy</strong><br />
                      Attend your trial, meet our coaches and take the first step toward your football journey.
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Divider -->
              <div style="height:1px;background:linear-gradient(to right,transparent,#2a3347,transparent);margin:0 0 24px;"></div>

              <!-- Contact -->
              <p style="margin:0;color:#8a9bbf;font-size:13px;line-height:1.7;text-align:center;">
                Questions? Reach us at<br />
                <a href="mailto:croccityfainfo@gmail.com" style="color:#F7941D;text-decoration:none;font-weight:600;">croccityfainfo@gmail.com</a>
                &nbsp;·&nbsp;
                <a href="tel:+2348029656982" style="color:#F7941D;text-decoration:none;font-weight:600;">+234 802 965 6982</a>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#0f1521;padding:20px 40px;text-align:center;border-top:1px solid #1e2738;">
              <p style="margin:0;color:#4a5568;font-size:11px;">
                © 2025 Croc City Football Academy &nbsp;·&nbsp; Kaduna, Nigeria
              </p>
              <p style="margin:6px 0 0;color:#3a4558;font-size:10px;">
                You received this email because you submitted an enquiry at croccityfa.com.<br />
                This is a transactional email — please do not reply directly to this message.
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
