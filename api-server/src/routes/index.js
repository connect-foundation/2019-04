import express from 'express';
import usersRouter from './users';
import projectRouter from './projects';

const router = express.Router();

router.use('/users', usersRouter);
router.use('/projects', projectRouter);

export default router;
