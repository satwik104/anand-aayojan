import express from 'express';
import { authenticateToken, AuthRequest } from '../middleware/auth';
import { forwardToAppsScript } from '../services/apps-script';

const router = express.Router();

// POST /proxy/apps-script - Proxy to Apps Script (keeps secret server-side)
router.post('/apps-script', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const { action, data } = req.body;

    if (!action) {
      return res.status(400).json({ error: 'action is required' });
    }

    const result = await forwardToAppsScript(action, {
      ...data,
      userId: req.user!.id,
      userEmail: req.user!.email,
      timestamp: new Date().toISOString()
    });

    res.json(result);
  } catch (error: any) {
    console.error('Apps Script proxy error:', error);
    res.status(500).json({ error: error.message || 'Failed to forward to Apps Script' });
  }
});

export default router;
