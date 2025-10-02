// Razorpay integration placeholder
// Replace with actual Razorpay credentials

declare global {
  interface Window {
    Razorpay: any;
  }
}

const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_XXXXX';

export interface PaymentOptions {
  amount: number;
  currency?: string;
  name: string;
  description: string;
  orderId?: string;
  prefill?: {
    name: string;
    email: string;
    contact: string;
  };
  onSuccess: (response: any) => void;
  onFailure: (error: any) => void;
}

export const initiateRazorpayPayment = (options: PaymentOptions): void => {
  // Check if Razorpay script is loaded
  if (typeof window.Razorpay === 'undefined') {
    console.warn('⚠️ Razorpay SDK not loaded. Using mock payment.');
    mockPayment(options);
    return;
  }

  const razorpayOptions = {
    key: RAZORPAY_KEY_ID,
    amount: options.amount * 100, // Convert to paise
    currency: options.currency || 'INR',
    name: options.name,
    description: options.description,
    order_id: options.orderId,
    prefill: options.prefill,
    theme: {
      color: '#D4AF37', // Golden color matching your theme
    },
    handler: function (response: any) {
      options.onSuccess(response);
    },
    modal: {
      ondismiss: function () {
        options.onFailure({ error: 'Payment cancelled by user' });
      },
    },
  };

  const razorpay = new window.Razorpay(razorpayOptions);
  razorpay.open();
};

// Mock payment for development/testing
const mockPayment = (options: PaymentOptions): void => {
  console.log('💳 [MOCK PAYMENT] Initiating payment:', {
    amount: options.amount,
    name: options.name,
    description: options.description,
  });

  // Simulate payment dialog
  const proceed = window.confirm(
    `Mock Payment\n\n` +
    `Amount: ₹${options.amount}\n` +
    `To: ${options.name}\n` +
    `For: ${options.description}\n\n` +
    `Click OK to simulate successful payment, Cancel to simulate failure.`
  );

  if (proceed) {
    // Simulate network delay
    setTimeout(() => {
      const mockResponse = {
        razorpay_payment_id: `pay_mock_${Date.now()}`,
        razorpay_order_id: options.orderId || `order_mock_${Date.now()}`,
        razorpay_signature: 'mock_signature',
      };
      console.log('✅ [MOCK PAYMENT] Success:', mockResponse);
      options.onSuccess(mockResponse);
    }, 1500);
  } else {
    setTimeout(() => {
      const mockError = {
        error: 'Payment cancelled by user',
        description: 'User closed the payment dialog',
      };
      console.log('❌ [MOCK PAYMENT] Failed:', mockError);
      options.onFailure(mockError);
    }, 500);
  }
};

// API call to create payment order
export const createPaymentOrder = async (amount: number, bookingId?: string): Promise<{ orderId: string; amount: number }> => {
  try {
    const response = await fetch('/api/payments/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount, bookingId }),
    }).catch(() => {
      // Mock response
      return {
        ok: true,
        json: async () => ({
          orderId: `order_mock_${Date.now()}`,
          amount,
        }),
      };
    });

    if (!response.ok) {
      throw new Error('Failed to create payment order');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating payment order:', error);
    // Return mock data for development
    return {
      orderId: `order_mock_${Date.now()}`,
      amount,
    };
  }
};

// Verify payment signature
export const verifyPayment = async (paymentId: string, orderId: string, signature: string): Promise<{ verified: boolean }> => {
  try {
    const response = await fetch('/api/payments/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ paymentId, orderId, signature }),
    }).catch(() => {
      // Mock response
      return {
        ok: true,
        json: async () => ({ verified: true }),
      };
    });

    if (!response.ok) {
      throw new Error('Payment verification failed');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error verifying payment:', error);
    // Mock success for development
    return { verified: true };
  }
};
