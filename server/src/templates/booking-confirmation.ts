/**
 * Email template for booking confirmation
 * Uses SendGrid to send HTML emails
 */

export interface BookingEmailData {
  bookingId: string;
  serviceName: string;
  packageName: string;
  customerName: string;
  preferredDate: string;
  preferredTime: string;
  lockingAmount: number;
  totalAmount: number;
}

export const generateBookingConfirmationEmail = (data: BookingEmailData): string => {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Booking Confirmation</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      background: linear-gradient(135deg, #D4AF37 0%, #C5A028 100%);
      color: white;
      padding: 30px;
      text-align: center;
      border-radius: 8px 8px 0 0;
    }
    .content {
      background: #fff;
      padding: 30px;
      border: 1px solid #e5e7eb;
      border-top: none;
    }
    .booking-details {
      background: #f9fafb;
      padding: 20px;
      border-radius: 8px;
      margin: 20px 0;
    }
    .detail-row {
      display: flex;
      justify-content: space-between;
      padding: 10px 0;
      border-bottom: 1px solid #e5e7eb;
    }
    .detail-row:last-child {
      border-bottom: none;
    }
    .label {
      font-weight: 600;
      color: #6b7280;
    }
    .value {
      color: #111827;
    }
    .highlight {
      background: #fef3c7;
      padding: 15px;
      border-left: 4px solid #D4AF37;
      margin: 20px 0;
      border-radius: 4px;
    }
    .footer {
      background: #f9fafb;
      padding: 20px;
      text-align: center;
      border-radius: 0 0 8px 8px;
      font-size: 14px;
      color: #6b7280;
    }
    .button {
      display: inline-block;
      background: #D4AF37;
      color: white;
      padding: 12px 24px;
      text-decoration: none;
      border-radius: 6px;
      margin: 20px 0;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1 style="margin: 0; font-size: 28px;">🎉 Booking Confirmed!</h1>
    <p style="margin: 10px 0 0 0; opacity: 0.9;">AnandAyojan - Your Event Partner</p>
  </div>

  <div class="content">
    <p>Dear ${data.customerName},</p>
    
    <p>Thank you for booking with AnandAyojan! Your booking has been successfully confirmed.</p>

    <div class="booking-details">
      <h2 style="margin-top: 0; color: #111827;">Booking Details</h2>
      
      <div class="detail-row">
        <span class="label">Booking ID:</span>
        <span class="value"><strong>${data.bookingId}</strong></span>
      </div>
      
      <div class="detail-row">
        <span class="label">Service:</span>
        <span class="value">${data.serviceName}</span>
      </div>
      
      <div class="detail-row">
        <span class="label">Package:</span>
        <span class="value">${data.packageName}</span>
      </div>
      
      <div class="detail-row">
        <span class="label">Date:</span>
        <span class="value">${data.preferredDate}</span>
      </div>
      
      <div class="detail-row">
        <span class="label">Time:</span>
        <span class="value">${data.preferredTime}</span>
      </div>
      
      <div class="detail-row">
        <span class="label">Amount Paid (Locking):</span>
        <span class="value"><strong>₹${data.lockingAmount.toLocaleString()}</strong></span>
      </div>
      
      <div class="detail-row">
        <span class="label">Total Amount:</span>
        <span class="value">₹${data.totalAmount.toLocaleString()}</span>
      </div>
      
      <div class="detail-row">
        <span class="label">Remaining Amount:</span>
        <span class="value">₹${(data.totalAmount - data.lockingAmount).toLocaleString()}</span>
      </div>
    </div>

    <div class="highlight">
      <strong>📋 Important Information:</strong>
      <ul style="margin: 10px 0 0 0; padding-left: 20px;">
        <li>You've secured this booking with 10% advance payment</li>
        <li>Remaining amount to be paid after service completion</li>
        <li>Service provider will contact you 24-48 hours before the event</li>
      </ul>
    </div>

    <div class="highlight" style="background: #fee2e2; border-left-color: #dc2626;">
      <strong>🔄 Cancellation Policy:</strong>
      <p style="margin: 10px 0 0 0;">
        You can cancel this booking and get a <strong>100% refund</strong> if cancelled at least 6 hours before your scheduled time.
      </p>
    </div>

    <div style="text-align: center;">
      <a href="${process.env.FRONTEND_BASE_URL || 'http://localhost:3000'}/my-bookings" class="button">
        View My Bookings
      </a>
    </div>
  </div>

  <div class="footer">
    <p style="margin: 0 0 10px 0;">Need help? Contact us at support@anandayojan.com</p>
    <p style="margin: 0; font-size: 12px; color: #9ca3af;">
      © ${new Date().getFullYear()} AnandAyojan. All rights reserved.
    </p>
  </div>
</body>
</html>
  `.trim();
};
