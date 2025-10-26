
import express from 'express';
const router = express.Router();

import { create, getClassroom } from '../controllers/classroom.controller.js';
import { validateClassroom } from '../middleware/validation.js';
import { validateSession } from '../utils/generateTokens.js';

router.post('/createroom', validateSession, validateClassroom, create);

router.post('/getclassroom', validateSession, getClassroom);


export default router;