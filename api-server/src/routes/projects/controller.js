import { Project, File } from '../../models';

async function preloadProject(req, res, next, projectId) {
	Project.findById(projectId)
		.then(project => {
			if (!project) return res.sendStatus(404);

			req.project = project;
			return next();
		})
		.catch(next);
}

async function getProjectByProjectId(req, res) {
	const project = req.project;
	const { _id, name, description, author, entry, root } = project;

	File.find({ projectId: _id })
		.then(files => {
			if (!files) return res.sendStatus(404);
			res.status(200).send({
				name,
				description,
				author,
				root,
				entry,
				files
			});
		})
		.catch(() => res.sendStatus(500));
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

async function deleteProject(req, res, next) {
	const project = req.project;

	project
		.remove()
		.then(() => res.sendStatus(204))
		.catch(() => res.sendStatus(500));
}

export { preloadProject, modifyProject, getProjectByProjectId, deleteProject };
