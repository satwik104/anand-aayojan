import express from 'express';
import { authenticateToken, AuthRequest } from '../middleware/auth';
import { verifyRazorpaySignature } from '../services/razorpay';
import { sendEmail } from '../services/sendgrid';
import { forwardToAppsScript } from '../services/apps-script';
import { generateBookingConfirmationEmail } from '../templates/booking-confirmation';
import { generateOrderConfirmationEmail } from '../templates/order-confirmation';

const router = express.Router();

// POST /payments/verify - Verify payment and update booking/order
router.post('/verify', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const {
      bookingId,
      orderId,
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature
    } = req.body;

    const user = req.user!;

    // Verify signature
    const isValid = verifyRazorpaySignature(
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    );

    if (!isValid) {
      return res.status(400).json({ error: 'Invalid payment signature' });
    }

    // Update status based on type
    if (bookingId) {
      // Update booking
      await forwardToAppsScript('create', {
        type: 'payment_update',
        bookingId,
        paymentId: razorpay_payment_id,
        status: 'locked',
        paymentStatus: 'paid'
      });

      // Send confirmation email (simplified - get actual data from booking record)
      const html = generateBookingConfirmationEmail({
        bookingId,
        serviceName: 'Your Booked Service',
        packageName: 'Selected Package',
        customerName: user.name,
        preferredDate: 'As selected',
        preferredTime: 'As selected',
        lockingAmount: 0,
        totalAmount: 0,
      });

      await sendEmail({
        to: user.email,
        subject: `Booking Confirmed - ${bookingId}`,
        html,
      });

      return res.json({
        success: true,
        message: 'Booking payment verified',
        bookingId
      });
    }

    if (orderId) {
      // Update order
      await forwardToAppsScript('create', {
        type: 'payment_update',
        orderId,
        paymentId: razorpay_payment_id,
        status: 'confirmed',
        paymentStatus: 'paid'
      });

      // Send confirmation email (simplified - get actual data from order record)
      const html = generateOrderConfirmationEmail({
        orderId,
        customerName: user.name,
        items: [],
        totalAmount: 0,
        shipping: 0,
        address: 'As provided',
      });

      await sendEmail({
        to: user.email,
        subject: `Order Confirmed - ${orderId}`,
        html,
      });

      return res.json({
        success: true,
        message: 'Order payment verified',
        orderId
      });
    }

    res.status(400).json({ error: 'Missing bookingId or orderId' });
  } catch (error: any) {
    console.error('Payment verification error:', error);
    res.status(500).json({ error: error.message || 'Payment verification failed' });
  }
});

// POST /payments/webhook - Razorpay webhook endpoint
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  try {
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
    const signature = req.headers['x-razorpay-signature'] as string;

    if (!webhookSecret) {
      console.log('⚠️ RAZORPAY_WEBHOOK_SECRET not configured, accepting webhook');
    } else {
      // Verify webhook signature
      const crypto = require('crypto');
      const expectedSignature = crypto
        .createHmac('sha256', webhookSecret)
        .update(JSON.stringify(req.body))
        .digest('hex');

      if (expectedSignature !== signature) {
        console.error('❌ Invalid webhook signature');
        return res.status(400).json({ error: 'Invalid signature' });
      }
    }

    const event = req.body;
    console.log('📥 Razorpay webhook received:', event.event);

    // Handle different webhook events
    switch (event.event) {
      case 'payment.captured':
        console.log('✅ Payment captured:', event.payload.payment.entity.id);
        // Additional logic can be added here
        break;
      
      case 'payment.failed':
        console.log('❌ Payment failed:', event.payload.payment.entity.id);
        break;
      
      default:
        console.log('ℹ️ Unhandled event:', event.event);
    }

    res.json({ status: 'ok' });
  } catch (error: any) {
    console.error('Webhook error:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
