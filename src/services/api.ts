/**
 * API Service for AnandAyojan
 * Handles all backend communication with mock/real mode toggle
 * 
 * IMPORTANT: Set VITE_USE_MOCK=false and VITE_API_BASE_URL in .env to use real backend
 */

// Use mock mode by default if no backend URL is configured or explicitly set to mock
const USE_MOCK = import.meta.env.VITE_USE_MOCK !== 'false' && !import.meta.env.VITE_API_BASE_URL;
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

// Get auth token from localStorage
const getAuthToken = (): string | null => {
  return localStorage.getItem('aa_token');
};

// API client with auth header
const apiClient = async (endpoint: string, options: RequestInit = {}) => {
  const token = getAuthToken();
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const url = `${API_BASE_URL}${endpoint}`;
  
  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Request failed' }));
      throw new Error(error.error || `HTTP ${response.status}`);
    }

    return await response.json();
  } catch (error: any) {
    console.error('API Error:', error);
    throw error;
  }
};

// Auth API
export const authApi = {
  googleLogin: async (idToken: string) => {
    if (USE_MOCK) {
      console.log('🎭 MOCK: Google login');
      const mockUser = {
        id: `mock_${Date.now()}`,
        email: 'demo@anandayojan.com',
        name: 'Demo User',
        picture: 'https://via.placeholder.com/150'
      };
      const mockToken = `mock_token_${Date.now()}`;
      return { token: mockToken, user: mockUser };
    }

    return apiClient('/auth/google', {
      method: 'POST',
      body: JSON.stringify({ idToken }),
    });
  },

  getMe: async () => {
    if (USE_MOCK) {
      const savedUser = localStorage.getItem('aa_user');
      if (savedUser) {
        return { user: JSON.parse(savedUser) };
      }
      return { user: null };
    }

    return apiClient('/auth/me');
  },
};

// Bookings API
export const bookingsApi = {
  create: async (bookingData: any) => {
    if (USE_MOCK) {
      console.log('🎭 MOCK: Creating booking', bookingData);
      const bookingId = `BKG${Date.now()}`;
      const booking = { 
        ...bookingData, 
        id: bookingId,
        status: 'confirmed',
        createdAt: new Date().toISOString(),
      };
      
      // Save to localStorage
      const bookings = JSON.parse(localStorage.getItem('aa_bookings') || '[]');
      bookings.push(booking);
      localStorage.setItem('aa_bookings', JSON.stringify(bookings));
      
      return {
        bookingId,
        booking,
        razorpayOrder: {
          id: `order_mock_${Date.now()}`,
          amount: bookingData.lockingAmount * 100,
          currency: 'INR',
        },
      };
    }

    return apiClient('/bookings', {
      method: 'POST',
      body: JSON.stringify(bookingData),
    });
  },

  getAll: async () => {
    if (USE_MOCK) {
      const bookings = JSON.parse(localStorage.getItem('aa_bookings') || '[]');
      return { bookings };
    }

    return apiClient('/bookings');
  },

  cancel: async (bookingId: string) => {
    if (USE_MOCK) {
      console.log('🎭 MOCK: Cancelling booking', bookingId);
      return { success: true, message: 'Booking cancelled' };
    }

    return apiClient(`/bookings/${bookingId}/cancel`, {
      method: 'POST',
    });
  },
};

// Orders API
export const ordersApi = {
  create: async (orderData: any) => {
    if (USE_MOCK) {
      console.log('🎭 MOCK: Creating order', orderData);
      const orderId = `ORD${Date.now()}`;
      const order = { 
        ...orderData, 
        id: orderId,
        status: 'confirmed',
        paymentStatus: 'paid',
        createdAt: new Date().toISOString(),
      };
      
      // Save to localStorage
      const orders = JSON.parse(localStorage.getItem('aa_orders') || '[]');
      orders.push(order);
      localStorage.setItem('aa_orders', JSON.stringify(orders));
      
      return {
        orderId,
        order,
        razorpayOrder: {
          id: `order_mock_${Date.now()}`,
          amount: orderData.totalAmount * 100,
          currency: 'INR',
        },
      };
    }

    return apiClient('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  },

  getAll: async () => {
    if (USE_MOCK) {
      const orders = JSON.parse(localStorage.getItem('aa_orders') || '[]');
      return { orders };
    }

    return apiClient('/orders');
  },
};

// Payments API
export const paymentsApi = {
  verify: async (paymentData: any) => {
    if (USE_MOCK) {
      console.log('🎭 MOCK: Verifying payment', paymentData);
      return { success: true, message: 'Payment verified' };
    }

    return apiClient('/payments/verify', {
      method: 'POST',
      body: JSON.stringify(paymentData),
    });
  },
};

// Proxy API (for Apps Script, contact forms, etc.)
export const proxyApi = {
  appsScript: async (action: string, data: any) => {
    if (USE_MOCK) {
      console.log('🎭 MOCK: Apps Script proxy', action, data);
      return { success: true, mock: true };
    }

    return apiClient('/proxy/apps-script', {
      method: 'POST',
      body: JSON.stringify({ action, data }),
    });
  },
};

export { USE_MOCK, API_BASE_URL };
