import express from 'express';
import { authenticateToken, AuthRequest } from '../middleware/auth';
import { createRazorpayOrder } from '../services/razorpay';
import { forwardToAppsScript } from '../services/apps-script';

const router = express.Router();

// In-memory storage for mock mode
const mockOrders: any[] = [];

// POST /orders - Create new order
router.post('/', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const { cartItems, totalAmount, shipping, address } = req.body;

    const user = req.user!;
    const orderId = `ORD${Date.now()}`;

    // Create order object
    const order = {
      id: orderId,
      userId: user.id,
      userName: user.name,
      userEmail: user.email,
      items: cartItems,
      totalAmount,
      shipping: shipping || 0,
      address,
      status: 'pending',
      paymentStatus: 'pending',
      createdAt: new Date().toISOString()
    };

    // Store in mock storage
    mockOrders.push(order);

    // Forward to Apps Script
    await forwardToAppsScript('create', {
      type: 'order',
      ...order
    });

    // Create Razorpay order for full amount
    const razorpayOrder = await createRazorpayOrder(
      totalAmount * 100, // Convert to paise
      orderId,
      { orderId, type: 'product_order' }
    );

    res.json({
      orderId,
      order,
      razorpayOrder: {
        id: razorpayOrder.id,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency
      }
    });
  } catch (error: any) {
    console.error('Order creation error:', error);
    res.status(500).json({ error: error.message || 'Failed to create order' });
  }
});

// GET /orders - Get user's orders
router.get('/', authenticateToken, (req: AuthRequest, res) => {
  const user = req.user!;
  const userOrders = mockOrders.filter(o => o.userEmail === user.email);
  res.json({ orders: userOrders });
});

export default router;
