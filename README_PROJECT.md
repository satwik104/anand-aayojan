# AnandAyojan - Event Services Booking Platform

A beautiful, production-ready frontend MVP for booking event and home services in India. Built with React, TypeScript, Tailwind CSS, and shadcn/ui components.

## 🎯 Project Overview

AnandAyojan is a service marketplace mediator for Indian event and home services. Users can browse services, book professionals by paying just 10% upfront (locking amount), and cancel with 100% refund if cancelled ≥6 hours before scheduled time.

## ✨ Features

### Core Features
- **8 Complete Services**: Mehndi Artist, Dhol & Music, Decoration, Pandit Ji, Beauty & Makeup, Photography, Helper Services, and Bhaat & Mayera Shopping
- **10% Locking System**: Pay 10% upfront to secure booking, remaining on service delivery
- **Flexible Cancellation**: 100% refund if cancelled ≥6 hours before scheduled time
- **Service Packages**: Multiple packages per service with detailed inclusions
- **Booking Management**: View, manage, and cancel bookings
- **Feedback System**: Rate and review services after completion
- **Admin Dashboard**: Monitor and manage all bookings

### User Experience
- Fully responsive design (mobile, tablet, desktop)
- Beautiful Indian wedding-themed design with warm gold and teal colors
- Smooth animations and transitions
- Trust badges and testimonials
- Clear pricing and cancellation policy
- SEO-optimized pages

## 🏗️ Tech Stack

- **Framework**: React 18 + Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Routing**: React Router v6
- **Form Handling**: React Hook Form + Zod validation
- **State Management**: React Query (TanStack Query)
- **Icons**: Lucide React
- **Fonts**: Playfair Display (headings) + Inter (body)

## 📁 Project Structure

```
src/
├── assets/               # Images and static assets
│   ├── hero-wedding.jpg
│   └── service-*.jpg
├── components/
│   ├── layout/          # Header, Footer
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   ├── ui/              # shadcn UI components
│   ├── BookingForm.tsx  # Booking form component
│   └── ServiceCard.tsx  # Service card component
├── data/
│   ├── services.ts      # Services data
│   └── mockApi.ts       # Mock API implementation
├── hooks/
│   ├── use-mobile.tsx
│   └── use-toast.ts
├── pages/
│   ├── Home.tsx         # Landing page
│   ├── Services.tsx     # Services listing
│   ├── ServiceDetail.tsx # Service detail with booking
│   ├── BookingSuccess.tsx # Booking confirmation
│   ├── MyBookings.tsx   # User bookings dashboard
│   ├── Admin.tsx        # Admin dashboard
│   └── NotFound.tsx     # 404 page
├── types/
│   └── index.ts         # TypeScript interfaces
├── App.tsx              # Main app component
├── index.css            # Global styles & design system
└── main.tsx             # Entry point
```

## 🎨 Design System

### Color Palette (HSL)
- **Primary (Gold)**: `38 92% 50%` - Warm, festive, trustworthy
- **Secondary (Teal)**: `180 45% 35%` - Elegant, professional
- **Accent (Rose)**: `350 65% 45%` - Wedding vibes
- **Background**: `35 40% 98%` - Soft cream
- **Foreground**: `24 20% 15%` - Charcoal text

### Typography
- **Headings**: Playfair Display (serif, decorative)
- **Body**: Inter (sans-serif, clean)

### Key Design Tokens
- Gradients: `gradient-primary`, `gradient-hero`, `gradient-festive`
- Shadows: `shadow-soft`, `shadow-medium`, `shadow-large`, `shadow-gold`
- Animations: `animate-fade-in`, `animate-scale-in`, `animate-slide-up`

## 🔌 Mock API Documentation

All API interactions use the `MockApi` class in `src/data/mockApi.ts`. Easy to replace with real backend.

### API Endpoints

#### Services
```typescript
// Get all services
MockApi.getServices(): Promise<Service[]>

// Get service by ID
MockApi.getServiceById(id: string): Promise<Service | null>
```

#### Bookings
```typescript
// Create new booking
MockApi.createBooking(bookingData): Promise<{ bookingId: string, paymentUrl: string }>

// Get bookings by email
MockApi.getBookingsByEmail(email: string): Promise<Booking[]>

// Get all bookings (admin)
MockApi.getAllBookings(): Promise<Booking[]>

// Cancel booking
MockApi.cancelBooking(bookingId: string): Promise<{ success: boolean, refundStatus: string, message: string }>

// Mark booking complete (admin)
MockApi.markBookingComplete(bookingId: string): Promise<{ success: boolean }>

// Submit feedback
MockApi.submitFeedback(bookingId: string, rating: number, comments: string): Promise<{ success: boolean }>

// Process payment
MockApi.processPayment(bookingId: string): Promise<{ success: boolean, paymentId: string }>
```

### Data Models

