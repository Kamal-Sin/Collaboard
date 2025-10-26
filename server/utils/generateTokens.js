import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import Session from '../models/session.model.js'

const generateToken = async (userId, userType, res) => {
    try {
        // Generate a unique session ID
        const sessionId = crypto.randomUUID();
        
        // Create JWT with session ID and user type
        const token = jwt.sign(
            { userId, sessionId, userType }, 
            process.env.JWT_SECRET_KEY,
            { expiresIn: '1d' }
        );
        
        // Store session in database with automatic expiry
        const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 1 day from now
        
        await Session.create({
            sessionId,
            userId,
            userType,
            expiresAt
        });
        
        // Set httpOnly cookie with session info
        res.cookie('jwt', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        });
        
        return sessionId;
    } catch (error) {
        console.error('Error creating session:', error);
        throw error;
    }
}

// Validate session
export const validateSession = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({ error: 'No token provided' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const { sessionId, userType } = decoded;

        // Check if session exists in database
        const session = await Session.findOne({ sessionId });
        if (!session) {
            return res.status(401).json({ error: 'Invalid session' });
        }

        // Update last accessed time
        session.lastAccessed = new Date();
        await session.save();
        
        req.user = { userId: decoded.userId, userType, sessionId };
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Invalid token' });
    }
}

// Clean up expired sessions (MongoDB TTL handles this automatically, but we can add manual cleanup)
export const cleanupExpiredSessions = async () => {
    try {
        // MongoDB TTL index automatically removes expired sessions
        // This is just for manual cleanup if needed
        const result = await Session.deleteMany({
            expiresAt: { $lt: new Date() }
        });
        console.log(`Cleaned up ${result.deletedCount} expired sessions`);
    } catch (error) {
        console.error('Error cleaning up sessions:', error);
    }
}

// Logout and invalidate session
export const invalidateSession = async (sessionId) => {
    try {
        await Session.deleteOne({ sessionId });
    } catch (error) {
        console.error('Error invalidating session:', error);
    }
}

// Run cleanup every hour (optional - MongoDB TTL handles most of this)
setInterval(cleanupExpiredSessions, 60 * 60 * 1000);

export default generateToken;