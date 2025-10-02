# AnandAyojan - Integration Guide

## 🚀 Quick Start

This frontend is ready to plug into a backend. All API calls use mock data by default and can be easily switched to real endpoints.

## 📋 Features Implemented

### ✅ Core Features
- [x] Authentication (Login/Signup) with localStorage persistence
- [x] Persistent per-user Cart with localStorage
- [x] Service booking flow with 10% locking payment
- [x] Bhaat & Mayera ecommerce (15 products)
- [x] My Bookings page with cancellation (6-hour policy)
- [x] Contact/Query form with Google Sheets webhook
- [x] Razorpay payment integration (placeholder with mock)
- [x] Mobile responsive design
- [x] Reviews carousel (Home page)
- [x] "How it Works" smooth scroll anchor
- [x] Admin dashboard (link removed from nav)

### 🔌 Integration Points

#### 1. Environment Variables (.env)
```bash
# API Base URL
VITE_USE_MOCK_API=true  # Set to 'false' for real API

# Google Sheets Webhook
VITE_APPS_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
VITE_WEBHOOK_SECRET=your_secret_key

# Razorpay
VITE_RAZORPAY_KEY_ID=rzp_test_XXXXX
```

#### 2. API Endpoints (Mock → Real)

All API calls are in these files:
- `src/contexts/AuthContext.tsx` - Auth endpoints
- `src/data/mockApi.ts` - Booking endpoints (currently mock)
- `src/lib/webhooks.ts` - Google Sheets webhooks
- `src/lib/payment.ts` - Razorpay integration

**Auth API:**
- POST `/api/auth/signup` → `{ token, user }`
- POST `/api/auth/login` → `{ token, user }`
- GET `/api/auth/me` → `{ user }`

**Bookings API:**
- POST `/api/bookings` → `{ bookingId, paymentUrl }`
- GET `/api/bookings?email={email}` → `[{booking}]`
- POST `/api/bookings/:id/cancel` → `{ success }`

**Payments API:**
- POST `/api/payments/create` → `{ orderId, amount }`
- POST `/api/payments/verify` → `{ verified }`

**Ecommerce API:**
- GET `/api/products` → `[{product}]`
- POST `/api/checkout` → `{ orderId, paymentUrl }`

**Webhooks:**
- POST `/webhook/apps-script?action=create&secret=...` (booking)
- POST `/webhook/apps-script?action=cancel&secret=...` (cancellation)
- POST `/webhook/apps-script?action=feedback&secret=...` (feedback)
- POST `/webhook/apps-script?action=contact&secret=...` (contact form)

#### 3. Google Sheets Integration

Replace `VITE_APPS_SCRIPT_URL` with your Apps Script webhook URL. The frontend sends:
- Booking creation events
- Cancellation events
- Feedback submissions
- Contact form submissions

#### 4. Razorpay Integration

1. Add Razorpay SDK to `index.html`:
```html
<script src="https://checkout.razorpay.com/v1/checkout.js"></script>
```

2. Set `VITE_RAZORPAY_KEY_ID` in `.env`

3. Payment flow is in `src/lib/payment.ts` - currently uses mock mode

## 🧪 Testing

Currently using mock APIs. To test:
1. Signup/Login → Creates mock user in localStorage
2. Add services/products to cart → Persists per user
3. Book service → Mock payment dialog appears
4. View My Bookings → Shows user's bookings
5. Cancel booking → Checks 6-hour policy

## 🎯 Next Steps for Backend Integration

1. Set `VITE_USE_MOCK_API=false` in `.env`
2. Replace mock API responses in:
   - `src/contexts/AuthContext.tsx`
   - `src/data/mockApi.ts`
   - `src/lib/payment.ts`
3. Configure Google Sheets webhook URL
4. Add Razorpay credentials
5. Test all flows with real backend

## 📱 Mobile Responsive

All pages are mobile-first and responsive. Tested on:
- Desktop (1920px+)
- Tablet (768px - 1024px)
- Mobile (320px - 767px)

## 🔒 Security

- Input validation using Zod schemas
- Phone/email validation
- Password min 6 characters
- Max length limits on all inputs
- No sensitive data in console logs (production)

## 📊 Admin Dashboard

Admin code exists but link removed from public nav. Access at `/admin` directly if needed.

---

**Built with:** React + Vite + TypeScript + Tailwind CSS + shadcn/ui