#### Service
```typescript
interface Service {
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
```

#### Booking
```typescript
interface Booking {
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
  lockingAmount: number; // Always 10% of totalAmount
  status: 'locked' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
  scheduledAt: string;
  cancelledAt?: string;
  completedAt?: string;
  paymentStatus: 'pending' | 'paid' | 'refunded' | 'failed';
  refundStatus?: 'none' | 'processing' | 'completed';
  feedback?: BookingFeedback;
}
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

1. Clone the repository
```bash
git clone <your-repo-url>
cd anandayojan
```

2. Install dependencies
```bash
npm install
```

3. Start development server
```bash
npm run dev
```

4. Open browser at `http://localhost:8080`

### Build for Production
```bash
npm run build
```

The production build will be in the `dist/` folder.

## 📱 Pages & Routes

| Route | Page | Description |
|-------|------|-------------|
| `/` | Home | Hero, services overview, testimonials |
| `/services` | Services | Browse all services with filters |
| `/services/:id` | Service Detail | Service info, packages, FAQs, booking |
| `/booking-success` | Success | Booking confirmation page |
| `/my-bookings` | My Bookings | User booking management |
| `/admin` | Admin | Admin dashboard for all bookings |

## 🎯 User Flows

### Booking Flow
1. User browses services on home or services page
2. Clicks on a service to view details
3. Selects a package and clicks "Book & Lock (10%)"
4. Fills booking form with details and preferred date/time
5. Reviews price summary (total, locking amount, remaining)
6. Confirms booking and pays 10% locking amount
7. Receives confirmation with booking ID
8. Can view/manage booking in "My Bookings"

### Cancellation Flow
1. User goes to "My Bookings"
2. Enters email to view bookings
3. If ≥6 hours remaining, "Cancel Booking" button is enabled
4. Confirms cancellation
5. Receives 100% refund of locking amount (processed in 5-7 days)

### Feedback Flow
1. Admin marks booking as "Complete" in admin dashboard
2. User sees "Rate Service" button in "My Bookings"
3. User provides star rating and comments
4. Feedback is saved and visible to admin

## 🔧 Backend Integration

To connect a real backend:

1. **Replace MockApi calls** in components with real API calls
2. **Update data fetching** in pages to use your API endpoints
3. **Add authentication** if needed (JWT, OAuth, etc.)
4. **Integrate payment gateway** (Razorpay, Stripe, etc.)
5. **Add email/SMS notifications** for booking confirmations

### Suggested Backend Stack
- **Database**: PostgreSQL or MongoDB
- **Backend**: Node.js + Express or Next.js API routes
- **Payments**: Razorpay (Indian payments) or Stripe
- **Emails**: SendGrid, AWS SES, or Resend
- **SMS**: Twilio, AWS SNS, or MSG91
- **File Storage**: AWS S3 or Cloudinary

## 🎨 Customization

### Update Colors
Edit `src/index.css` to change color tokens:
```css
:root {
  --primary: 38 92% 50%;      /* Gold */
  --secondary: 180 45% 35%;   /* Teal */
  --accent: 350 65% 45%;      /* Rose */
}
```

### Add New Service
1. Add service data to `src/data/services.ts`
2. Generate service image using the image generation tool
3. Service will automatically appear on services page

### Modify Booking Form
Edit `src/components/BookingForm.tsx` to:
- Add new fields
- Change validation rules (in zod schema)
- Update price calculation logic

## 📊 Admin Features

The admin dashboard (`/admin`) provides:
- Overview statistics (total, locked, confirmed, completed, cancelled)
- Filterable booking list
- Mark bookings as complete (triggers feedback request)
- View customer feedback ratings
- Monitor payment and refund status

## 🎭 Demo Data

The app includes demo bookings for testing. To seed demo data:
```typescript
// In src/data/mockApi.ts
MockApi.seedDemoBookings('your-email@example.com');
```

## 📝 Key Business Rules

1. **Locking Amount**: Always 10% of total service price
2. **Cancellation Window**: Minimum 6 hours before scheduled time for refund
3. **Payment Flow**: 
   - 10% upfront (locking amount)
   - Remaining paid after service delivery
4. **Refund Policy**: 100% refund if cancelled ≥6 hours before
5. **Feedback**: Only available after service marked as complete

## 🔐 Security Considerations

Before deploying to production:
- [ ] Add input sanitization
- [ ] Implement rate limiting
- [ ] Add CSRF protection
- [ ] Validate all user inputs server-side
- [ ] Use environment variables for sensitive data
- [ ] Implement proper authentication
- [ ] Add API request signing
- [ ] Enable HTTPS only
- [ ] Set up proper CORS policies

## 📞 Support

For questions or issues:
- **Email**: support@anandayojan.com
- **Phone**: +91 98765 43210

## 📄 License

This project is proprietary and confidential.

---

**Built with ❤️ for AnandAyojan**
