/**
 * Email integration module.
 * Uses Resend when RESEND_API_KEY and CONTACT_TO_EMAIL are configured.
 * In unconfigured environments, returns a clearly documented failure.
 */

export interface EmailPayload {
  ownerName: string;
  email: string;
  petName: string;
  service: string;
  message: string;
}

export interface EmailResult {
  success: boolean;
  error?: string;
}

export async function sendContactEmail(payload: EmailPayload): Promise<EmailResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;
  const fromEmail = process.env.CONTACT_FROM_EMAIL ?? "noreply@aleefvet.com";

  if (!apiKey || !toEmail) {
    console.warn(
      "[email] Resend is not configured. Set RESEND_API_KEY and CONTACT_TO_EMAIL to enable email delivery."
    );
    return {
      success: false,
      error: "Email service is not configured. Please contact the clinic directly at hello@aleefvet.com.",
    };
  }

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);

    const serviceLabels: Record<string, string> = {
      grooming: "Grooming",
      "check-up": "Check-up / Wellness Exam",
      surgery: "Surgery",
      ultrasound: "Ultrasound / Diagnostic Imaging",
    };
    const serviceLabel = serviceLabels[payload.service] ?? payload.service;

    const { error } = await resend.emails.send({
      from: `Aleef Veterinary Website <${fromEmail}>`,
      to: [toEmail],
      replyTo: payload.email,
      subject: `New Enquiry — ${serviceLabel} — ${payload.ownerName}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
          <h2 style="color: #1a6b8a; margin-top: 0;">New Contact Form Submission</h2>
          <table style="width: 100%; border-collapse: collapse; font-size: 15px;">
            <tr><td style="padding: 8px 0; color: #718096; width: 150px; vertical-align: top;">Pet Owner</td>
                <td style="padding: 8px 0; font-weight: 600;">${escapeHtml(payload.ownerName)}</td></tr>
            <tr><td style="padding: 8px 0; color: #718096; vertical-align: top;">Email</td>
                <td style="padding: 8px 0;"><a href="mailto:${escapeHtml(payload.email)}">${escapeHtml(payload.email)}</a></td></tr>
            <tr><td style="padding: 8px 0; color: #718096; vertical-align: top;">Pet Name</td>
                <td style="padding: 8px 0; font-weight: 600;">${escapeHtml(payload.petName)}</td></tr>
            <tr><td style="padding: 8px 0; color: #718096; vertical-align: top;">Service</td>
                <td style="padding: 8px 0;">${escapeHtml(serviceLabel)}</td></tr>
            <tr><td style="padding: 8px 0; color: #718096; vertical-align: top;">Message</td>
                <td style="padding: 8px 0; white-space: pre-wrap;">${escapeHtml(payload.message)}</td></tr>
          </table>
          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
          <p style="color: #a0aec0; font-size: 13px; margin: 0;">
            Submitted via the Aleef Veterinary website contact form.
          </p>
        </div>
      `,
    });

    if (error) {
      console.error("[email] Resend returned error:", error);
      return {
        success: false,
        error: "We could not send your message at this time. Please try again or contact us directly.",
      };
    }

    return { success: true };
  } catch (err) {
    console.error("[email] Unexpected error sending email:", err);
    return {
      success: false,
      error: "An unexpected error occurred. Please try again or contact us directly.",
    };
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
