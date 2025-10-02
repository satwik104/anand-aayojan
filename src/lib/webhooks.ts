// Google Sheets webhook integration
// Replace the URL with your actual Apps Script webhook URL

const APPS_SCRIPT_URL = import.meta.env.VITE_APPS_SCRIPT_URL || 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';
const WEBHOOK_SECRET = import.meta.env.VITE_WEBHOOK_SECRET || 'your_secret_key';

export interface BookingWebhookData {
  bookingId: string;
  serviceId: string;
  serviceName: string;
  packageName: string;
  customerName: string;
  email: string;
  phone: string;
  city: string;
  preferredDate: string;
  preferredTime: string;
  totalAmount: number;
  lockingAmount: number;
  status: string;
  createdAt: string;
}

export interface FeedbackWebhookData {
  bookingId: string;
  rating: number;
  comments: string;
  createdAt: string;
}

export interface ContactWebhookData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  type: 'query' | 'complaint' | 'feedback';
  createdAt: string;
}

export const sendBookingToSheet = async (data: BookingWebhookData): Promise<{ success: boolean; error?: string }> => {
  try {
    const url = `${APPS_SCRIPT_URL}?action=create&secret=${WEBHOOK_SECRET}`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).catch(() => {
      // Mock success for development
      console.log('📊 [MOCK] Booking sent to Google Sheet:', data);
      return { ok: true, json: async () => ({ success: true }) };
    });

    if (!response.ok) {
      throw new Error('Failed to send booking to sheet');
    }

    const result = await response.json();
    return { success: true };
  } catch (error) {
    console.error('Error sending booking to sheet:', error);
    return { success: false, error: 'Failed to record booking' };
  }
};

export const sendCancellationToSheet = async (bookingId: string, reason?: string): Promise<{ success: boolean; error?: string }> => {
  try {
    const url = `${APPS_SCRIPT_URL}?action=cancel&secret=${WEBHOOK_SECRET}`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ bookingId, reason, cancelledAt: new Date().toISOString() }),
    }).catch(() => {
      // Mock success for development
      console.log('📊 [MOCK] Cancellation sent to Google Sheet:', { bookingId, reason });
      return { ok: true, json: async () => ({ success: true }) };
    });

    if (!response.ok) {
      throw new Error('Failed to send cancellation to sheet');
    }

    return { success: true };
  } catch (error) {
    console.error('Error sending cancellation to sheet:', error);
    return { success: false, error: 'Failed to record cancellation' };
  }
};

export const sendFeedbackToSheet = async (data: FeedbackWebhookData): Promise<{ success: boolean; error?: string }> => {
  try {
    const url = `${APPS_SCRIPT_URL}?action=feedback&secret=${WEBHOOK_SECRET}`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).catch(() => {
      // Mock success for development
      console.log('📊 [MOCK] Feedback sent to Google Sheet:', data);
      return { ok: true, json: async () => ({ success: true }) };
    });

    if (!response.ok) {
      throw new Error('Failed to send feedback to sheet');
    }

    return { success: true };
  } catch (error) {
    console.error('Error sending feedback to sheet:', error);
    return { success: false, error: 'Failed to record feedback' };
  }
};

export const sendContactToSheet = async (data: ContactWebhookData): Promise<{ success: boolean; error?: string }> => {
  try {
    const url = `${APPS_SCRIPT_URL}?action=contact&secret=${WEBHOOK_SECRET}`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).catch(() => {
      // Mock success for development
      console.log('📊 [MOCK] Contact form sent to Google Sheet:', data);
      return { ok: true, json: async () => ({ success: true }) };
    });

    if (!response.ok) {
      throw new Error('Failed to send contact form to sheet');
    }

    return { success: true };
  } catch (error) {
    console.error('Error sending contact form to sheet:', error);
    return { success: false, error: 'Failed to send message' };
  }
};

// Notification webhook for logging events
export const sendNotification = async (event: string, data: any): Promise<void> => {
  try {
    const url = '/api/notify';
    
    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ event, data, timestamp: new Date().toISOString() }),
    }).catch(() => {
      // Mock - just log to console
      console.log('🔔 [NOTIFICATION]', event, data);
    });
  } catch (error) {
    console.error('Notification error:', error);
  }
};
