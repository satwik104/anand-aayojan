# Google OAuth & Razorpay Setup Guide

This guide provides the **exact URLs and configuration** needed to set up Google OAuth and Razorpay for AnandAyojan.

## 🔐 Prerequisites

Both authentication and payment systems are **fully implemented** and ready to accept real credentials. Once you add your credentials, the flows will work immediately without code changes.

---

## 📋 Google OAuth Setup

### Step 1: Create OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Create a new project or select existing one
3. Click **"Create Credentials"** → **"OAuth Client ID"**
4. Choose **"Web application"** as application type

### Step 2: Configure URLs

#### ✅ Authorized JavaScript Origins

Add these exact URLs:

**For Lovable Preview:**
```
https://gptengineer.app
```

**For Production:**
```
https://anandayojan.com
```

**For Local Development:**
```
http://localhost:5173
```

#### ✅ Authorized Redirect URIs

**IMPORTANT:** Google Sign-In JavaScript SDK (GSI) that we're using **does NOT require redirect URIs** for the popup/embedded flow. You can leave this empty or add your domain for future flexibility.

Optional (for future use):
```
https://gptengineer.app/auth
https://anandayojan.com/auth
http://localhost:5173/auth
```

### Step 3: Get Your Client ID

After saving, Google will show:
- **Client ID** - Copy this (looks like: `123456789-abc123.apps.googleusercontent.com`)
- **Client Secret** - You can ignore this (not needed for GSI implementation)

### Step 4: Add to Environment Variables

**Frontend (.env):**
```env
VITE_GOOGLE_CLIENT_ID=123456789-abc123.apps.googleusercontent.com
```

**Backend (server/.env):**
```env
GOOGLE_CLIENT_ID=123456789-abc123.apps.googleusercontent.com
```

---

## 💳 Razorpay Setup

### Step 1: Create Razorpay Account

