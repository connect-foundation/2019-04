import express from 'express';
import { getDependencyList } from './controller';

const router = express.Router();

router.get('/search', getDependencyList);

export default router;
