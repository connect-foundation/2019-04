import express from 'express';
import { modifyProject } from './controller';
const router = express.Router();

router.patch('/:projectId', modifyProject);

export default router;
