import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import bookingsRoutes from './routes/bookings';
import ordersRoutes from './routes/orders';
import paymentsRoutes from './routes/payments';
import proxyRoutes from './routes/proxy';
import emailRoutes from './routes/email';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_BASE_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/bookings', bookingsRoutes);
app.use('/orders', ordersRoutes);
app.use('/payments', paymentsRoutes);
app.use('/proxy', proxyRoutes);
app.use('/email', emailRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    mockMode: process.env.USE_MOCK === 'true',
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📝 Mock mode: ${process.env.USE_MOCK === 'true' ? 'ENABLED' : 'DISABLED'}`);
  console.log(`🔗 Frontend URL: ${process.env.FRONTEND_BASE_URL}`);
});
