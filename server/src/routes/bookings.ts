import express from 'express';
import { authenticateToken, AuthRequest } from '../middleware/auth';
import { createRazorpayOrder } from '../services/razorpay';
import { forwardToAppsScript } from '../services/apps-script';
import { sendEmail } from '../services/sendgrid';
import { generateBookingConfirmationEmail } from '../templates/booking-confirmation';

const router = express.Router();

// In-memory storage for mock mode (replace with DB in production)
const mockBookings: any[] = [];

// POST /bookings - Create new booking
router.post('/', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const {
      serviceId,
      serviceName,
      packageId,
      packageName,
      preferredDate,
      preferredTime,
      totalAmount,
      lockingAmount,
      city,
      pincode,
      notes
    } = req.body;

    const user = req.user!;
    const bookingId = `BKG${Date.now()}`;

    // Create booking object
    const booking = {
      id: bookingId,
      serviceId,
      serviceName,
      packageId,
      packageName,
      userId: user.id,
      userName: user.name,
      userEmail: user.email,
      preferredDate,
      preferredTime,
      city,
      pincode,
      totalAmount,
      lockingAmount,
      notes,
      status: 'pending',
      paymentStatus: 'pending',
      createdAt: new Date().toISOString()
    };

    // Store in mock storage
    mockBookings.push(booking);

    // Forward to Apps Script
    await forwardToAppsScript('create', {
      type: 'booking',
      ...booking
    });

    // Create Razorpay order for locking amount
    const razorpayOrder = await createRazorpayOrder(
      lockingAmount * 100, // Convert to paise
      bookingId,
      { bookingId, type: 'booking_lock' }
    );

    res.json({
      bookingId,
      booking,
      razorpayOrder: {
        id: razorpayOrder.id,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency
      }
    });
  } catch (error: any) {
    console.error('Booking creation error:', error);
    res.status(500).json({ error: error.message || 'Failed to create booking' });
  }
});

// GET /bookings - Get user's bookings
router.get('/', authenticateToken, (req: AuthRequest, res) => {
  const user = req.user!;
  const userBookings = mockBookings.filter(b => b.userEmail === user.email);
  res.json({ bookings: userBookings });
});

// POST /bookings/:id/cancel - Cancel booking
router.post('/:id/cancel', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;
    const user = req.user!;

    const booking = mockBookings.find(b => b.id === id && b.userEmail === user.email);
    
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    // Check 6-hour cancellation policy
    const scheduledTime = new Date(booking.preferredDate).getTime();
    const now = Date.now();
    const hoursUntil = (scheduledTime - now) / (1000 * 60 * 60);

    if (hoursUntil < 6) {
      return res.status(400).json({ 
        error: 'Cannot cancel booking less than 6 hours before scheduled time' 
      });
    }

    // Update booking status
    booking.status = 'cancelled';
    booking.refundStatus = 'processing';
    booking.cancelledAt = new Date().toISOString();

    // Forward to Apps Script
    await forwardToAppsScript('cancel', {
      bookingId: id,
      cancelledAt: booking.cancelledAt,
      refundAmount: booking.lockingAmount
    });

    res.json({ 
      success: true, 
      message: 'Booking cancelled successfully',
      booking 
    });
  } catch (error: any) {
    console.error('Booking cancellation error:', error);
    res.status(500).json({ error: error.message || 'Failed to cancel booking' });
  }
});

export default router;
