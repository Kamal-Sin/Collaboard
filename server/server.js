import express from 'express';
import http from 'http';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import compression from 'compression';
import mongoSanitize from 'express-mongo-sanitize';
import morgan from 'morgan';
import winston from 'winston';

import connectDB from './Database/dbConnect.js';
import authAdminRoutes from './routes/admin.routes.js';
import authUserRoutes from './routes/user.routes.js';
import classRoomRoutes from './routes/classroom.routes.js';

import { Server } from 'socket.io';

// ES6 module equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

// Configure Winston logger
const logger = winston.createLogger({
    level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.errors({ stack: true }),
        winston.format.json()
    ),
    defaultMeta: { service: 'collaboard-server' },
    transports: [
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
        new winston.transports.File({ filename: 'logs/combined.log' }),
    ],
});

// Add console transport for non-production environments
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple()
    }));
}

const app = express();
const server = http.createServer(app);

// Configure CORS
const allowedOrigins = process.env.CORS_ORIGIN 
  ? process.env.CORS_ORIGIN.split(',').map(origin => origin.trim())
  : ["http://localhost:5173", "https://collaboard-frontend.vercel.app"];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // Check if origin is allowed (with or without trailing slash)
    const isAllowed = allowedOrigins.some(allowedOrigin => {
      return origin === allowedOrigin || 
             origin === allowedOrigin.replace(/\/$/, '') || 
             origin === allowedOrigin + '/';
    });
    
    if (isAllowed) {
      callback(null, true);
    } else {
      logger.warn(`CORS blocked request from origin: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
};

const io = new Server(server, {
  cors: corsOptions
});

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
  crossOriginEmbedderPolicy: false
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: process.env.NODE_ENV === 'production' ? 100 : 1000, // limit each IP to 100 requests per windowMs in production
  message: {
    error: 'Too many requests from this IP, please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// Compression middleware
app.use(compression());

// Request logging
app.use(morgan('combined', {
  stream: {
    write: (message) => logger.info(message.trim())
  }
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Cookie parser
app.use(cookieParser());

// CORS
app.use(cors(corsOptions));

// MongoDB injection protection
app.use(mongoSanitize());

// Socket.IO logic
const roomAdmins = new Map();
const userSocket=new Map();
// io.on('connection', (socket) => {
//     console.log('Socket connected:', socket.id);

//     socket.on('join', ({ roomid ,username}) => {
//         socket.join(roomid);
//          userSocket.set(username,socket.id);
//          console.log(userSocket)
//         console.log(`${socket.id} joined ${roomid}`);
//         let id=socket.id;
//       if(!username)return
//         socket.to(roomid).emit('student',userSocket);
//  console.log(username,"has id ",id)
       
//     });

//     socket.on('drawing', ({ roomid, data }) => {
//         socket.to(roomid).emit('r-drawing', data);
//     });

//       socket.on('send-attendance',({message,roomid})=>{
//         console.log(message+"to"+roomid);
//         socket.to(roomid).emit('r-attendance',{message});
//     })

//    socket.on('sendreq',({message,roomid,socketid})=>{
//         console.log('message name is ',message,roomid);
//         socket.to(roomid).emit('r-sendreq',{message,socketid})
//     })

//      socket.on('mark',({rollnumber,roomid})=>{
//         console.log("meassagw",rollnumber);
//         socket.to(roomid).emit("r-mark",{rollnumber});
//     })

//     socket.on('leave', ({ roomid }) => {
//         socket.leave(roomid);
//         console.log(`${socket.id} left ${roomid}`);
//     });

  
  
 


//      //handle access
//     socket.on("access",({target,roomid,value})=>{
//         console.log(target);
//         if(target){
//             const socketinrooom=io.sockets.adapter.rooms.get(roomid);
//             if(socketinrooom?.has(target)){
//                 console.log("granted",target);
//                 io.to(target).emit("access-g",{value})
//             }else{
//                 console.log("target is not in room");
//             }
//         }else{
//             console.log("target not found");
//         }
//     });
   


//     socket.on('disconnect', () => {
//         const userId = socket.data.userId;
//         if (userId && userSocketMap.has(userId)) {
//             userSocketMap.delete(userId);  // ✅ Remove from map
//             console.log(`Socket ${socket.id} disconnected. User ${userId} removed from map.`);
//         } else {
//             console.log(`Socket ${socket.id} disconnected (no userId).`);
//         }
//         socket.disconnect(true);

//         console.log(`Socket ${socket.id} disconnected`);
//     });
// });

// API routes
io.on('connection', (socket) => {
    console.log('Socket connected:', socket.id);

    socket.on('join', ({ roomid ,username }) => {
        if (!username) return;

        socket.join(roomid);
        socket.username = username; // Attach username to socket
        userSocket.set(username, socket.id);
        console.log(userSocket);
        console.log(`${socket.id} joined ${roomid}`);
       if(!username)return;
       let id=socket.id
        socket.to(roomid).emit('student',{id,username});
 console.log(username,"has id ",id)
    });

    socket.on('drawing', ({ roomid, data }) => {
        socket.to(roomid).emit('r-drawing', data);
    });

    socket.on('send-attendance', ({ message, roomid }) => {
        console.log(message + " to " + roomid);
        socket.to(roomid).emit('r-attendance', { message });
    });

    socket.on('sendreq', ({ message, roomid, socketid }) => {
        console.log('message name is ', message, roomid);
        socket.to(roomid).emit('r-sendreq', { message, socketid });
    });

    socket.on('mark', ({ rollnumber, roomid }) => {
        console.log("message", rollnumber);
        socket.to(roomid).emit("r-mark", { rollnumber });
    });

    socket.on('leave', ({ roomid }) => {
        // socket.leave(roomid);
        socket.disconnect(true);
        console.log(`${socket.id} left ${roomid}`);
    });

    socket.on("access", ({ target, roomid, value }) => {
        if (target) {
            const socketsInRoom = io.sockets.adapter.rooms.get(roomid);
            if (socketsInRoom?.has(target)) {
                console.log("Granted access to", target);
                io.to(target).emit("access-g", { value });
            } else {
                console.log("Target is not in room");
            }
        } else {
            console.log("Target not found");
        }
    });

    socket.on('disconnect', () => {
        const username = socket.username;
        if (username && userSocket.has(username)) {
            userSocket.delete(username);
            let id=socket.id;
            console.log(id,"id is");
            socket.broadcast.emit('disconnect-del',{username,id})
            console.log(`Socket ${socket.id} disconnected. User ${username} removed from map.`);
        } else {
            console.log(`Socket ${socket.id} disconnected (no username).`);
        }
    });
});

// API routes - must come before static file serving
app.use('/auth/admin', authAdminRoutes);
app.use('/auth/user', authUserRoutes);
app.use('/classroom', classRoomRoutes);

// Health check endpoint
app.get('/health', async (req, res) => {
    try {
        // Check database connection
        const mongoose = await import('mongoose');
        const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
        
        res.status(200).json({ 
            status: 'OK', 
            message: 'Collaboard server is running',
            timestamp: new Date().toISOString(),
            database: dbStatus,
            uptime: process.uptime(),
            memory: process.memoryUsage(),
            version: process.env.npm_package_version || '1.0.0'
        });
    } catch (error) {
        logger.error('Health check failed:', error);
        res.status(503).json({
            status: 'ERROR',
            message: 'Service unavailable',
            timestamp: new Date().toISOString()
        });
    }
});

// API root endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'Collaboard API Server', 
    status: 'running',
    version: '1.0.0'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Route not found',
    message: `Cannot ${req.method} ${req.originalUrl}`,
    timestamp: new Date().toISOString()
  });
});

// Global error handler
app.use((error, req, res, next) => {
  logger.error('Unhandled error:', {
    error: error.message,
    stack: error.stack,
    url: req.url,
    method: req.method,
    ip: req.ip
  });

  // Don't leak error details in production
  const isDevelopment = process.env.NODE_ENV !== 'production';
  
  res.status(error.status || 500).json({
    error: 'Internal Server Error',
    message: isDevelopment ? error.message : 'Something went wrong',
    ...(isDevelopment && { stack: error.stack }),
    timestamp: new Date().toISOString()
  });
});

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM received, shutting down gracefully');
  server.close(() => {
    logger.info('Process terminated');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  logger.info('SIGINT received, shutting down gracefully');
  server.close(() => {
    logger.info('Process terminated');
    process.exit(0);
  });
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, async () => {
    logger.info(`Server is listening on port ${PORT}`);
    try {
        await connectDB();
        logger.info('Database connection established');
    } catch (error) {
        logger.error('Failed to connect to database:', error);
        // In production, you might want to exit gracefully
        if (process.env.NODE_ENV === 'production') {
            process.exit(1);
        }
    }
});
