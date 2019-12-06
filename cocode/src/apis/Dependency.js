import { DEPENDENCY } from 'config';

function getModule(moduleName, moduleVersion) {
	return {
		url: `${DEPENDENCY.modules}`,
		method: 'post',
		data: {
			moduleName,
			moduleVersion
		}
	};
}

export { getModule };
