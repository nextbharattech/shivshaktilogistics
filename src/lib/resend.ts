import { Resend } from "resend";

export const resendApiKey = process.env.RESEND_API_KEY || "";
export const resendFromEmail =
  process.env.RESEND_FROM_EMAIL || "Shiv Shakti Logistics <onboarding@resend.dev>";

// Recipient email addresses for admin alerts (e.g. user's Gmail and corporate email)
export const getAdminEmails = (): string[] => {
  const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL || "shahanwazh.2000@gmail.com";
  const companyEmail = process.env.COMPANY_NOTIFICATION_EMAIL;

  const emailSet = new Set<string>();
  
  if (adminEmail) {
    adminEmail.split(",").forEach((e) => {
      const trimmed = e.trim();
      if (trimmed) emailSet.add(trimmed);
    });
  }

  if (companyEmail) {
    companyEmail.split(",").forEach((e) => {
      const trimmed = e.trim();
      if (trimmed) emailSet.add(trimmed);
    });
  }

  return Array.from(emailSet);
};

export const resend = resendApiKey ? new Resend(resendApiKey) : null;
