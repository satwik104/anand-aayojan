# Email Setup Guide for AnandAyojan

This document provides step-by-step instructions for implementing email functionality in your application.

## Overview

This application needs to send emails in three scenarios:
1. **Welcome Email** - When a user signs in with Google
2. **Signup Confirmation** - When a user creates a new account with email/password
3. **Order Confirmation** - When a user completes a payment for a service or product

## Prerequisites

You'll need a **SendGrid account** (recommended) or any other SMTP email service.

### Why SendGrid?
- Free tier: 100 emails/day
- Easy integration
- Reliable delivery
- Good documentation

### Setting Up SendGrid

1. **Create a SendGrid Account**
   - Go to [https://sendgrid.com/](https://sendgrid.com/)
   - Sign up for a free account

2. **Verify Your Sender Email**
   - Go to Settings → Sender Authentication
   - Click "Verify a Single Sender"
   - Enter your email (e.g., `noreply@anandayojan.com` or your personal email)
   - Check your inbox and verify the email

3. **Create an API Key**
   - Go to Settings → API Keys
   - Click "Create API Key"
   - Name it "AnandAyojan Backend"
   - Choose "Full Access"
   - Copy the API key (you won't see it again!)

4. **Add API Key to Backend Environment**
   - Open `server/.env` file
   - Add these lines:
   ```
   SENDGRID_API_KEY=SG.your_actual_api_key_here
   SENDGRID_FROM_EMAIL=your_verified_sender@email.com
   ```

## Current Email Service Status

The application already has email service code in `server/src/services/sendgrid.ts`, but it's currently in **MOCK MODE** (emails are logged to console instead of being sent).

### Removing Mock Mode

**File**: `server/src/services/sendgrid.ts`

**Current code (lines 1-6)**:
```typescript
import sgMail from '@sendgrid/mail';

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const SENDGRID_FROM_EMAIL = process.env.SENDGRID_FROM_EMAIL || 'noreply@anandayojan.com';

const USE_MOCK = !SENDGRID_API_KEY; // Mock mode if no API key
```

**What this means**:
- If `SENDGRID_API_KEY` is NOT set in `.env`, emails are mocked (logged only)
- If `SENDGRID_API_KEY` IS set in `.env`, real emails are sent

**Action required**: Just add your SendGrid API key to `server/.env` and the mock mode will automatically disable!

## Implementation Steps

### 1. Welcome Email on Google Sign-In

**File to modify**: `server/src/routes/auth.ts`

**Find this section** (around line 30-40):
```typescript
router.post('/google', async (req, res) => {
  try {
    const { idToken } = req.body;
    
    // Verify Google token
    const googleUser = await verifyGoogleToken(idToken);
    
    // Generate JWT
    const token = jwt.sign(
      { 
        id: googleUser.id, 
        email: googleUser.email,
        name: googleUser.name 
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      token,
      user: {
        id: googleUser.id,
        email: googleUser.email,
        name: googleUser.name,
        picture: googleUser.picture
      }
    });
  } catch (error: any) {
    // ... error handling
  }
});
```

**Add welcome email** (add these lines before `res.json`):

```typescript
// Send welcome email
try {
  await sendEmail({
    to: googleUser.email,
    subject: 'Welcome to AnandAyojan! 🎉',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #F97316;">Welcome to AnandAyojan, ${googleUser.name}!</h1>
        <p>Thank you for signing in with Google.</p>
        <p>We're excited to help you plan your special moments with our trusted services.</p>
        <p>Browse our services:</p>
        <ul>
          <li>Photography & Videography</li>
          <li>Mehndi Artists</li>
          <li>Makeup Artists</li>
          <li>Pandit Services</li>
          <li>Decoration & More</li>
        </ul>
        <p>Start exploring now: <a href="${process.env.FRONTEND_BASE_URL || 'http://localhost:5173'}">Visit AnandAyojan</a></p>
        <p>Best regards,<br>The AnandAyojan Team</p>
      </div>
    `,
    text: `Welcome to AnandAyojan, ${googleUser.name}! Thank you for signing in.`
  });
} catch (emailError) {
  console.error('Failed to send welcome email:', emailError);
  // Don't fail the login if email fails
}
```

**Import statement** (add at the top of the file):
```typescript
import { sendEmail } from '../services/sendgrid';
```

### 2. Welcome Email on Email/Password Signup

**File to modify**: `server/src/routes/auth.ts`

**Find the signup route** (around line 50-80):
```typescript
router.post('/signup', async (req, res) => {
  try {
    const { email, password, name, phone } = req.body;
    
    // ... validation and user creation code ...
    
    res.json({
      token,
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        phone: newUser.phone
      }
    });
  } catch (error: any) {
    // ... error handling
  }
});
```

**Add welcome email** (add these lines before `res.json`):

```typescript
// Send welcome email
try {
  await sendEmail({
    to: email,
    subject: 'Welcome to AnandAyojan! 🎊',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #F97316;">Welcome to AnandAyojan, ${name}!</h1>
        <p>Thank you for creating an account with us.</p>
        <p>Your account details:</p>
        <ul>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Name:</strong> ${name}</li>
        </ul>
        <p>We're excited to help you plan your special moments with our trusted services.</p>
        <p>Start exploring now: <a href="${process.env.FRONTEND_BASE_URL || 'http://localhost:5173'}">Visit AnandAyojan</a></p>
        <p>Best regards,<br>The AnandAyojan Team</p>
      </div>
    `,
    text: `Welcome to AnandAyojan, ${name}! Thank you for signing up.`
  });
} catch (emailError) {
  console.error('Failed to send welcome email:', emailError);
  // Don't fail the signup if email fails
}
```

### 3. Order Confirmation Email After Payment

**File to modify**: `server/src/routes/payments.ts`

**Find the payment verification route** (around line 20-60):
```typescript
router.post('/verify', authenticateToken, async (req: AuthRequest, res) => {
  try {
    // ... payment verification code ...
    
    // Payment verified successfully
    // Send confirmation email here
    
    res.json({
      success: true,
      message: 'Payment verified successfully'
    });
  } catch (error: any) {
    // ... error handling
  }
});
```

**Add order confirmation email**:

First, import the email functions at the top:
```typescript
import { sendOrderConfirmationEmail } from '../services/sendgrid';
```

Then add this code after successful payment verification:

```typescript
// Send order confirmation email
try {
  await sendOrderConfirmationEmail({
    customerEmail: req.user!.email,
    customerName: req.user!.name,
    orderId: orderId, // Make sure this variable exists in your payment verification
    items: items, // Array of purchased items
    totalAmount: amount, // Total amount paid
    paymentId: paymentId // Razorpay payment ID
  });
} catch (emailError) {
  console.error('Failed to send order confirmation email:', emailError);
  // Don't fail the payment if email fails
}
```

**Note**: The `sendOrderConfirmationEmail` function already exists in `server/src/services/sendgrid.ts` (line 78-102). It uses the template from `server/src/templates/order-confirmation.ts`.

## Testing Email Flow Locally

### 1. Start the Backend Server
```bash
cd server
npm run dev
```

The server will start on `http://localhost:3001`

### 2. Start the Frontend
```bash
npm run dev
```

The frontend will start on `http://localhost:5173`

### 3. Test Each Email Flow

**Test Google Sign-In Email**:
1. Click "Login" on the website
2. Click "Sign in with Google"
3. Complete Google authentication
4. Check the email inbox for the Google account you used

**Test Signup Email**:
1. Click "Login" on the website
2. Enter email, password, and name in the signup form
3. Click "Sign Up"
4. Check the email inbox for the email you used

**Test Order Confirmation Email**:
1. Login to your account
2. Add a product or service to cart
3. Go to checkout
4. Complete payment with Razorpay test credentials
5. Check your email inbox for order confirmation

### 4. Check Console Logs

If `SENDGRID_API_KEY` is not set, emails will be logged to the console:
```
📧 Mock Email:
  To: user@example.com
  Subject: Welcome to AnandAyojan!
  [HTML content shown]
```

If `SENDGRID_API_KEY` is set, you'll see:
```
✅ Email sent successfully to user@example.com
```

## Troubleshooting

### Emails Not Being Sent

1. **Check SendGrid API Key**
   - Verify `SENDGRID_API_KEY` is set in `server/.env`
   - Make sure there are no extra spaces or quotes
   - Key should start with `SG.`

2. **Check Sender Email**
   - Verify the sender email in SendGrid dashboard
   - Make sure `SENDGRID_FROM_EMAIL` matches your verified sender

3. **Check Console Logs**
   - Look for error messages in the server console
   - Common errors: "API key invalid" or "Sender not verified"

### Emails Going to Spam

1. Use a verified domain email (not Gmail/Yahoo)
2. Add proper email headers (already configured in the code)
3. Avoid spammy words in subject/body

### Rate Limits

SendGrid free tier: 100 emails/day
- If you exceed this, upgrade your SendGrid plan
- Or use multiple API keys for different environments

## Email Templates

Email templates are stored in `server/src/templates/`:
- `booking-confirmation.ts` - For booking confirmations
- `order-confirmation.ts` - For order confirmations

You can customize these templates to match your brand.

### Customizing Email Templates

**Example**: Modify the order confirmation template

**File**: `server/src/templates/order-confirmation.ts`

Change colors, fonts, layout, etc. to match your website design.

## Alternative Email Services

If you don't want to use SendGrid, you can use:

1. **Mailgun** - Similar to SendGrid
2. **AWS SES** - Cheaper for high volume
3. **Nodemailer with Gmail** - Use your Gmail account (not recommended for production)

To use a different service, you'll need to modify `server/src/services/sendgrid.ts` to use that service's SDK.

## Production Considerations

### Before Going Live:

1. **Use a Custom Domain Email**
   - Instead of `noreply@gmail.com`
   - Use `noreply@yourdomain.com`
   - Verify the domain in SendGrid

2. **Set Up DKIM/SPF Records**
   - Follow SendGrid's domain authentication guide
   - This improves email deliverability

3. **Monitor Email Stats**
   - Check SendGrid dashboard for delivery rates
   - Track bounces and spam reports

4. **Add Unsubscribe Links** (if sending marketing emails)
   - Required by law in many countries
   - Already included in transactional emails

5. **Test Thoroughly**
   - Test all email flows before launch
   - Send test emails to different providers (Gmail, Outlook, Yahoo)
   - Check emails on mobile devices

## Summary Checklist

- [ ] Create SendGrid account
- [ ] Verify sender email
- [ ] Generate API key
- [ ] Add API key to `server/.env`
- [ ] Add email sending code to auth routes (Google sign-in & signup)
- [ ] Add email sending code to payment verification route
- [ ] Test all three email flows locally
- [ ] Verify emails are being delivered
- [ ] Customize email templates (optional)
- [ ] Set up domain authentication for production (optional)

## Need Help?

If you encounter issues:
1. Check server console logs for error messages
2. Verify all environment variables are set correctly
3. Test with SendGrid's email activity feed
4. Refer to SendGrid documentation: [https://docs.sendgrid.com/](https://docs.sendgrid.com/)
