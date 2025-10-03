import express from 'express';
import { authenticateToken, AuthRequest } from '../middleware/auth';
import { verifyRazorpaySignature } from '../services/razorpay';
import { sendBookingConfirmationEmail, sendOrderConfirmationEmail } from '../services/sendgrid';
import { forwardToAppsScript } from '../services/apps-script';

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

      // Send confirmation email
      await sendBookingConfirmationEmail(user.email, {
        bookingId,
        userName: user.name,
        serviceName: 'Service',
        date: 'TBD',
        time: 'TBD',
        lockingAmount: 0,
        totalAmount: 0
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

      // Send confirmation email
      await sendOrderConfirmationEmail(user.email, {
        orderId,
        userName: user.name,
        totalAmount: 0,
        itemCount: 0
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

export default router;
