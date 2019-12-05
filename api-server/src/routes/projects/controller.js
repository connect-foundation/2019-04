import { Project, File } from '../../models';

async function preloadProject(req, res, next, projectId) {
	Project.findById(projectId)
		.then(project => {
			if (!project) return res.sendStatus(404);

			req.project = project;
			return next();
		})
		.catch(() => res.sendStatus(500));
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
		.then(coconut => res.status(200).send(coconut))
		.catch(() => res.sendStatus(500));
}

async function deleteProject(req, res) {
	const project = req.project;

	project
		.remove()
		.then(() => res.sendStatus(204))
		.catch(() => res.sendStatus(500));
}

async function forkProject(req, res) {
	const { _id, name, description, author, files, root, entry } = req.body;
	const newProject = { _id, name, description, author, root, entry };

	Project.findById(_id)
		.then(project => {
			if (project) res.sendStatus(409);

			Project.create(newProject).then(() => {
				File.insertMany(files).then(() => res.sendStatus(201));
			});
		})
		.catch(() => res.sendStatus(500));
}

export {
	preloadProject,
	modifyProject,
	getProjectByProjectId,
	deleteProject,
	forkProject
};
