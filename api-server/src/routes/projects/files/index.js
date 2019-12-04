import express from 'express';
import { createFile, preloadFile, updateFile } from './controller';
const router = express.Router();

router.post('/', createFile);
router.param('fileId', preloadFile);
router.patch('/:fileId', updateFile);

export default router;
