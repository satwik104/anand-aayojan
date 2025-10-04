/**
 * Razorpay Payment Integration
 */

import { API_BASE_URL } from '@/services/api';

// Get Razorpay key from environment
const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID || '';

declare global {
  interface Window {
    Razorpay: any;
  }
}

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

/**
 * Dynamically load Razorpay checkout script
 */
export const loadRazorpay = (): Promise<boolean> => {
  return new Promise((resolve) => {
    // Check if already loaded
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    if (!RAZORPAY_KEY_ID) {
      console.error('RAZORPAY_KEY_ID not configured');
      resolve(false);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => {
      console.error('Failed to load Razorpay SDK');
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

/**
 * Create Razorpay checkout instance
 */
export const createRazorpayCheckout = (options: PaymentOptions) => {
  if (!window.Razorpay || !RAZORPAY_KEY_ID) {
    throw new Error('Razorpay not loaded or configured');
  }

  // Real Razorpay checkout
  const razorpayOptions = {
    key: RAZORPAY_KEY_ID,
    amount: options.amount,
    currency: options.currency,
    name: options.name,
    description: options.description,
    order_id: options.orderId,
    prefill: options.prefill,
    handler: (response: any) => {
      console.log('Payment successful:', response);
      options.onSuccess(response);
    },
    modal: {
      ondismiss: () => {
        options.onFailure(new Error('Payment cancelled by user'));
      }
    },
    theme: {
      color: '#F97316'
    }
  };

  return new window.Razorpay(razorpayOptions);
};

/**
 * Main function to initiate payment
 */
export const initiateRazorpayPayment = async (options: PaymentOptions): Promise<void> => {
  const loaded = await loadRazorpay();
  
  if (!loaded) {
    options.onFailure(new Error('Failed to load Razorpay. Please check your configuration.'));
    return;
  }

  const checkout = createRazorpayCheckout(options);
  checkout.open();
};
