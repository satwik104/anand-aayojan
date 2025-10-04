import Razorpay from 'razorpay';
import crypto from 'crypto';

const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID;
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET;

if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) {
  console.warn('⚠️ RAZORPAY_KEY_ID or RAZORPAY_KEY_SECRET not set in .env - payments will fail');
}

const razorpayInstance = (RAZORPAY_KEY_ID && RAZORPAY_KEY_SECRET) 
  ? new Razorpay({
      key_id: RAZORPAY_KEY_ID,
      key_secret: RAZORPAY_KEY_SECRET,
    })
  : null;

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
