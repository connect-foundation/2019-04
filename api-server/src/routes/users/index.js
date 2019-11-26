import express from 'express';
import loginRouter from './login';
import { sendUserData } from './controller';

const router = express.Router();

router.get('/', sendUserData);
router.use('/login', loginRouter);

export default router;