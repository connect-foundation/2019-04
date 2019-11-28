import { Project } from '../../models';

async function modifyProject(req, res) {
	const id = req.params.projectId;
	Project.findById(id)
		.then(projects => res.status(200).send(projects))
		.catch(() => res.status(500).send({}));
}

export { modifyProject };
