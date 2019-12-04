import express from 'express';
import { createFile } from './controller';
const router = express.Router();

router.post('/', createFile);

export default router;
