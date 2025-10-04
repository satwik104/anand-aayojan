/**
 * API Service for AnandAyojan
 * Handles all backend communication
 * 
 * IMPORTANT: Set VITE_API_BASE_URL in .env to your backend URL
 */

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
    return apiClient('/auth/google', {
      method: 'POST',
      body: JSON.stringify({ idToken }),
    });
  },

  emailSignup: async (email: string, password: string, name: string) => {
    return apiClient('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ email, password, name }),
    });
  },

  emailLogin: async (email: string, password: string) => {
    return apiClient('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },

  getMe: async () => {
    return apiClient('/auth/me');
  },
};

// Bookings API
export const bookingsApi = {
  create: async (bookingData: any) => {
    return apiClient('/bookings', {
      method: 'POST',
      body: JSON.stringify(bookingData),
    });
  },

  getAll: async () => {
    return apiClient('/bookings');
  },

  cancel: async (bookingId: string) => {
    return apiClient(`/bookings/${bookingId}/cancel`, {
      method: 'POST',
    });
  },
};

// Orders API
export const ordersApi = {
  create: async (orderData: any) => {
    return apiClient('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  },

  getAll: async () => {
    return apiClient('/orders');
  },
};

// Payments API
export const paymentsApi = {
  verify: async (paymentData: any) => {
    return apiClient('/payments/verify', {
      method: 'POST',
      body: JSON.stringify(paymentData),
    });
  },
};

export { API_BASE_URL };
