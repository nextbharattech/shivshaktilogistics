import { NextResponse } from "next/server";
import {
  resend,
  resendFromEmail,
  getAdminEmails,
  resendApiKey,
} from "@/lib/resend";
import {
  getAdminContactEmailHtml,
  getUserContactConfirmationHtml,
  ContactEmailPayload,
} from "@/lib/email-templates";

export async function POST(request: Request) {
  try {
    const body: ContactEmailPayload = await request.json();

    const { name, email, phone, message, subject, company } = body;

    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        { error: "Name, email, phone, and message are required fields." },
        { status: 400 },
      );
    }

    // Check if Resend API key is set
    if (
      !resend ||
      !resendApiKey ||
      resendApiKey.includes("YOUR_RESEND_API_KEY")
    ) {
      console.warn(
        "[Resend Warning] RESEND_API_KEY is not configured or using placeholder in .env.local. Simulated email log:",
      );
      console.log("Contact submission:", {
        name,
        email,
        phone,
        subject,
        message,
      });

      return NextResponse.json({
        success: true,
        simulated: true,
        message:
          "Message received. (Resend API key pending configuration in .env.local)",
      });
    }

    const adminEmails = getAdminEmails();

    // 1. Send alert notification to Admin / Info Email (Gmail)
    const adminEmailResult = await resend.emails.send({
      from: resendFromEmail,
      to: adminEmails,
      replyTo: email,
      subject: `[Website Enquiry] ${subject || "Contact Form"} - ${name}`,
      html: getAdminContactEmailHtml(body),
    });

    if (adminEmailResult.error) {
      console.error(
        "[Resend Error] Failed sending admin contact email:",
        adminEmailResult.error,
      );
      return NextResponse.json(
        {
          error:
            adminEmailResult.error.message ||
            "Failed to send email notification",
        },
        { status: 500 },
      );
    }

    // 2. Optionally send confirmation copy to the user
    try {
      await resend.emails.send({
        from: resendFromEmail,
        to: [email],
        subject: `Thank you for contacting Shiv Shakti Logistics`,
        html: getUserContactConfirmationHtml(body),
      });
    } catch (userEmailErr) {
      // In Resend sandbox mode without a custom verified domain, sending to arbitrary user emails
      // may be restricted to account owner email. We catch this so the form submission still succeeds.
      console.info("[Resend Notice] User receipt notice:", userEmailErr);
    }

    return NextResponse.json({
      success: true,
      message: "Your message has been dispatched successfully.",
      id: adminEmailResult.data?.id,
    });
  } catch (error: any) {
    console.error("[Contact API Error]:", error);
    return NextResponse.json(
      { error: error?.message || "Internal server error" },
      { status: 500 },
    );
  }
}