1. Go to [Razorpay Dashboard](https://dashboard.razorpay.com/)
2. Sign up or log in
3. Complete KYC verification (required for live mode)

### Step 2: Get API Keys

1. Navigate to **Settings** → **API Keys**
2. Generate **Test Mode** keys first (for development)
3. You'll get:
   - **Key ID** (starts with `rzp_test_` or `rzp_live_`)
   - **Key Secret** (keep this secret!)

### Step 3: Configure Razorpay Settings

#### ✅ Payment Methods

Enable these payment methods in Dashboard → **Settings** → **Payment Methods**:
- UPI
- Cards (Debit/Credit)
- Net Banking
- Wallets

#### ✅ Webhook Configuration (Optional)

Our implementation uses **client-side signature verification** and doesn't require webhooks for basic functionality. However, if you want to set up webhooks for additional features:

Go to **Settings** → **Webhooks** and add:

**Webhook URL:**
```
https://your-backend.com/api/webhooks/razorpay
```

**Events to subscribe:**
- `payment.captured`
- `payment.failed`
- `order.paid`

> **Note:** Webhook endpoint is not yet implemented in the codebase. Current implementation handles payment success/failure through frontend callbacks.

#### ✅ Checkout Settings

Go to **Settings** → **Checkout** and configure:
- **Brand Name:** AnandAyojan
- **Brand Logo:** Upload your logo (recommended 256x256px)
- **Brand Color:** `#D4AF37` (Golden)

### Step 4: Add to Environment Variables

**Frontend (.env):**
```env
VITE_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxx
```

**Backend (server/.env):**
```env
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxx
RAZORPAY_KEY_SECRET=your_secret_key_here
```

---

## 🌐 Complete URL Reference

### Google OAuth

| Environment | Authorized JavaScript Origins | Authorized Redirect URIs (Optional) |
|-------------|------------------------------|-------------------------------------|
| **Lovable Preview** | `https://gptengineer.app` | `https://gptengineer.app/auth` |
| **Production** | `https://anandayojan.com` | `https://anandayojan.com/auth` |
| **Local Dev** | `http://localhost:5173` | `http://localhost:5173/auth` |

### Razorpay

| Setting | Value |
|---------|-------|
| **Webhook URL** | `https://your-backend.com/api/webhooks/razorpay` (Optional) |
| **Return URL** | Not required (handled via JavaScript callbacks) |
| **Callback URL** | Not required (handled via JavaScript callbacks) |

---

## 🚀 Switching from Mock to Production

### Current State
Your app is in **MOCK MODE** - payments and auth work without real credentials.

### To Enable Real Credentials

**Frontend (.env):**
```env
VITE_GOOGLE_CLIENT_ID=your_real_client_id
VITE_RAZORPAY_KEY_ID=your_real_razorpay_key
VITE_USE_MOCK=false  # ← Change this to false
```

**Backend (server/.env):**
```env
GOOGLE_CLIENT_ID=your_real_client_id
RAZORPAY_KEY_ID=your_real_razorpay_key
RAZORPAY_KEY_SECRET=your_real_razorpay_secret
JWT_SECRET=your_generated_secret_minimum_32_characters
USE_MOCK=false  # ← Change this to false
```

### Generate JWT Secret
```bash
# On Mac/Linux:
openssl rand -base64 32

# Or use any random string generator (minimum 32 characters)
```

---

## ✅ Testing Checklist

### Google OAuth
- [ ] Client ID added to both frontend and backend
- [ ] Authorized JavaScript origins configured in Google Console
- [ ] USE_MOCK set to false in both .env files
- [ ] Can click "Sign in with Google" and see real Google login popup
- [ ] Successfully logs in and redirects to homepage

### Razorpay
- [ ] Key ID and Secret added to backend
- [ ] Key ID added to frontend
- [ ] Test mode enabled in Razorpay dashboard
- [ ] Payment methods enabled (UPI, Cards, etc.)
- [ ] Can initiate payment and see real Razorpay checkout
- [ ] Test payment succeeds using test card: `4111 1111 1111 1111`
- [ ] Booking/Order status updates after successful payment

---

## 🔒 Security Notes

1. **Never commit** actual credentials to Git
2. **JWT_SECRET** must be a strong random string (minimum 32 characters)
3. **RAZORPAY_KEY_SECRET** must never be exposed to frontend
4. Use **Test Mode** keys during development
5. Switch to **Live Mode** keys only after thorough testing
6. Enable **2FA** on both Google Cloud and Razorpay accounts

---

## 🐛 Troubleshooting

### Google Sign-In Not Working
- Verify Client ID matches in both `.env` files
- Check Authorized JavaScript Origins includes your domain
- Clear browser cache and cookies
- Check browser console for errors

### Razorpay Payment Popup Not Showing
- Verify `VITE_RAZORPAY_KEY_ID` is set in frontend .env
- Check if Razorpay SDK loaded (look for `window.Razorpay` in console)
- Ensure USE_MOCK is set to false
- Check browser console for errors

### Payment Verification Failed
- Verify `RAZORPAY_KEY_SECRET` is set in backend .env
- Check backend logs for signature verification errors
- Ensure backend is running and accessible
- Verify CORS settings allow frontend domain

---

## 📞 Support

- **Google OAuth Issues:** [Google Cloud Support](https://cloud.google.com/support)
- **Razorpay Issues:** [Razorpay Support](https://razorpay.com/support/)
- **Integration Issues:** Check browser console and backend logs

---

## 📝 Summary

**GOOGLE OAUTH:**
- **Authorized JavaScript Origins:** `https://gptengineer.app`, `https://anandayojan.com`, `http://localhost:5173`
- **Redirect URIs:** Not required (optional: add `/auth` path to above domains)

**RAZORPAY:**
- **Webhook URL:** Optional (not currently implemented)
- **Callback URL:** Not required (handled via JS callbacks)
- **Return URL:** Not required (handled via JS callbacks)

✅ Both systems are **fully implemented** and ready for production credentials.
