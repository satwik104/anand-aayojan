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
    // Force MOCK mode when using default test key
    if (RAZORPAY_KEY_ID === 'rzp_test_XXXXX') {
      console.info('💳 [MOCK PAYMENT] Skipping Razorpay SDK load (test key)');
      resolve(false);
      return;
    }

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
  // Force mock mode when using default test key
  if (RAZORPAY_KEY_ID === 'rzp_test_XXXXX') {
    console.info('💳 [MOCK PAYMENT] Using mock checkout (test key)');
    return {
      open: () => mockPayment(options),
    };
  }

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
  console.log('💳 [MOCK PAYMENT] Initiating mock payment flow');

  // Create a custom modal-like experience
  const overlay = document.createElement('div');
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 99999;
    font-family: system-ui, -apple-system, sans-serif;
  `;

  const modal = document.createElement('div');
  modal.style.cssText = `
    background: white;
    border-radius: 12px;
    padding: 32px;
    max-width: 400px;
    width: 90%;
    box-shadow: 0 20px 60px rgba(0,0,0,0.3);
    text-align: center;
  `;

  modal.innerHTML = `
    <div style="color: #10b981; font-size: 48px; margin-bottom: 16px;">✓</div>
    <h2 style="color: #1f2937; font-size: 24px; margin-bottom: 8px; font-weight: 600;">Mock Payment</h2>
    <p style="color: #6b7280; font-size: 14px; margin-bottom: 24px;">Testing Mode - No real payment</p>
    <div style="background: #f3f4f6; padding: 16px; border-radius: 8px; margin-bottom: 24px;">
      <p style="color: #6b7280; font-size: 12px; margin-bottom: 4px;">Amount</p>
      <p style="color: #1f2937; font-size: 28px; font-weight: 700;">₹${(options.amount / 100).toLocaleString()}</p>
      <p style="color: #6b7280; font-size: 14px; margin-top: 8px;">${options.description}</p>
    </div>
    <div style="display: flex; gap: 12px;">
      <button id="mock-cancel" style="
        flex: 1;
        padding: 12px;
        border: 2px solid #e5e7eb;
        background: white;
        color: #6b7280;
        border-radius: 8px;
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s;
      ">Cancel</button>
      <button id="mock-pay" style="
        flex: 1;
        padding: 12px;
        border: none;
        background: linear-gradient(135deg, #10b981, #059669);
        color: white;
        border-radius: 8px;
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s;
      ">Pay Now</button>
    </div>
  `;

  overlay.appendChild(modal);
  document.body.appendChild(overlay);

  // Lock scroll while modal is open
  const prevOverflow = document.body.style.overflow;
  document.body.style.overflow = 'hidden';

  const unlockScroll = () => {
    document.body.style.overflow = prevOverflow;
    try {
      document.documentElement.removeAttribute('data-scroll-locked');
      document.body.removeAttribute('data-scroll-locked');
      document.documentElement.style.pointerEvents = '';
      document.body.style.pointerEvents = '';
    } catch {}
  };

  const cleanup = () => {
    if (overlay.parentNode) {
      overlay.parentNode.removeChild(overlay);
    }
    unlockScroll();
    document.removeEventListener('keydown', onKeyDown);
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      cancel();
    }
  };

  const pay = () => {
    cleanup();
    setTimeout(() => {
      const mockResponse = {
        razorpay_payment_id: `pay_mock_${Date.now()}`,
        razorpay_order_id: options.orderId,
        razorpay_signature: 'mock_signature',
      };
      console.log('✅ [MOCK PAYMENT] Success:', mockResponse);
      options.onSuccess(mockResponse);
    }, 300);
  };

  const cancel = () => {
    cleanup();
    setTimeout(() => {
      const mockError = {
        error: 'Payment cancelled by user',
        description: 'User closed the payment dialog',
      };
      console.log('❌ [MOCK PAYMENT] Cancelled:', mockError);
      options.onFailure(mockError);
    }, 200);
  };

  document.addEventListener('keydown', onKeyDown);

  // Handle buttons and overlay interaction
  modal.querySelector('#mock-pay')?.addEventListener('click', pay);
  modal.querySelector('#mock-cancel')?.addEventListener('click', cancel);

  // Close on overlay click
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      cancel();
    }
  });
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

