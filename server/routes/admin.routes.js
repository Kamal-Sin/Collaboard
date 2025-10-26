import express from 'express';
const router = express.Router();

import { signup, login, logout, validateAuth } from '../controllers/admin.controller.js';
import { validateSession } from '../utils/generateTokens.js';
import { validateAdminRegistration, validateUserLogin } from '../middleware/validation.js';

router.post('/signup', validateAdminRegistration, signup);

router.post('/login', validateUserLogin, login);

router.get('/logout', logout);

router.get('/validate', validateSession, validateAuth);



export default router;