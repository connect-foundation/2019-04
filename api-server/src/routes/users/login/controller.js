import jwt from 'jsonwebtoken';

import { JWT_SECRET, COCODE_CLIENT_URI } from '../../../config';
import passport from '../../../middlewares/passport';

const STRATEGY = 'github';
const KEY_JWT = 'jwt';

function loginByGithub(req, res, next) {
	passport.authenticate(STRATEGY)(req, res, next);
}

function publishToken({ user: { username, avatar } }, res) {
	const payload = { username, avatar };
	const expiresIn = { expiresIn: '7d' };
	const token = jwt.sign(payload, JWT_SECRET, expiresIn);
	res.cookie(KEY_JWT, token).redirect(COCODE_CLIENT_URI);
}

export { loginByGithub, publishToken };
