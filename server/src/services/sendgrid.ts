import sgMail from '@sendgrid/mail';

const USE_MOCK = process.env.USE_MOCK === 'true';

// PASTE YOUR SENDGRID_API_KEY in .env file
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const SENDGRID_FROM_EMAIL = process.env.SENDGRID_FROM_EMAIL || 'noreply@anandayojan.com';

if (!USE_MOCK && SENDGRID_API_KEY) {
  sgMail.setApiKey(SENDGRID_API_KEY);
}

export interface EmailData {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export const sendEmail = async (emailData: EmailData): Promise<void> => {
  // Mock mode: log email content
  if (USE_MOCK) {
    console.log('🎭 MOCK: Email would be sent');
    console.log('To:', emailData.to);
    console.log('Subject:', emailData.subject);
    console.log('Content:', emailData.text || emailData.html.substring(0, 100) + '...');
    return;
  }

  // Real mode: send via SendGrid
  if (!SENDGRID_API_KEY) {
    throw new Error('SENDGRID_API_KEY not set in .env');
  }

  try {
    await sgMail.send({
      from: SENDGRID_FROM_EMAIL,
      to: emailData.to,
      subject: emailData.subject,
      text: emailData.text,
      html: emailData.html
    });
    console.log('✉️ Email sent to:', emailData.to);
  } catch (error) {
    console.error('SendGrid email failed:', error);
    throw new Error('Failed to send email');
  }
};

export const sendBookingConfirmationEmail = async (
  email: string,
  bookingDetails: any
): Promise<void> => {
  const html = `
    <h1>Booking Confirmation - AnandAyojan</h1>
    <p>Dear ${bookingDetails.userName},</p>
    <p>Your booking has been confirmed!</p>
    <h2>Booking Details:</h2>
    <ul>
      <li><strong>Booking ID:</strong> ${bookingDetails.bookingId}</li>
      <li><strong>Service:</strong> ${bookingDetails.serviceName}</li>
      <li><strong>Date:</strong> ${bookingDetails.date}</li>
      <li><strong>Time:</strong> ${bookingDetails.time}</li>
      <li><strong>Locking Amount Paid:</strong> ₹${bookingDetails.lockingAmount}</li>
      <li><strong>Total Amount:</strong> ₹${bookingDetails.totalAmount}</li>
    </ul>
    <p>Thank you for choosing AnandAyojan!</p>
  `;

  await sendEmail({
    to: email,
    subject: `Booking Confirmation - ${bookingDetails.bookingId}`,
    html,
    text: `Booking confirmed for ${bookingDetails.serviceName} on ${bookingDetails.date}`
  });
};

export const sendOrderConfirmationEmail = async (
  email: string,
  orderDetails: any
): Promise<void> => {
  const html = `
    <h1>Order Confirmation - AnandAyojan</h1>
    <p>Dear ${orderDetails.userName},</p>
    <p>Your order has been confirmed!</p>
    <h2>Order Details:</h2>
    <ul>
      <li><strong>Order ID:</strong> ${orderDetails.orderId}</li>
      <li><strong>Total Amount:</strong> ₹${orderDetails.totalAmount}</li>
      <li><strong>Items:</strong> ${orderDetails.itemCount} items</li>
    </ul>
    <p>We will process your order shortly.</p>
    <p>Thank you for shopping with AnandAyojan!</p>
  `;

  await sendEmail({
    to: email,
    subject: `Order Confirmation - ${orderDetails.orderId}`,
    html,
    text: `Order confirmed - ${orderDetails.orderId}`
  });
};
