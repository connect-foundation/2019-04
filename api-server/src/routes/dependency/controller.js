import search from 'libnpmsearch';

function parseNpmList(list) {
	return list.map(dependency => {
		const {
			name,
			version,
			links: { npm, repository }
		} = dependency;

		return {
			name,
			version,
			npm,
			github: repository
		};
	});
}

async function getDependencyList({ query }, res) {
	const { name } = query;
	if (!name) res.sendStatus(412);

	search(name)
		.then(list => {
			if (!list.length) res.sendStatus(404);
			const npmList = parseNpmList(list);
			res.status(200).send(npmList);
		})
		.catch(() => res.sendStatus(500));
}

export { getDependencyList };
