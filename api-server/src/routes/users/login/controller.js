import passport from '../../../middlewares/passport';
import jwt from 'jsonwebtoken';

const STRATEGY = 'github';
const KEY_JWT = 'jwt';

function loginByGithub (req, res, next) {
	passport.authenticate(STRATEGY)(req, res, next);
};

function publishToken ({ user: { username, photos } }, res) {
	const payload = { username: username, avatar: photos[0].value };
	const expiresIn = { expiresIn: '7d' };
	const token = jwt.sign(payload, process.env.JWT_SECRET, expiresIn);
	res.cookie(KEY_JWT, token).redirect(process.env.COCODE_CLIENT_URI);
};

export {
	loginByGithub,
	publishToken
};