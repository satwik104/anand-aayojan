import Razorpay from 'razorpay';
import crypto from 'crypto';

const USE_MOCK = process.env.USE_MOCK === 'true';

// PASTE YOUR RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in .env file
const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID;
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET;

let razorpayInstance: Razorpay | null = null;

if (!USE_MOCK && RAZORPAY_KEY_ID && RAZORPAY_KEY_SECRET) {
  razorpayInstance = new Razorpay({
    key_id: RAZORPAY_KEY_ID,
    key_secret: RAZORPAY_KEY_SECRET,
  });
}

export interface RazorpayOrder {
  id: string;
  amount: number;
  currency: string;
  receipt: string;
}

export const createRazorpayOrder = async (
  amount: number,
  receipt: string,
  notes?: any
): Promise<RazorpayOrder> => {
  // Mock mode: return fake order
  if (USE_MOCK) {
    console.log('🎭 MOCK: Creating fake Razorpay order');
    return {
      id: `order_mock_${Date.now()}`,
      amount: amount,
      currency: 'INR',
      receipt: receipt
    };
  }

  // Real mode: create actual Razorpay order
  if (!razorpayInstance) {
    throw new Error('Razorpay not initialized. Set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in .env');
  }

  try {
    const order = await razorpayInstance.orders.create({
      amount: amount, // amount in paise
      currency: 'INR',
      receipt: receipt,
      notes: notes || {}
    });

    return {
      id: order.id,
      amount: order.amount,
      currency: order.currency,
      receipt: order.receipt
    };
  } catch (error) {
    console.error('Razorpay order creation failed:', error);
    throw new Error('Failed to create payment order');
  }
};

export const verifyRazorpaySignature = (
  orderId: string,
  paymentId: string,
  signature: string
): boolean => {
  // Mock mode: always return true
  if (USE_MOCK) {
    console.log('🎭 MOCK: Accepting payment signature without verification');
    return true;
  }

  // Real mode: verify signature
  if (!RAZORPAY_KEY_SECRET) {
    throw new Error('RAZORPAY_KEY_SECRET not set');
  }

  const body = orderId + '|' + paymentId;
  const expectedSignature = crypto
    .createHmac('sha256', RAZORPAY_KEY_SECRET)
    .update(body)
    .digest('hex');

  return expectedSignature === signature;
};
