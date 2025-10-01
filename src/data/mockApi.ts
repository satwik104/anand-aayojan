import { Booking, BookingStatus, PaymentStatus, Service } from '@/types';
import { services } from './services';

// Mock API for easy backend integration later
export class MockApi {
  private static bookings: Booking[] = [];
  
  // Services API
  static async getServices(): Promise<Service[]> {
    await this.delay(300);
    return services;
  }

  static async getServiceById(id: string): Promise<Service | null> {
    await this.delay(300);
    const service = services.find(s => s.id === id);
    return service || null;
  }

  // Bookings API
  static async createBooking(bookingData: Partial<Booking>): Promise<{ bookingId: string; paymentUrl: string }> {
    await this.delay(500);
    
    const booking: Booking = {
      id: `BKG${Date.now()}`,
      ...bookingData as Booking,
      status: 'locked',
      paymentStatus: 'pending',
      createdAt: new Date().toISOString(),
      scheduledAt: `${bookingData.preferredDate}T${bookingData.preferredTime}`,
    };
    
    this.bookings.push(booking);
    
    return {
      bookingId: booking.id,
      paymentUrl: '/payment/mock',
    };
  }

  static async getBookingsByEmail(email: string): Promise<Booking[]> {
    await this.delay(300);
    return this.bookings.filter(b => b.email === email);
  }

  static async getAllBookings(): Promise<Booking[]> {
    await this.delay(300);
    return [...this.bookings];
  }

  static async cancelBooking(bookingId: string): Promise<{ success: boolean; refundStatus: string; message: string }> {
    await this.delay(500);
    
    const booking = this.bookings.find(b => b.id === bookingId);
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

    return {
      success: true,
      refundStatus: 'processing',
      message: '100% refund will be processed within 5-7 business days',
    };
  }

  static async markBookingComplete(bookingId: string): Promise<{ success: boolean }> {
    await this.delay(300);
    
    const booking = this.bookings.find(b => b.id === bookingId);
    if (!booking) {
      throw new Error('Booking not found');
    }

    booking.status = 'completed';
    booking.completedAt = new Date().toISOString();

    return { success: true };
  }

  static async submitFeedback(bookingId: string, rating: number, comments: string): Promise<{ success: boolean }> {
    await this.delay(300);
    
    const booking = this.bookings.find(b => b.id === bookingId);
    if (!booking) {
      throw new Error('Booking not found');
    }

    booking.feedback = {
      rating,
      comments,
      createdAt: new Date().toISOString(),
    };

    return { success: true };
  }

  static async processPayment(bookingId: string): Promise<{ success: boolean; paymentId: string }> {
    await this.delay(1000);
    
    const booking = this.bookings.find(b => b.id === bookingId);
    if (!booking) {
      throw new Error('Booking not found');
    }

    booking.paymentStatus = 'paid';
    booking.status = 'confirmed';

    return {
      success: true,
      paymentId: `PAY${Date.now()}`,
    };
  }

  private static delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Helper to seed some demo bookings
  static seedDemoBookings(userEmail: string = 'demo@anandayojan.com') {
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

    this.bookings = [...demoBookings];
  }
}

// Initialize with demo data
if (typeof window !== 'undefined') {
  MockApi.seedDemoBookings();
}
