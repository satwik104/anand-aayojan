# AnandAyojan Backend API

Backend server for AnandAyojan with Google OAuth, Razorpay payments, SendGrid emails, and Apps Script integration.

## Features

- ✅ Google OAuth authentication with JWT
- ✅ Razorpay payment integration (server-side verification)
- ✅ SendGrid email notifications
- ✅ Apps Script webhook proxy (keeps secrets secure)
- ✅ Mock mode for development without real credentials
- ✅ Protected API endpoints

## Quick Start

### 1. Install Dependencies

```bash
cd server
npm install
```

### 2. Configure Environment

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

### 3. Run in Mock Mode (No Credentials Needed)

```bash
npm run dev
```

Server will start on `http://localhost:3001` with `USE_MOCK=true`

### 4. Test Mock Mode

```bash
# Health check
curl http://localhost:3001/health

# Response: { "status": "ok", "mockMode": true }
```

## Configuration

### Mock Mode (Development)

Set in `.env`:
```
USE_MOCK=true
```

In mock mode:
- Google tokens are accepted without verification
- Razorpay orders are simulated
- Emails are logged to console
- Apps Script writes are logged (no actual writes)

### Real Mode (Production)

Set in `.env`:
```
USE_MOCK=false
```

Then add your credentials:

#### 1. Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Create OAuth 2.0 Client ID
3. Add authorized JavaScript origins: `http://localhost:5173` (dev) and your production URL
4. Copy Client ID and Secret to `.env`:

```
GOOGLE_CLIENT_ID=your_id_here.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_secret_here
```

Also add to frontend `.env`:
```
VITE_GOOGLE_CLIENT_ID=your_id_here.apps.googleusercontent.com
```

#### 2. Razorpay

1. Sign up at [Razorpay Dashboard](https://dashboard.razorpay.com/)
2. Go to Settings > API Keys
3. Generate Test/Live keys
4. Add to `.env`:

```
RAZORPAY_KEY_ID=rzp_test_xxxxx
RAZORPAY_KEY_SECRET=your_secret_here
```

Also add Key ID to frontend `.env`:
```
VITE_RAZORPAY_KEY_ID=rzp_test_xxxxx
```

#### 3. SendGrid

1. Sign up at [SendGrid](https://sendgrid.com/)
2. Go to Settings > API Keys > Create API Key
3. Add to `.env`:

```
SENDGRID_API_KEY=SG.xxxxxx
SENDGRID_FROM_EMAIL=noreply@yourdomain.com
```

#### 4. Google Apps Script

1. Create a Google Sheet
2. Go to Extensions > Apps Script
3. Deploy as Web App
4. Set permissions and copy the URL
5. Add to `.env`:

```
APPS_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
APPS_SCRIPT_SECRET=your_custom_secret_here
```

## API Endpoints

### Authentication

**POST /auth/google**
```json
Request:
{
  "idToken": "google_id_token_here"
}

Response:
{
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "name": "User Name"
  }
}
```

**GET /auth/me** (Protected)
```
Headers: Authorization: Bearer <token>

Response:
{
  "user": { "id": "...", "email": "...", "name": "..." }
}
```

### Bookings

**POST /bookings** (Protected)
```json
Request:
{
  "serviceId": "wedding-photography",
  "serviceName": "Wedding Photography",
  "packageId": "premium",
  "packageName": "Premium Package",
  "preferredDate": "2025-12-25",
  "preferredTime": "10:00 AM",
  "totalAmount": 50000,
  "lockingAmount": 5000,
  "city": "Mumbai",
  "pincode": "400001"
}

Response:
{
  "bookingId": "BKG1234567890",
  "booking": { ... },
  "razorpayOrder": {
    "id": "order_xyz",
    "amount": 500000,
    "currency": "INR"
  }
}
```

**GET /bookings** (Protected)
```
Response:
{
  "bookings": [ ... ]
}
```

**POST /bookings/:id/cancel** (Protected)
```
Response:
{
  "success": true,
  "message": "Booking cancelled successfully"
}
```

### Orders

**POST /orders** (Protected)
```json
Request:
{
  "cartItems": [
    { "productId": "...", "quantity": 2, "price": 500 }
  ],
  "totalAmount": 1000,
  "shipping": 50,
  "address": { ... }
}

Response:
{
  "orderId": "ORD1234567890",
  "order": { ... },
  "razorpayOrder": { ... }
}
```

**GET /orders** (Protected)
```
Response:
{
  "orders": [ ... ]
}
```

### Payments

**POST /payments/verify** (Protected)
```json
Request:
{
  "bookingId": "BKG123",
  "razorpay_payment_id": "pay_xyz",
  "razorpay_order_id": "order_xyz",
  "razorpay_signature": "signature_here"
}

Response:
{
  "success": true,
  "message": "Payment verified"
}
```

### Proxy

**POST /proxy/apps-script** (Protected)
```json
Request:
{
  "action": "contact",
  "data": {
    "name": "John Doe",
    "email": "john@example.com",
    "message": "Hello"
  }
}

Response:
{
  "success": true
}
```

## Project Structure

```
server/
├── src/
│   ├── routes/
│   │   ├── auth.ts          # Google OAuth + JWT
│   │   ├── bookings.ts      # Service bookings
│   │   ├── orders.ts        # Product orders
│   │   ├── payments.ts      # Razorpay verification
│   │   ├── proxy.ts         # Apps Script proxy
│   │   └── email.ts         # Email sending
│   ├── services/
│   │   ├── google-auth.ts   # Google token verification
│   │   ├── razorpay.ts      # Razorpay integration
│   │   ├── sendgrid.ts      # Email service
│   │   └── apps-script.ts   # Apps Script forwarding
│   ├── middleware/
│   │   └── auth.ts          # JWT authentication
│   └── index.ts             # Express server
├── .env.example
├── package.json
├── tsconfig.json
└── README.md
```

## Development

```bash
# Install dependencies
npm install

# Run in development (with auto-reload)
npm run dev

# Build for production
npm run build

# Run production build
npm start
```

## Testing

### Mock Mode Tests

All endpoints work in mock mode without real credentials:

1. Start server: `npm run dev`
2. Use any `idToken` value for `/auth/google`
3. All payments will simulate success
4. All emails will log to console
5. Apps Script writes will log but not execute

### Real Mode Tests

1. Add all credentials to `.env`
2. Set `USE_MOCK=false`
3. Restart server
4. Test with real Google login from frontend
5. Make test payments with Razorpay test cards
6. Verify emails arrive
7. Check Google Sheet updates

## Security Notes

- ✅ JWT tokens expire in 7 days
- ✅ All sensitive endpoints are protected
- ✅ Razorpay signatures verified server-side
- ✅ Apps Script secret never exposed to frontend
- ✅ CORS configured for specific frontend origin

## Troubleshooting

**"Google OAuth client not initialized"**
- Add `GOOGLE_CLIENT_ID` to `.env` or set `USE_MOCK=true`

**"Razorpay not initialized"**
- Add `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` or set `USE_MOCK=true`

**"SENDGRID_API_KEY not set"**
- Add SendGrid key or set `USE_MOCK=true`

**CORS errors**
- Check `FRONTEND_BASE_URL` in `.env` matches your frontend URL

## Production Deployment

1. Set all real credentials in `.env`
2. Set `USE_MOCK=false`
3. Set `NODE_ENV=production`
4. Build: `npm run build`
5. Deploy `dist/` folder to your server
6. Run: `npm start`

## Support

For issues or questions, check the main project README or contact the development team.
