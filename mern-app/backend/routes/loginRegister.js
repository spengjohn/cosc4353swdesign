import express from 'express';
import { login, register, updateCredentials } from '../controllers/loginRegisterController.js';

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.patch('/update', updateCredentials);

export default router;
