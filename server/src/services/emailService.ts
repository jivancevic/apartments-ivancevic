import { Resend } from "resend";
import type { Apartment } from "../types";
import { format } from "date-fns";

interface InquiryData {
  name: string;
  email: string;
  phone?: string | null;
  apartmentId?: number | null;
  checkIn: Date | string;
  checkOut: Date | string;
  message?: string | null;
}

let resend: Resend | null = null;
const getResend = (): Resend => {
  if (!resend) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) throw new Error("RESEND_API_KEY required");
    resend = new Resend(apiKey);
  }
  return resend;
};

const OWNER_EMAIL = "info@apartmentsivancevic.com";
const FROM_EMAIL = "no-reply@email.apartmentsivancevic.com";
const BRAND_NAME = "Apartments Ivančević";
const formatDate = (date: Date | string) =>
  format(new Date(date), "dd.MM.yyyy");

export async function sendOwnerNotification(
  inquiry: InquiryData,
  apartment?: Apartment
) {
  if (!process.env.RESEND_API_KEY) return false;
  const subject = `New Inquiry: ${inquiry.name} (${apartment ? `${apartment.nameEn}, ` : ""}${formatDate(inquiry.checkIn)} - ${formatDate(inquiry.checkOut)})`;
  const content = `
      <h1>New Apartment Inquiry</h1>
      <p><strong>From:</strong> ${inquiry.name} &lt;${inquiry.email}&gt;</p>
      ${inquiry.phone ? `<p><strong>Phone:</strong> ${inquiry.phone}</p>` : ""}
      <p><strong>Check-in Date:</strong> ${formatDate(inquiry.checkIn)}</p>
      <p><strong>Check-out Date:</strong> ${formatDate(inquiry.checkOut)}</p>
      ${apartment ? `<p><strong>Apartment:</strong> ${apartment.nameEn} (ID: ${apartment.id})</p>` : ""}
      <h2>Message:</h2>
      <p>${inquiry.message || "(No message provided)"}</p>
    `;
  const { error } = await getResend().emails.send({
    from: `${BRAND_NAME} <${FROM_EMAIL}>`,
    to: OWNER_EMAIL,
    subject,
    html: content,
    replyTo: inquiry.email,
  });
  if (error) return false;
  return true;
}

export async function sendCustomerConfirmation(
  inquiry: InquiryData,
  apartment?: Apartment
) {
  if (!process.env.RESEND_API_KEY) return false;
  const subject = `Your Inquiry at ${BRAND_NAME} - Confirmation`;
  const content = `
      <h1>Thank you for your inquiry!</h1>
      <p>Dear ${inquiry.name},</p>
      <p>We have received your inquiry for a stay at ${BRAND_NAME} ${apartment ? `(${apartment.nameEn})` : ""} from <strong>${formatDate(inquiry.checkIn)}</strong> to <strong>${formatDate(inquiry.checkOut)}</strong>.</p>
      ${inquiry.message ? `<p><em>"${inquiry.message}"</em></p>` : ""}
      <p>If you have any further questions, please contact us at ${OWNER_EMAIL}.</p>
    `;
  const { error } = await getResend().emails.send({
    from: `${BRAND_NAME} <${FROM_EMAIL}>`,
    to: inquiry.email,
    subject,
    html: content,
    replyTo: OWNER_EMAIL,
  });
  if (error) return false;
  return true;
}
