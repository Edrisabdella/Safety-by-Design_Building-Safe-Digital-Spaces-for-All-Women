import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';
import hpp from 'hpp';
import compression from 'compression';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';
import path from 'path';

// Load env vars
dotenv.config();

// Import routes
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import emergencyRoutes from './routes/emergency.js';
import resourceRoutes from './routes/resources.js';

// Import middleware
import errorHandler from './middleware/errorHandler.js';

const app = express();
const httpServer = createServer(app);

// Socket.io configuration for production
const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true
  },
  // Additional production settings
  pingTimeout: 60000,
  pingInterval: 25000
});

// Security middleware
app.use(helmet({
  crossOriginEmbedderPolicy: false,
  contentSecurityPolicy: false
}));

app.use(mongoSanitize());
app.use(xss());
app.use(hpp());

// Rate limiting - more lenient for production
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200, // increased limit for production
  message: {
    status: 'fail',
    message: 'Too many requests from this IP, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api', limiter);

// Body parser middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Compression
app.use(compression());

// CORS configuration for production
app.use(cors({
  origin: [
    process.env.FRONTEND_URL,
    "http://localhost:3000",
    "https://safespace-frontend.onrender.com"
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Server is healthy',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV
  });
});

// API routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/emergency', emergencyRoutes);
app.use('/api/v1/resources', resourceRoutes);

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(process.cwd(), '../frontend/dist')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(process.cwd(), '../frontend/dist/index.html'));
  });
}

// Socket.io for real-time features
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
  
  socket.on('join-user', (userId) => {
    socket.join(`user-${userId}`);
  });
  
  socket.on('emergency-alert', (data) => {
    socket.broadcast.emit('new-emergency', data);
  });
  
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Error handling middleware (must be last)
app.use(errorHandler);

// Handle unhandled routes
app.all('*', (req, res, next) => {
  res.status(404).json({
    status: 'fail',
    message: `Can't find ${req.originalUrl} on this server!`
  });
});

// Database connection with retry logic
const connectDB = async (retries = 5, delay = 5000) => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📊 Database: ${conn.connection.name}`);
    
    // Set up connection event handlers
    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
    });
    
    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected');
    });
    
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      process.exit(0);
    });
    
  } catch (error) {
    console.error(`❌ MongoDB connection failed (attempt ${6 - retries}/5):`, error.message);
    
    if (retries > 0) {
      console.log(`🔄 Retrying connection in ${delay/1000} seconds...`);
      setTimeout(() => connectDB(retries - 1, delay), delay);
    } else {
      console.error('💥 Could not connect to MongoDB after multiple attempts');
      process.exit(1);
    }
  }
};

const PORT = process.env.PORT || 10000;

// Start server
const startServer = async () => {
  try {
    await connectDB();
    
    httpServer.listen(PORT, '0.0.0.0', () => {
      console.log(`
🚀 SafeSpace Server Running!
📍 Environment: ${process.env.NODE_ENV}
📍 Port: ${PORT}
📍 Frontend URL: ${process.env.FRONTEND_URL}
📍 Database: ${mongoose.connection.name ? 'Connected' : 'Disconnected'}
📍 Health Check: http://localhost:${PORT}/health
      `);
    });
    
  } catch (error) {
    console.error('💥 Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

export { io };