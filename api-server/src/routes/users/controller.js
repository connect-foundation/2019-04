import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../config';
import { Project } from '../../models';

async function sendUserData(req, res) {
	try {
		const token = req.cookies.jwt;
		const user = await jwt.verify(token, JWT_SECRET);
		res.status(200).send(user);
	} catch (e) {
		res.status(401).send();
	}
}

async function getProjectsByUsername(req, res) {
	Project.find({ author: req.params.username })
		.then(projects => res.status(200).send(projects))
		.catch(() => res.status(500).send({}));
}

export { sendUserData, getProjectsByUsername };
