import express from 'express';
import { authenticateToken, AuthRequest } from '../middleware/auth';
import { sendEmail } from '../services/sendgrid';

const router = express.Router();

// POST /email/send - Send email (internal use)
router.post('/send', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const { to, subject, html, text } = req.body;

    if (!to || !subject || !html) {
      return res.status(400).json({ error: 'to, subject, and html are required' });
    }

    await sendEmail({ to, subject, html, text });

    res.json({ success: true, message: 'Email sent successfully' });
  } catch (error: any) {
    console.error('Email sending error:', error);
    res.status(500).json({ error: error.message || 'Failed to send email' });
  }
});

export default router;
