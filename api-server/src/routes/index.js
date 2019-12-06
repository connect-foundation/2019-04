import express from 'express';
import usersRouter from './users';
import projectRouter from './projects';
import dependencyRouter from './dependency';

const router = express.Router();

router.use('/users', usersRouter);
router.use('/projects', projectRouter);
router.use('/dependency', dependencyRouter);

export default router;
