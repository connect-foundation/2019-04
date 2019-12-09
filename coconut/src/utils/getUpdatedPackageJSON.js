function getUpdatedPackageJSON(files, root, dependency) {
	const childOfRoot = files[root].child;
	const packageJSON = childOfRoot
		.map(id => files[id])
		.filter(({ name }) => name === 'package.json')[0];
	const dependencies = JSON.parse(packageJSON.contents).dependencies;
	const newDependencies = {
		...dependencies,
		[dependency.name]: dependency.version
	};

	const newPackageJSONContents = JSON.stringify(
		{
			...JSON.parse(packageJSON.contents),
			dependencies: newDependencies
		},
		undefined,
		4
	);
	const packageJSONFileId = packageJSON._id;

	return { newPackageJSONContents, packageJSONFileId };
}

export default getUpdatedPackageJSON;
