import express from 'express';
const router = express.Router();

import { signup, login, logout, validateAuth } from '../controllers/admin.controller.js';
import { validateSession } from '../utils/generateTokens.js';


router.post('/signup', signup);

router.post('/login',login);

router.get('/logout', logout);

router.get('/validate', validateSession, validateAuth);



export default router;