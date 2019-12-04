import express from 'express';
import { createFile, preloadFile } from './controller';
const router = express.Router();

router.post('/', createFile);
router.param('fileId', preloadFile);

export default router;
