import express from 'express';
import { modifyProject, preloadProject } from './controller';
const router = express.Router();

router.param('projectId', preloadProject);
router.patch('/:projectId', modifyProject);

export default router;
