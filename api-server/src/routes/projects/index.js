import express from 'express';
import { preloadProject, modifyProject, deleteProject } from './controller';
const router = express.Router();

router.param('projectId', preloadProject);
router.patch('/:projectId', modifyProject);
router.delete('/:projectId', deleteProject);

export default router;
