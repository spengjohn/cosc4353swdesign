import express from 'express';
import { generateVolunteerCSVReport } from '../controllers/reportController.js';

const router = express.Router();

router.get('/volunteers/csv', generateVolunteerCSVReport);

export default router;
