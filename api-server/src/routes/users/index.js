import express from 'express';
import loginRouter from './login';
import { sendUserData, getProjectsByUsername } from './controller';

const router = express.Router();

router.get('/', sendUserData);
router.get('/:username/projects', getProjectsByUsername);
router.use('/login', loginRouter);

export default router;
