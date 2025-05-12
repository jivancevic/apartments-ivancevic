import { Resend } from 'resend';
import { Inquiry, Apartment } from '../shared/schema';
import { format } from 'date-fns';

// Define InquiryData interface to match the inquiry submission data
interface InquiryData {
  name: string;
  email: string;
  phone?: string;
  apartmentId?: number;
  checkIn: Date;
  checkOut: Date;
  message?: string;
}

// Initialize Resend with API key
const resend = new Resend(process.env.RESEND_API_KEY);

// Constants for email configuration
const OWNER_EMAIL = 'josip.ivancevic00@gmail.com';
const FROM_EMAIL = 'no-reply@apartmani-ivancevic.com';
const BRAND_NAME = 'Apartmani Ivančević';

/**
 * Format a date for email display
 */
const formatDate = (date: Date): string => {
  return format(new Date(date), 'dd.MM.yyyy');
};

/**
 * Send notification email to owner about new inquiry
 */
export async function sendOwnerNotification(
  inquiry: InquiryData,
  apartment?: Apartment,
): Promise<boolean> {
  try {
    // Create email content
    const subject = `New Inquiry: ${inquiry.name} (${formatDate(inquiry.checkIn)} - ${formatDate(inquiry.checkOut)})`;
    
    const content = `
      <h1>New Apartment Inquiry</h1>
      <p><strong>From:</strong> ${inquiry.name} &lt;${inquiry.email}&gt;</p>
      ${inquiry.phone ? `<p><strong>Phone:</strong> ${inquiry.phone}</p>` : ''}
      <p><strong>Check-in Date:</strong> ${formatDate(inquiry.checkIn)}</p>
      <p><strong>Check-out Date:</strong> ${formatDate(inquiry.checkOut)}</p>
      ${apartment ? `<p><strong>Apartment:</strong> ${apartment.nameEn} (ID: ${apartment.id})</p>` : ''}
      
      <h2>Message:</h2>
      <p>${inquiry.message || '(No message provided)'}</p>
    `;
    
    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: `${BRAND_NAME} <${FROM_EMAIL}>`,
      to: OWNER_EMAIL,
      subject,
      html: content,
      reply_to: inquiry.email,
    });
    
    if (error) {
      console.error('Error sending owner notification email:', error);
      return false;
    }
    
    console.log('Owner notification email sent:', data);
    return true;
  } catch (error) {
    console.error('Exception sending owner notification email:', error);
    return false;
  }
}

/**
 * Send confirmation email to the customer
 */
export async function sendCustomerConfirmation(
  inquiry: InquiryFormData,
  apartment?: Apartment,
): Promise<boolean> {
  try {
    // Create email content
    const subject = `Your Inquiry at ${BRAND_NAME} - Confirmation`;
    
    const content = `
      <h1>Thank you for your inquiry!</h1>
      
      <p>Dear ${inquiry.name},</p>
      
      <p>We have received your inquiry for a stay at ${BRAND_NAME} 
         ${apartment ? `(${apartment.nameEn})` : ''} 
         from <strong>${formatDate(inquiry.checkIn)}</strong> to 
         <strong>${formatDate(inquiry.checkOut)}</strong>.
      </p>
      
      <p>We will review your request and get back to you as soon as possible, 
         usually within 24 hours.
      </p>
      
      ${inquiry.message ? 
        `<h2>Your message to us:</h2>
         <p><em>"${inquiry.message}"</em></p>` 
        : ''}
      
      <p>If you have any further questions, please feel free to reply 
         to this email or contact us directly at ${OWNER_EMAIL}.
      </p>
      
      <p>Best regards,<br>
         The ${BRAND_NAME} Team</p>
    `;
    
    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: `${BRAND_NAME} <${FROM_EMAIL}>`,
      to: inquiry.email,
      subject,
      html: content,
      reply_to: OWNER_EMAIL,
    });
    
    if (error) {
      console.error('Error sending customer confirmation email:', error);
      return false;
    }
    
    console.log('Customer confirmation email sent:', data);
    return true;
  } catch (error) {
    console.error('Exception sending customer confirmation email:', error);
    return false;
  }
}