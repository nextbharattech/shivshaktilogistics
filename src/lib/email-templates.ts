export interface ContactEmailPayload {
  name: string;
  company?: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  submittedAt?: string;
}

export interface QuoteEmailPayload {
  refId: string;
  fullName: string;
  companyName?: string;
  email: string;
  phone: string;
  pickupLocation: string;
  deliveryLocation: string;
  cargoType: string;
  shipmentMode: string;
  approxWeightKg: string;
  lengthCm?: string;
  widthCm?: string;
  heightCm?: string;
  expectedDate?: string;
  message?: string;
  volumetricWeight?: number;
  submittedAt?: string;
}

const baseStyles = `
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  color: #1e293b;
  line-height: 1.6;
`;

export function getAdminContactEmailHtml(data: ContactEmailPayload): string {
  const dateStr = data.submittedAt || new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New Contact Enquiry - Shiv Shakti Logistics</title>
</head>
<body style="margin: 0; padding: 24px; background-color: #f8fafc; ${baseStyles}">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 620px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
    <!-- Header -->
    <tr>
      <td style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding: 32px 28px; text-align: left; border-bottom: 3px solid #ea580c;">
        <div style="font-size: 20px; font-weight: 800; color: #ffffff; letter-spacing: -0.5px;">
          SHIV SHAKTI <span style="color: #f97316;">LOGISTICS</span>
        </div>
        <div style="font-size: 13px; color: #94a3b8; margin-top: 4px;">
          Operations Desk Notification - New Website Enquiry
        </div>
      </td>
    </tr>

    <!-- Body -->
    <tr>
      <td style="padding: 28px;">
        <div style="display: inline-block; padding: 4px 12px; background-color: #ffedd5; color: #9a3412; font-weight: 700; font-size: 11px; border-radius: 9999px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 16px;">
          ${data.subject || "Contact Form Enquiry"}
        </div>
        <h2 style="margin: 0 0 16px 0; font-size: 18px; color: #0f172a; font-weight: 700;">
          New message received from ${escapeHtml(data.name)}
        </h2>

        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f8fafc; border-radius: 12px; border: 1px solid #e2e8f0; margin-bottom: 24px;">
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid #e2e8f0; font-size: 12px; color: #64748b; width: 140px; font-weight: 600;">Sender Name:</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid #e2e8f0; font-size: 13px; color: #0f172a; font-weight: 600;">${escapeHtml(data.name)}</td>
          </tr>
          ${data.company ? `
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid #e2e8f0; font-size: 12px; color: #64748b; font-weight: 600;">Company:</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid #e2e8f0; font-size: 13px; color: #0f172a;">${escapeHtml(data.company)}</td>
          </tr>` : ""}
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid #e2e8f0; font-size: 12px; color: #64748b; font-weight: 600;">Email Address:</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid #e2e8f0; font-size: 13px; color: #0f172a;">
              <a href="mailto:${escapeHtml(data.email)}" style="color: #ea580c; text-decoration: none; font-weight: 600;">${escapeHtml(data.email)}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid #e2e8f0; font-size: 12px; color: #64748b; font-weight: 600;">Phone Number:</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid #e2e8f0; font-size: 13px; color: #0f172a;">
              <a href="tel:${escapeHtml(data.phone)}" style="color: #0284c7; text-decoration: none; font-weight: 600;">${escapeHtml(data.phone)}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; font-size: 12px; color: #64748b; font-weight: 600;">Received At:</td>
            <td style="padding: 12px 16px; font-size: 12px; color: #64748b;">${dateStr} (IST)</td>
          </tr>
        </table>

        <!-- Message Box -->
        <div style="font-size: 12px; font-weight: 700; color: #475569; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px;">
          Enquiry Message
        </div>
        <div style="background-color: #ffffff; border: 1px solid #cbd5e1; border-left: 4px solid #f97316; padding: 16px; border-radius: 8px; font-size: 13px; color: #334155; white-space: pre-wrap; margin-bottom: 24px; line-height: 1.6;">
${escapeHtml(data.message)}
        </div>

        <div style="text-align: center; margin-top: 24px;">
          <a href="mailto:${escapeHtml(data.email)}?subject=Re: ${encodeURIComponent(data.subject)}" style="display: inline-block; background-color: #ea580c; color: #ffffff; padding: 12px 28px; border-radius: 10px; font-size: 13px; font-weight: 700; text-decoration: none; box-shadow: 0 2px 4px rgba(234, 88, 12, 0.2);">
            Reply to ${escapeHtml(data.name)} &rarr;
          </a>
        </div>
      </td>
    </tr>

    <!-- Footer -->
    <tr>
      <td style="background-color: #f1f5f9; padding: 18px 28px; text-align: center; border-top: 1px solid #e2e8f0; font-size: 11px; color: #64748b;">
        This alert was sent automatically from Shiv Shakti Logistics web portal.
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

export function getUserContactConfirmationHtml(data: ContactEmailPayload): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>We Received Your Message - Shiv Shakti Logistics</title>
</head>
<body style="margin: 0; padding: 24px; background-color: #f8fafc; ${baseStyles}">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0;">
    <tr>
      <td style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding: 32px 28px; text-align: left; border-bottom: 3px solid #ea580c;">
        <div style="font-size: 20px; font-weight: 800; color: #ffffff;">
          SHIV SHAKTI <span style="color: #f97316;">LOGISTICS</span>
        </div>
        <div style="font-size: 13px; color: #94a3b8; margin-top: 4px;">
          Your Pan-India Freight & Supply Chain Partner
        </div>
      </td>
    </tr>
    <tr>
      <td style="padding: 28px;">
        <h2 style="margin: 0 0 12px 0; font-size: 18px; color: #0f172a; font-weight: 700;">
          Hello ${escapeHtml(data.name)},
        </h2>
        <p style="font-size: 14px; color: #475569; margin: 0 0 16px 0;">
          Thank you for reaching out to <strong>Shiv Shakti Logistics</strong>. We have successfully logged your enquiry regarding:
        </p>
        <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 14px 18px; font-size: 13px; color: #1e293b; margin-bottom: 20px;">
          <strong>Subject:</strong> ${escapeHtml(data.subject)}<br />
          <strong>Your note:</strong> "${escapeHtml(data.message.slice(0, 150))}${data.message.length > 150 ? "..." : ""}"
        </div>
        <p style="font-size: 13px; color: #475569; margin: 0 0 20px 0;">
          Our dispatch and commercial team is reviewing your requirements and will connect with you shortly via phone or email.
        </p>
        <div style="background-color: #fff7ed; border: 1px solid #fed7aa; border-radius: 8px; padding: 14px 18px; font-size: 12px; color: #9a3412;">
          <strong>Need urgent freight assistance?</strong><br />
          Call our 24/7 Operations Desk directly at <a href="tel:+918459335952" style="color: #ea580c; font-weight: 700; text-decoration: none;">+91 8459335952</a> or Toll-Free <a href="tel:18002098899" style="color: #ea580c; font-weight: 700; text-decoration: none;">1800 209 8899</a>.
        </div>
      </td>
    </tr>
    <tr>
      <td style="background-color: #f1f5f9; padding: 16px 28px; text-align: center; border-top: 1px solid #e2e8f0; font-size: 11px; color: #64748b;">
        &copy; ${new Date().getFullYear()} Shiv Shakti Logistics. E-119, Janakpuri, Sahibabad, Ghaziabad (U.P) - 201005.
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

export function getAdminQuoteEmailHtml(data: QuoteEmailPayload): string {
  const dateStr = data.submittedAt || new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New Freight Quote Request - ${escapeHtml(data.refId)}</title>
</head>
<body style="margin: 0; padding: 24px; background-color: #f8fafc; ${baseStyles}">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 640px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
    <!-- Header -->
    <tr>
      <td style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding: 32px 28px; text-align: left; border-bottom: 3px solid #ea580c;">
        <div style="float: right; text-align: right;">
          <div style="font-size: 11px; font-weight: 700; color: #cbd5e1; text-transform: uppercase;">Docket Reference</div>
          <div style="font-size: 14px; font-weight: 800; color: #f97316; font-family: monospace;">${escapeHtml(data.refId)}</div>
        </div>
        <div style="font-size: 20px; font-weight: 800; color: #ffffff; letter-spacing: -0.5px;">
          SHIV SHAKTI <span style="color: #f97316;">LOGISTICS</span>
        </div>
        <div style="font-size: 13px; color: #94a3b8; margin-top: 4px;">
          New Freight Tender / Commercial Quote Request
        </div>
      </td>
    </tr>

    <!-- Body -->
    <tr>
      <td style="padding: 28px;">
        <h2 style="margin: 0 0 16px 0; font-size: 18px; color: #0f172a; font-weight: 700;">
          Cargo & Lane Specifications
        </h2>

        <!-- Lane highlights -->
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #fff7ed; border-radius: 12px; border: 1px solid #ffedd5; margin-bottom: 24px;">
          <tr>
            <td style="padding: 16px; width: 50%; vertical-align: top; border-right: 1px dashed #fed7aa;">
              <div style="font-size: 11px; text-transform: uppercase; font-weight: 700; color: #9a3412;">Pickup Origin</div>
              <div style="font-size: 14px; font-weight: 700; color: #0f172a; margin-top: 4px;">${escapeHtml(data.pickupLocation)}</div>
            </td>
            <td style="padding: 16px; width: 50%; vertical-align: top;">
              <div style="font-size: 11px; text-transform: uppercase; font-weight: 700; color: #9a3412;">Delivery Destination</div>
              <div style="font-size: 14px; font-weight: 700; color: #0f172a; margin-top: 4px;">${escapeHtml(data.deliveryLocation)}</div>
            </td>
          </tr>
        </table>

        <!-- Detailed Spec Table -->
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f8fafc; border-radius: 12px; border: 1px solid #e2e8f0; margin-bottom: 24px;">
          <tr>
            <td style="padding: 10px 16px; border-bottom: 1px solid #e2e8f0; font-size: 12px; color: #64748b; width: 150px; font-weight: 600;">Customer Name:</td>
            <td style="padding: 10px 16px; border-bottom: 1px solid #e2e8f0; font-size: 13px; color: #0f172a; font-weight: 600;">${escapeHtml(data.fullName)}</td>
          </tr>
          ${data.companyName ? `
          <tr>
            <td style="padding: 10px 16px; border-bottom: 1px solid #e2e8f0; font-size: 12px; color: #64748b; font-weight: 600;">Company Name:</td>
            <td style="padding: 10px 16px; border-bottom: 1px solid #e2e8f0; font-size: 13px; color: #0f172a;">${escapeHtml(data.companyName)}</td>
          </tr>` : ""}
          <tr>
            <td style="padding: 10px 16px; border-bottom: 1px solid #e2e8f0; font-size: 12px; color: #64748b; font-weight: 600;">Email:</td>
            <td style="padding: 10px 16px; border-bottom: 1px solid #e2e8f0; font-size: 13px; color: #0f172a;">
              <a href="mailto:${escapeHtml(data.email)}" style="color: #ea580c; text-decoration: none; font-weight: 600;">${escapeHtml(data.email)}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 10px 16px; border-bottom: 1px solid #e2e8f0; font-size: 12px; color: #64748b; font-weight: 600;">Phone:</td>
            <td style="padding: 10px 16px; border-bottom: 1px solid #e2e8f0; font-size: 13px; color: #0f172a;">
              <a href="tel:${escapeHtml(data.phone)}" style="color: #0284c7; text-decoration: none; font-weight: 600;">${escapeHtml(data.phone)}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 10px 16px; border-bottom: 1px solid #e2e8f0; font-size: 12px; color: #64748b; font-weight: 600;">Shipment Mode:</td>
            <td style="padding: 10px 16px; border-bottom: 1px solid #e2e8f0; font-size: 13px; color: #0f172a; font-weight: 700; text-transform: uppercase;">${escapeHtml(data.shipmentMode)}</td>
          </tr>
          <tr>
            <td style="padding: 10px 16px; border-bottom: 1px solid #e2e8f0; font-size: 12px; color: #64748b; font-weight: 600;">Cargo Category:</td>
            <td style="padding: 10px 16px; border-bottom: 1px solid #e2e8f0; font-size: 13px; color: #0f172a;">${escapeHtml(data.cargoType)}</td>
          </tr>
          <tr>
            <td style="padding: 10px 16px; border-bottom: 1px solid #e2e8f0; font-size: 12px; color: #64748b; font-weight: 600;">Deadweight (Actual):</td>
            <td style="padding: 10px 16px; border-bottom: 1px solid #e2e8f0; font-size: 13px; color: #0f172a; font-weight: 700;">${escapeHtml(data.approxWeightKg)} kg</td>
          </tr>
          ${(data.lengthCm && data.widthCm && data.heightCm) ? `
          <tr>
            <td style="padding: 10px 16px; border-bottom: 1px solid #e2e8f0; font-size: 12px; color: #64748b; font-weight: 600;">Dimensions (L×W×H):</td>
            <td style="padding: 10px 16px; border-bottom: 1px solid #e2e8f0; font-size: 13px; color: #0f172a;">
              ${escapeHtml(data.lengthCm)} cm &times; ${escapeHtml(data.widthCm)} cm &times; ${escapeHtml(data.heightCm)} cm
              ${data.volumetricWeight ? ` <span style="color: #64748b; font-size: 11px;">(Vol. Weight &asymp; ${data.volumetricWeight} kg)</span>` : ""}
            </td>
          </tr>` : ""}
          ${data.expectedDate ? `
          <tr>
            <td style="padding: 10px 16px; border-bottom: 1px solid #e2e8f0; font-size: 12px; color: #64748b; font-weight: 600;">Expected Date:</td>
            <td style="padding: 10px 16px; border-bottom: 1px solid #e2e8f0; font-size: 13px; color: #0f172a;">${escapeHtml(data.expectedDate)}</td>
          </tr>` : ""}
          <tr>
            <td style="padding: 10px 16px; font-size: 12px; color: #64748b; font-weight: 600;">Submitted At:</td>
            <td style="padding: 10px 16px; font-size: 12px; color: #64748b;">${dateStr} (IST)</td>
          </tr>
        </table>

        ${data.message ? `
        <div style="font-size: 12px; font-weight: 700; color: #475569; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px;">
          Special Handling / Cargo Notes
        </div>
        <div style="background-color: #ffffff; border: 1px solid #cbd5e1; border-left: 4px solid #f97316; padding: 14px 16px; border-radius: 8px; font-size: 13px; color: #334155; white-space: pre-wrap; margin-bottom: 24px;">
${escapeHtml(data.message)}
        </div>` : ""}

        <div style="text-align: center; margin-top: 24px;">
          <a href="mailto:${escapeHtml(data.email)}?subject=Freight Rate Quote [Docket: ${encodeURIComponent(data.refId)}] - Shiv Shakti Logistics" style="display: inline-block; background-color: #ea580c; color: #ffffff; padding: 12px 28px; border-radius: 10px; font-size: 13px; font-weight: 700; text-decoration: none; box-shadow: 0 2px 4px rgba(234, 88, 12, 0.2);">
            Provide Rate Quote to ${escapeHtml(data.fullName)} &rarr;
          </a>
        </div>
      </td>
    </tr>

    <!-- Footer -->
    <tr>
      <td style="background-color: #f1f5f9; padding: 18px 28px; text-align: center; border-top: 1px solid #e2e8f0; font-size: 11px; color: #64748b;">
        Automated Commercial Pricing Alert &bull; Shiv Shakti Logistics
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

export function getUserQuoteConfirmationHtml(data: QuoteEmailPayload): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Quote Request Received [${escapeHtml(data.refId)}] - Shiv Shakti Logistics</title>
</head>
<body style="margin: 0; padding: 24px; background-color: #f8fafc; ${baseStyles}">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0;">
    <!-- Header -->
    <tr>
      <td style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding: 32px 28px; text-align: left; border-bottom: 3px solid #ea580c;">
        <div style="font-size: 20px; font-weight: 800; color: #ffffff;">
          SHIV SHAKTI <span style="color: #f97316;">LOGISTICS</span>
        </div>
        <div style="font-size: 13px; color: #94a3b8; margin-top: 4px;">
          Commercial Freight Quote Desk
        </div>
      </td>
    </tr>

    <!-- Body -->
    <tr>
      <td style="padding: 28px;">
        <div style="display: inline-block; padding: 6px 14px; background-color: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 9999px; font-size: 12px; color: #047857; font-weight: 700; margin-bottom: 16px;">
          ✓ Quotation Request Logged
        </div>

        <h2 style="margin: 0 0 12px 0; font-size: 18px; color: #0f172a; font-weight: 700;">
          Dear ${escapeHtml(data.fullName)},
        </h2>
        <p style="font-size: 14px; color: #475569; margin: 0 0 20px 0; line-height: 1.6;">
          Thank you for requesting a freight quote from <strong>Shiv Shakti Logistics</strong>. Our logistics pricing engineers have received your cargo requirements and are structuring a competitive rate quotation for your lane.
        </p>

        <!-- Reference card -->
        <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 18px; margin-bottom: 24px;">
          <div style="font-size: 11px; text-transform: uppercase; font-weight: 700; color: #64748b;">
            Your Docket Reference ID
          </div>
          <div style="font-size: 20px; font-weight: 800; color: #ea580c; font-family: monospace; margin: 4px 0 14px 0;">
            ${escapeHtml(data.refId)}
          </div>

          <table width="100%" border="0" cellspacing="0" cellpadding="0" style="font-size: 12px; color: #334155; line-height: 1.8;">
            <tr>
              <td style="color: #64748b; width: 130px;">Lane:</td>
              <td style="font-weight: 600;">${escapeHtml(data.pickupLocation)} &rarr; ${escapeHtml(data.deliveryLocation)}</td>
            </tr>
            <tr>
              <td style="color: #64748b;">Cargo Type:</td>
              <td>${escapeHtml(data.cargoType)}</td>
            </tr>
            <tr>
              <td style="color: #64748b;">Shipment Mode:</td>
              <td style="text-transform: uppercase; font-weight: 600;">${escapeHtml(data.shipmentMode)}</td>
            </tr>
            <tr>
              <td style="color: #64748b;">Approx Weight:</td>
              <td>${escapeHtml(data.approxWeightKg)} kg</td>
            </tr>
          </table>
        </div>

        <p style="font-size: 13px; color: #475569; margin: 0 0 20px 0; line-height: 1.6;">
          Our freight specialist will contact you at <strong>${escapeHtml(data.email)}</strong> or <strong>${escapeHtml(data.phone)}</strong> within <strong>2 to 4 business hours</strong> with verified linehaul rates, toll/tax breakdown, and committed transit time.
        </p>

        <div style="background-color: #fff7ed; border: 1px solid #fed7aa; border-radius: 8px; padding: 14px 18px; font-size: 12px; color: #9a3412;">
          <strong>Need immediate dispatch assistance?</strong><br />
          Contact our 24/7 Operations Desk at <a href="tel:+918459335952" style="color: #ea580c; font-weight: 700; text-decoration: none;">+91 8459335952</a> or WhatsApp us directly.
        </div>
      </td>
    </tr>

    <!-- Footer -->
    <tr>
      <td style="background-color: #f1f5f9; padding: 16px 28px; text-align: center; border-top: 1px solid #e2e8f0; font-size: 11px; color: #64748b;">
        &copy; ${new Date().getFullYear()} Shiv Shakti Logistics &bull; Fast, Transparent & Resilient Supply Chain Solutions.
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

function escapeHtml(str?: string): string {
  if (!str) return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
