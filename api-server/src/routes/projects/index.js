import express from 'express';
import fileRouter from './files';
import {
	preloadProject,
	getProjectByProjectId,
	modifyProject,
	deleteProject,
	forkProject
} from './controller';
const router = express.Router();

router.post('/',forkProject);
router.param('projectId', preloadProject);
router.get('/:projectId', getProjectByProjectId);
router.patch('/:projectId', modifyProject);
router.delete('/:projectId', deleteProject);

router.use('/:projectId/files', fileRouter);

export default router;
