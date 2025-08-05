import express from 'express';
import { generateVolunteerJSONReport, generateVolunteerCSVReport, generateEventJSONReport, generateEventCSVReport } from '../controllers/reportController.js';

const router = express.Router();

router.get('/volunteers/json', generateVolunteerJSONReport);
router.get('/volunteers/csv', generateVolunteerCSVReport);
router.get('/events/json', generateEventJSONReport);
router.get('/events/csv', generateEventCSVReport);

export default router;
