import { Booking, BookingStatus, PaymentStatus, Service } from '@/types';
import { services } from './services';

const BOOKINGS_STORAGE_KEY = 'anandayojan_bookings';

export class MockApi {
  private static getBookingsFromStorage(): Booking[] {
    if (typeof window === 'undefined') return [];
    try {
      const stored = localStorage.getItem(BOOKINGS_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }

  private static saveBookingsToStorage(bookings: Booking[]): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(bookings));
    } catch (error) {
      console.error('Failed to save bookings:', error);
    }
  }

  static async getServices(): Promise<Service[]> {
    await this.delay(300);
    return services;
  }

  static async getServiceById(id: string): Promise<Service | null> {
    await this.delay(300);
    const service = services.find(s => s.id === id);
    return service || null;
  }

  static async createBooking(bookingData: Partial<Booking>): Promise<{ bookingId: string; paymentUrl: string }> {
    await this.delay(500);

    const bookings = this.getBookingsFromStorage();

    const booking: Booking = {
      id: `BKG${Date.now()}`,
      ...bookingData as Booking,
      status: 'locked',
      paymentStatus: 'pending',
      createdAt: new Date().toISOString(),
      scheduledAt: `${bookingData.preferredDate}T${bookingData.preferredTime}`,
    };

    bookings.push(booking);
    this.saveBookingsToStorage(bookings);

    return {
      bookingId: booking.id,
      paymentUrl: '/payment/mock',
    };
  }

  static async getBookingsByEmail(email: string): Promise<Booking[]> {
    await this.delay(300);
    const bookings = this.getBookingsFromStorage();
    return bookings.filter(b => b.email === email);
  }

  static async getAllBookings(): Promise<Booking[]> {
    await this.delay(300);
    return this.getBookingsFromStorage();
  }

  static async cancelBooking(bookingId: string): Promise<{ success: boolean; refundStatus: string; message: string }> {
    await this.delay(500);

    const bookings = this.getBookingsFromStorage();
    const booking = bookings.find(b => b.id === bookingId);
    if (!booking) {
      throw new Error('Booking not found');
    }

    const scheduledTime = new Date(booking.scheduledAt).getTime();
    const currentTime = Date.now();
    const hoursUntilEvent = (scheduledTime - currentTime) / (1000 * 60 * 60);

    if (hoursUntilEvent < 6) {
      return {
        success: false,
        refundStatus: 'none',
        message: 'Cannot cancel - less than 6 hours remaining before scheduled time',
      };
    }

    booking.status = 'cancelled';
    booking.cancelledAt = new Date().toISOString();
    booking.refundStatus = 'processing';
    booking.paymentStatus = 'refunded';

    this.saveBookingsToStorage(bookings);

    return {
      success: true,
      refundStatus: 'processing',
      message: '100% refund will be processed within 5-7 business days',
    };
  }

  static async markBookingComplete(bookingId: string): Promise<{ success: boolean }> {
    await this.delay(300);

    const bookings = this.getBookingsFromStorage();
    const booking = bookings.find(b => b.id === bookingId);
    if (!booking) {
      throw new Error('Booking not found');
    }

    booking.status = 'completed';
    booking.completedAt = new Date().toISOString();

    this.saveBookingsToStorage(bookings);

    return { success: true };
  }

  static async submitFeedback(bookingId: string, rating: number, comments: string): Promise<{ success: boolean }> {
    await this.delay(300);

    const bookings = this.getBookingsFromStorage();
    const booking = bookings.find(b => b.id === bookingId);
    if (!booking) {
      throw new Error('Booking not found');
    }

    booking.feedback = {
      rating,
      comments,
      createdAt: new Date().toISOString(),
    };

    this.saveBookingsToStorage(bookings);

    return { success: true };
  }

  static async processPayment(bookingId: string): Promise<{ success: boolean; paymentId: string }> {
    await this.delay(1000);

    const bookings = this.getBookingsFromStorage();
    const booking = bookings.find(b => b.id === bookingId);
    if (!booking) {
      throw new Error('Booking not found');
    }

    booking.paymentStatus = 'paid';
    booking.status = 'confirmed';

    this.saveBookingsToStorage(bookings);

    return {
      success: true,
      paymentId: `PAY${Date.now()}`,
    };
  }

  private static delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  static seedDemoBookings(userEmail: string = 'demo@anandayojan.com') {
    const existing = this.getBookingsFromStorage();
    if (existing.length > 0) return;

    const demoBookings: Booking[] = [
      {
        id: 'BKG1001',
        serviceId: 'mehndi',
        serviceName: 'Mehndi Artist',
        packageId: 'mehndi-bridal',
        packageName: 'Bridal',
        name: 'Priya Sharma',
        email: userEmail,
        phone: '+91 98765 43210',
        city: 'Mumbai',
        pincode: '400001',
        preferredDate: '2025-10-15',
        preferredTime: '14:00',
        totalAmount: 5000,
        lockingAmount: 500,
        status: 'confirmed',
        createdAt: '2025-09-28T10:00:00Z',
        scheduledAt: '2025-10-15T14:00:00Z',
        paymentStatus: 'paid',
      },
      {
        id: 'BKG1002',
        serviceId: 'photography',
        serviceName: 'Photography',
        packageId: 'photo-wedding',
        packageName: 'Full Wedding Package',
        name: 'Rahul Verma',
        email: userEmail,
        phone: '+91 98765 43211',
        city: 'Delhi',
        pincode: '110001',
        preferredDate: '2025-11-20',
        preferredTime: '10:00',
        totalAmount: 50000,
        lockingAmount: 5000,
        status: 'locked',
        createdAt: '2025-09-29T15:30:00Z',
        scheduledAt: '2025-11-20T10:00:00Z',
        paymentStatus: 'paid',
      }
    ];

    this.saveBookingsToStorage(demoBookings);
  }
}

if (typeof window !== 'undefined') {
  MockApi.seedDemoBookings();
}
