/**
 * Email template for order confirmation
 */

export interface OrderEmailData {
  orderId: string;
  customerName: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  totalAmount: number;
  shipping: number;
  address: string;
}

export const generateOrderConfirmationEmail = (data: OrderEmailData): string => {
  const itemsHtml = data.items
    .map(
      (item) => `
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">${item.name}</td>
        <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; text-align: center;">${item.quantity}</td>
        <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; text-align: right;">₹${item.price.toLocaleString()}</td>
        <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; text-align: right; font-weight: 600;">₹${(item.price * item.quantity).toLocaleString()}</td>
      </tr>
    `
    )
    .join('');

  const subtotal = data.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Order Confirmation</title>
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
    .order-table {
      width: 100%;
      border-collapse: collapse;
      margin: 20px 0;
    }
    .order-table th {
      background: #f9fafb;
      padding: 12px 10px;
      text-align: left;
      font-weight: 600;
      color: #6b7280;
      border-bottom: 2px solid #e5e7eb;
    }
    .totals {
      background: #f9fafb;
      padding: 20px;
      border-radius: 8px;
      margin: 20px 0;
    }
    .total-row {
      display: flex;
      justify-content: space-between;
      padding: 8px 0;
    }
    .grand-total {
      border-top: 2px solid #D4AF37;
      padding-top: 10px;
      margin-top: 10px;
      font-size: 18px;
      font-weight: 700;
      color: #D4AF37;
    }
    .shipping-info {
      background: #f0f9ff;
      padding: 15px;
      border-left: 4px solid #3b82f6;
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
    <h1 style="margin: 0; font-size: 28px;">📦 Order Confirmed!</h1>
    <p style="margin: 10px 0 0 0; opacity: 0.9;">Thank you for shopping with AnandAyojan</p>
  </div>

  <div class="content">
    <p>Dear ${data.customerName},</p>
    
    <p>Your order has been successfully placed and payment received. We'll process your order shortly!</p>

    <h2 style="color: #111827; margin-top: 30px;">Order Details</h2>
    <p style="color: #6b7280; margin: 0 0 10px 0;">Order ID: <strong>${data.orderId}</strong></p>

    <table class="order-table">
      <thead>
        <tr>
          <th>Product</th>
          <th style="text-align: center;">Qty</th>
          <th style="text-align: right;">Price</th>
          <th style="text-align: right;">Total</th>
        </tr>
      </thead>
      <tbody>
        ${itemsHtml}
      </tbody>
    </table>

    <div class="totals">
      <div class="total-row">
        <span>Subtotal:</span>
        <span>₹${subtotal.toLocaleString()}</span>
      </div>
      <div class="total-row">
        <span>Shipping:</span>
        <span>${data.shipping > 0 ? `₹${data.shipping.toLocaleString()}` : 'FREE'}</span>
      </div>
      <div class="total-row grand-total">
        <span>Grand Total:</span>
        <span>₹${data.totalAmount.toLocaleString()}</span>
      </div>
    </div>

    <div class="shipping-info">
      <strong>📍 Shipping Address:</strong>
      <p style="margin: 10px 0 0 0;">${data.address.replace(/\n/g, '<br>')}</p>
    </div>

    <div style="background: #fef3c7; padding: 15px; border-left: 4px solid #D4AF37; margin: 20px 0; border-radius: 4px;">
      <strong>📅 What's Next?</strong>
      <ul style="margin: 10px 0 0 0; padding-left: 20px;">
        <li>Your order will be processed within 24-48 hours</li>
        <li>You'll receive a tracking number once shipped</li>
        <li>Expected delivery: 5-7 business days</li>
      </ul>
    </div>

    <div style="text-align: center;">
      <a href="${process.env.FRONTEND_BASE_URL || 'http://localhost:3000'}/my-orders" class="button">
        Track My Order
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
