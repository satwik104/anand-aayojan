// Razorpay payment integration
// Configure VITE_RAZORPAY_KEY_ID in .env for production

declare global {
  interface Window {
    Razorpay: any;
  }
}

const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_XXXXX';

export interface PaymentOptions {
  orderId: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  prefill?: {
    name: string;
    email: string;
    contact: string;
  };
  onSuccess: (response: any) => void;
  onFailure: (error: any) => void;
}

// Load Razorpay SDK dynamically
export const loadRazorpay = (): Promise<boolean> => {
  return new Promise((resolve) => {
    // If already loaded
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => {
      console.warn('⚠️ Razorpay SDK failed to load. Using mock mode.');
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

// Create Razorpay checkout instance
export const createRazorpayCheckout = (options: PaymentOptions) => {
  // Check if Razorpay is loaded
  if (!window.Razorpay) {
    console.warn('⚠️ Razorpay not loaded. Using mock payment.');
    return {
      open: () => mockPayment(options),
    };
  }

  const razorpayOptions = {
    key: RAZORPAY_KEY_ID,
    amount: options.amount,
    currency: options.currency,
    name: options.name,
    description: options.description,
    order_id: options.orderId,
    prefill: options.prefill,
    theme: {
      color: '#D4AF37',
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

  return new window.Razorpay(razorpayOptions);
};

// Mock payment for development/testing
const mockPayment = (options: PaymentOptions): void => {
  console.log('💳 [MOCK PAYMENT] Initiating payment:', {
    amount: options.amount / 100,
    name: options.name,
    description: options.description,
  });

  // Simulate payment dialog
  const proceed = window.confirm(
    `Mock Payment\n\n` +
    `Amount: ₹${options.amount / 100}\n` +
    `To: ${options.name}\n` +
    `For: ${options.description}\n\n` +
    `Click OK to simulate successful payment, Cancel to simulate failure.`
  );

  if (proceed) {
    setTimeout(() => {
      const mockResponse = {
        razorpay_payment_id: `pay_mock_${Date.now()}`,
        razorpay_order_id: options.orderId,
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

// Convenience helper to initiate payment in one call
export const initiateRazorpayPayment = async (options: PaymentOptions): Promise<void> => {
  // Ensure SDK is loaded (or fall back to mock)
  try {
    await loadRazorpay();
  } catch (e) {
    console.warn('Razorpay load failed, proceeding with mock if available.', e);
  }

  const checkout = createRazorpayCheckout(options);
  // Both real and mock instances expose .open()
  (checkout as any).open();
};

