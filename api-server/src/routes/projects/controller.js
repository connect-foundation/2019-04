import { Project } from '../../models';

async function preloadProject(req, res, next, projectId) {
	Project.findById(projectId)
		.then(project => {
			if (!project) return res.sendStatus(404);

			req.project = project;
			return next();
		})
		.catch(next);
}

async function modifyProject(req, res) {
	const project = req.project;
	const { name, description } = req.body;

	if (name) project.name = name;
	if (description) project.description = description;

	project
		.save()
		.then(() => res.sendStatus(200))
		.catch(() => res.sendStatus(500));
}

export { modifyProject, preloadProject };
