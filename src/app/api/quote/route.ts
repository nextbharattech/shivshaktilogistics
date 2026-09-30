import { NextResponse } from "next/server";
import { resend, resendFromEmail, getAdminEmails, resendApiKey } from "@/lib/resend";
import {
  getAdminQuoteEmailHtml,
  getUserQuoteConfirmationHtml,
  QuoteEmailPayload,
} from "@/lib/email-templates";

export async function POST(request: Request) {
  try {
    const body: QuoteEmailPayload = await request.json();

    const {
      fullName,
      email,
      phone,
      pickupLocation,
      deliveryLocation,
      cargoType,
      shipmentMode,
      approxWeightKg,
    } = body;

    if (!fullName || !email || !phone || !pickupLocation || !deliveryLocation) {
      return NextResponse.json(
        { error: "Full name, email, phone, pickup, and delivery are required." },
        { status: 400 }
      );
    }

    const refId =
      body.refId || `SSL-REQ-${Math.floor(100000 + Math.random() * 900000)}`;

    const payload: QuoteEmailPayload = {
      ...body,
      refId,
      submittedAt: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
    };

    // Check if Resend API key is configured
    if (!resend || !resendApiKey || resendApiKey.includes("YOUR_RESEND_API_KEY")) {
      console.warn(
        "[Resend Warning] RESEND_API_KEY is not configured or using placeholder in .env.local. Simulated quote log:"
      );
      console.log("Quote submission:", { refId, fullName, email, phone, pickupLocation, deliveryLocation });

      return NextResponse.json({
        success: true,
        refId,
        simulated: true,
        message: "Quote request received (Resend API key pending configuration in .env.local).",
      });
    }

    const adminEmails = getAdminEmails();

    // 1. Send quote alert notification to admin / operations desk (Gmail)
    const adminEmailResult = await resend.emails.send({
      from: resendFromEmail,
      to: adminEmails,
      replyTo: email,
      subject: `[Quote Request ${refId}] ${pickupLocation} to ${deliveryLocation} - ${fullName}`,
      html: getAdminQuoteEmailHtml(payload),
    });

    if (adminEmailResult.error) {
      console.error("[Resend Error] Failed sending quote alert to admin:", adminEmailResult.error);
      return NextResponse.json(
        { error: adminEmailResult.error.message || "Failed to send quote notification email" },
        { status: 500 }
      );
    }

    // 2. Send quote confirmation email to the user
    try {
      await resend.emails.send({
        from: resendFromEmail,
        to: [email],
        subject: `Your Freight Quote Request has been received [${refId}]`,
        html: getUserQuoteConfirmationHtml(payload),
      });
    } catch (userEmailErr) {
      console.info("[Resend Notice] User quote receipt notice:", userEmailErr);
    }

    return NextResponse.json({
      success: true,
      refId,
      message: "Quote request dispatched successfully.",
      id: adminEmailResult.data?.id,
    });
  } catch (error: any) {
    console.error("[Quote API Error]:", error);
    return NextResponse.json(
      { error: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
}
