export interface Service {
  id: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  category: string;
  image: string;
  gallery: string[];
  startingPrice: number;
  rating: number;
  reviewCount: number;
  packages: ServicePackage[];
  faqs: FAQ[];
  features: string[];
}

export interface ServicePackage {
  id: string;
  name: string;
  description: string;
  price: number;
  duration?: string;
  includes: string[];
  popular?: boolean;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Booking {
  id: string;
  serviceId: string;
  serviceName: string;
  packageId: string;
  packageName: string;
  name: string;
  email: string;
  phone: string;
  address?: string;
  city: string;
  pincode: string;
  preferredDate: string;
  preferredTime: string;
  estimatedGuests?: number;
  notes?: string;
  totalAmount: number;
  lockingAmount: number;
  status: BookingStatus;
  createdAt: string;
  scheduledAt: string;
  cancelledAt?: string;
  completedAt?: string;
  paymentStatus: PaymentStatus;
  refundStatus?: RefundStatus;
  feedback?: BookingFeedback;
}

export type BookingStatus = 'locked' | 'confirmed' | 'completed' | 'cancelled';
export type PaymentStatus = 'pending' | 'paid' | 'refunded' | 'failed';
export type RefundStatus = 'none' | 'processing' | 'completed';

export interface BookingFeedback {
  rating: number;
  comments: string;
  createdAt: string;
}

export interface ShoppingItem {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
}

export interface CartItem extends ShoppingItem {
  quantity: number;
}
