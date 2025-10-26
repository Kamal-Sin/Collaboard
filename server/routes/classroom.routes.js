
import express from 'express';
const router = express.Router();

import { create, getClassroom } from '../controllers/classroom.controller.js';


router.post('/api/createroom', create);

router.post('/api/getclassroom', getClassroom);


export default router;