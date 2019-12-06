import express from 'express';
import { loginByGithub, publishToken } from './controller';

const router = express.Router();

router.get('/', loginByGithub);
router.get('/complete', loginByGithub, publishToken);

export default router;