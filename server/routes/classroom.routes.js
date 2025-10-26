
import express from 'express';
const router = express.Router();

import { create, getClassroom } from '../controllers/classroom.controller.js';
import { validateClassroom } from '../middleware/validation.js';
import { validateSession } from '../utils/generateTokens.js';

router.post('/api/createroom', validateSession, validateClassroom, create);

router.post('/api/getclassroom', validateSession, getClassroom);


export default router;