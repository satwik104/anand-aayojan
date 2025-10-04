# AnandAyojan - Setup Instructions

## ✅ Cleanup Completed

All mock/fake logic has been removed from the codebase. The application is now ready for real credential integration.

### What Was Removed:
- ❌ All `USE_MOCK` flags and mock payment flows
- ❌ Fake auth handlers and simulated logins
- ❌ Google Sheets integration (Apps Script references disabled)
- ❌ Mock API responses and localStorage fallbacks

### What Was Added:
- ✅ Email + Password authentication (signup/login)
- ✅ Razorpay legal policy links in footer
- ✅ Real-only payment integration
- ✅ Auth gates for protected actions (cart, booking, checkout)

---

## 📋 Environment Variables Required

### Frontend (.env in root directory)

Create a `.env` file in the root directory with:

```env
# Google OAuth Client ID (Optional - for Google Sign-In)
VITE_GOOGLE_CLIENT_ID=your_google_client_id_here

# Razorpay Key ID (Required - for payments)
VITE_RAZORPAY_KEY_ID=rzp_test_RPN6RGLpFNGgIO

# Backend API URL (Required)
VITE_API_BASE_URL=http://localhost:3001
```

**Note:** If you don't provide `VITE_GOOGLE_CLIENT_ID`, Google Sign-In will be disabled but email/password auth will still work.

---

### Backend (server/.env)

Create a `server/.env` file with:

```env
# Server Configuration (Required)
PORT=3001
NODE_ENV=development

# Google OAuth (Optional - only if using Google Sign-In)
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here

# Razorpay Configuration (Required - for payments)
RAZORPAY_KEY_ID=rzp_test_RPN6RGLpFNGgIO
RAZORPAY_KEY_SECRET=uaKSxoY9HSlcX4YZBL9DIb0Y

# Razorpay Webhook Secret (Required - for payment webhooks)
RAZORPAY_WEBHOOK_SECRET=your_webhook_secret_here

# JWT Secret (Required - for authentication)
JWT_SECRET=your_strong_jwt_secret_minimum_32_characters

# SendGrid (Optional - for email notifications)
SENDGRID_API_KEY=your_sendgrid_api_key
SENDGRID_FROM_EMAIL=noreply@anandayojan.com

# Frontend URL (Required - for CORS)
FRONTEND_BASE_URL=http://localhost:5173
```

**Generate strong secrets:**
```bash
# Generate JWT Secret
openssl rand -base64 32

# Generate Webhook Secret
openssl rand -hex 32
```

---

## 🚀 How to Run Locally

### 1. Install Dependencies

**Frontend:**
```bash
npm install
```

**Backend:**
```bash
cd server
npm install
```

### 2. Configure Environment Variables

Create `.env` files as described above in both root and `server/` directories.

### 3. Start Backend Server

```bash
cd server
npm run dev
```

Backend will start at `http://localhost:3001`

### 4. Start Frontend

In a new terminal:

```bash
npm run dev
```

Frontend will start at `http://localhost:5173`

---

## 🔐 Authentication Flow

The app now supports **two authentication methods**:

### 1. Email + Password (Always Available)
- Users can sign up with email, password, and name
- Users can log in with email and password
- Passwords are hashed with bcrypt
- JWT tokens are issued for session management

### 2. Google Sign-In (Optional)
- Requires `VITE_GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_ID`/`GOOGLE_CLIENT_SECRET`
- If not configured, only email/password auth is available

### Protected Actions
These actions require authentication and will show a login modal if user is not signed in:

- Adding items to cart
- Creating bookings
- Proceeding to checkout
- Submitting contact forms
- Submitting partner applications

---

## 💳 Payment Integration

### Razorpay Setup

1. **Get Test Credentials:**
   - Already configured in `.env.example` files
   - Test Key ID: `rzp_test_RPN6RGLpFNGgIO`
   - Test Secret: `uaKSxoY9HSlcX4YZBL9DIb0Y`

2. **For Production:**
   - Replace test keys with live keys from Razorpay dashboard
   - Update webhook secret
   - Configure webhook URL in Razorpay dashboard

3. **Test Payment:**
   - Use Razorpay test cards: https://razorpay.com/docs/payments/payments/test-card-details/

### Payment Flow

1. User creates booking/order
2. Backend creates Razorpay order via API
3. Frontend opens Razorpay checkout
4. User completes payment
5. Payment verification via backend
6. Order/booking confirmed

---

## 📁 Project Structure

```
├── src/                      # Frontend code
│   ├── components/
│   │   ├── AuthGate.tsx     # Auth protection wrapper
│   │   ├── EmailAuth.tsx    # Email/password auth form
│   │   └── GoogleSignIn.tsx # Google sign-in button
│   ├── services/
│   │   └── api.ts           # API client (no mock mode)
│   ├── lib/
│   │   └── payment.ts       # Razorpay integration
│   └── pages/
│       └── Auth.tsx         # Authentication page
│
├── server/                   # Backend code
│   ├── src/
│   │   ├── routes/
│   │   │   ├── auth.ts      # Auth endpoints
│   │   │   ├── bookings.ts  # Booking endpoints
│   │   │   ├── orders.ts    # Order endpoints
│   │   │   └── payments.ts  # Payment verification
│   │   ├── services/
│   │   │   ├── google-auth.ts    # Google OAuth
│   │   │   ├── razorpay.ts       # Razorpay service
│   │   │   └── apps-script.ts    # Disabled (no-op)
│   │   └── models/
│   │       └── user.ts      # In-memory user storage
│   └── .env                 # Backend environment config
│
└── .env                     # Frontend environment config
```

---

## ⚠️ Important Notes

### Database
- Currently uses **in-memory storage** for users (data lost on server restart)
- **For production:** Integrate PostgreSQL, MongoDB, or your preferred database
- Replace `server/src/models/user.ts` with real database models

### Google Sheets
- Apps Script integration has been **disabled**
- The function exists but returns immediately (no-op)
- Integrate a proper database for persistent storage

### Security
- Change all default secrets before deploying to production
- Use strong, randomly generated JWT secrets
- Enable HTTPS in production
- Set proper CORS origins

### Email Notifications
- SendGrid integration exists but is optional
- Configure `SENDGRID_API_KEY` to enable email confirmations

---

## 🐛 Troubleshooting

### Payment Fails
- Check `VITE_RAZORPAY_KEY_ID` matches backend `RAZORPAY_KEY_ID`
- Verify backend is running and accessible
- Check browser console for errors

### Google Sign-In Not Working
- Ensure `VITE_GOOGLE_CLIENT_ID` is set
- Verify authorized origins in Google Console
- Check that backend `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` are set

### Auth Not Persisting
- Check localStorage for `aa_token` and `aa_user`
- Verify JWT_SECRET is set in backend
- Check backend logs for token verification errors

---

## ✨ Summary

**✅ Confirmed:** No mock or fake flows remain in the codebase

**✅ Ready for:** Adding real credentials and testing locally

**✅ Protected:** Cart, booking, checkout, and forms require authentication

**✅ Flexible:** Works with email/password auth even without Google OAuth

---

## 📞 Support

For issues or questions:
- Review console logs (frontend and backend)
- Check network requests in browser DevTools
- Verify all required environment variables are set
