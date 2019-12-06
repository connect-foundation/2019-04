import express from 'express';
import { createFile, preloadFile, updateFile, deleteFile } from './controller';
const router = express.Router();

router.post('/', createFile);
router.param('fileId', preloadFile);
router.patch('/:fileId', updateFile);
router.delete('/:fileId', deleteFile);

export default router;
