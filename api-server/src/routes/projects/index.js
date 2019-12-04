import express from 'express';
import {
	preloadProject,
	getProjectByProjectId,
	modifyProject,
	deleteProject
} from './controller';
const router = express.Router();

router.param('projectId', preloadProject);
router.get('/:projectId', getProjectByProjectId);
router.patch('/:projectId', modifyProject);
router.delete('/:projectId', deleteProject);

export default router;
