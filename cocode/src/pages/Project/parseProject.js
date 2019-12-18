import copyProject from 'template/copyProject';

const parseProject = (project, username) => {
	const { dependency, entry, name, root, _id } = project;
	const projectInfo = JSON.parse(
		JSON.stringify({ dependency, entry, name, root, _id })
	);
	const files = [];
	Object.entries(project.files).forEach(([_, file]) => {
		const { child, name, projectId, type, _id, contents } = file;
		files.push({ child, name, projectId, type, _id, contents });
	});
	const parsedProject = copyProject({ ...projectInfo, files });

	parsedProject.author = username;

	return parsedProject;
};

export default parseProject;
