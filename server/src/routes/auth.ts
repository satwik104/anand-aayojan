import express from 'express';
import jwt from 'jsonwebtoken';
import { verifyGoogleToken } from '../services/google-auth';
import { authenticateToken, AuthRequest } from '../middleware/auth';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_for_dev';

// POST /auth/google - Login/Signup with Google
router.post('/google', async (req, res) => {
  try {
    const { idToken } = req.body;

    if (!idToken) {
      return res.status(400).json({ error: 'idToken is required' });
    }

    // Verify Google token (mock or real based on USE_MOCK)
    const googleUser = await verifyGoogleToken(idToken);

    // Create JWT token
    const token = jwt.sign(
      {
        id: googleUser.id,
        email: googleUser.email,
        name: googleUser.name
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    const user = {
      id: googleUser.id,
      email: googleUser.email,
      name: googleUser.name,
      picture: googleUser.picture
    };

    res.json({ token, user });
  } catch (error: any) {
    console.error('Google auth error:', error);
    res.status(401).json({ error: error.message || 'Authentication failed' });
  }
});

// GET /auth/me - Get current user
router.get('/me', authenticateToken, (req: AuthRequest, res) => {
  res.json({ user: req.user });
});

export default router;
