// OfficeBar Main Server
// Premium internal office ordering system with real-time notifications

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// ============ MIDDLEWARE ============

// CORS configuration
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, curl, etc.)
    if (!origin) return callback(null, true);

    const allowedOrigins = [
      'http://localhost:3000',
      'http://localhost:8000',
      'http://127.0.0.1:3000',
      /\.vercel\.app$/
    ];

    // Check if origin matches any allowed pattern
    const isAllowed = allowedOrigins.some(allowedOrigin => {
      if (typeof allowedOrigin === 'string') {
        return origin === allowedOrigin;
      } else if (allowedOrigin instanceof RegExp) {
        return allowedOrigin.test(origin);
      }
      return false;
    });

    if (isAllowed) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '..')));

// ============ ROUTES ============

// Import route modules - with error handling
let authRouter, ordersRouter, menuRouter;
try {
  const authModule = require('./routes/auth');
  authRouter = authModule.router || authModule;
  console.log('✅ Auth routes loaded');
} catch (e) {
  console.error('❌ Error loading auth routes:', e.message);
}

try {
  ordersRouter = require('./routes/orders');
  console.log('✅ Orders routes loaded');
} catch (e) {
  console.error('❌ Error loading orders routes:', e.message);
}

try {
  menuRouter = require('./routes/menu');
  console.log('✅ Menu routes loaded');
} catch (e) {
  console.error('❌ Error loading menu routes:', e.message);
}

// Mount routes
if (authRouter) app.use('/api/auth', authRouter);
if (ordersRouter) app.use('/api/orders', ordersRouter);
if (menuRouter) app.use('/api/menu', menuRouter);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'OfficeBar server is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// System status endpoint
app.get('/api/status', (req, res) => {
  const status = {
    server: 'running',
    notifications: {
      telegram: process.env.TELEGRAM_BOT_TOKEN ? 'configured' : 'not configured',
      discord: process.env.DISCORD_WEBHOOK_URL ? 'configured' : 'not configured',
      gmail: process.env.GMAIL_USER ? 'configured' : 'not configured'
    },
    database: 'in-memory',
    timestamp: new Date().toISOString()
  };

  res.json(status);
});

// Serve frontend index.html for all other routes (SPA support)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// ============ ERROR HANDLING ============

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Not found',
    message: `Cannot ${req.method} ${req.path}`,
    available: [
      'POST /api/auth/signup',
      'POST /api/auth/login',
      'GET /api/auth/me',
      'POST /api/orders/create',
      'GET /api/orders/my-orders',
      'GET /api/orders/:orderId',
      'GET /api/menu',
      'GET /api/menu/category/:category',
      'GET /api/menu/drink/:drinkId'
    ]
  });
});

// Global error handler
app.use((error, req, res, next) => {
  console.error('❌ Server error:', error);
  res.status(500).json({
    error: 'Internal server error',
    message: error.message
  });
});

// ============ SERVER STARTUP ============

console.log('Starting server...');
const server = app.listen(PORT, () => {
  console.log('Server callback called');
  console.log('\n╔════════════════════════════════════════════════════════════╗');
  console.log('║          🎉 OfficeBar Server Running 🎉                   ║');
  console.log('╚════════════════════════════════════════════════════════════╝\n');
  console.log(`📍 Server: http://localhost:${PORT}`);
  console.log(`🔧 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`📱 Telegram Notifications: ${process.env.TELEGRAM_BOT_TOKEN ? '✅ Enabled' : '❌ Disabled'}`);
  console.log(`🎮 Discord Notifications: ${process.env.DISCORD_WEBHOOK_URL ? '✅ Enabled' : '❌ Disabled'}`);
  console.log(`📧 Gmail Notifications: ${process.env.GMAIL_USER ? '✅ Enabled' : '❌ Disabled'}`);
  console.log(`\n📚 API Documentation:`);
  console.log(`   GET  http://localhost:${PORT}/api/health - Server health check`);
  console.log(`   GET  http://localhost:${PORT}/api/status - System status`);
  console.log(`   GET  http://localhost:${PORT}/api/menu - Full menu`);
  console.log(`   POST http://localhost:${PORT}/api/auth/signup - Register user`);
  console.log(`   POST http://localhost:${PORT}/api/auth/login - Login user`);
  console.log(`   POST http://localhost:${PORT}/api/orders/create - Create order\n`);
});

server.on('error', (err) => {
  console.error('❌ Server error:', err.message, err.code);
  process.exit(1);
});

console.log('Server setup complete');

module.exports = app;
