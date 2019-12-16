const API_SERVER =
	process.env.NODE_ENV === 'production'
		? process.env.PROD_API_SERVER_IP
		: process.env.DEV_API_SERVER_IP;

const DEPENDENCY_SERVER =
	process.env.NODE_ENV === 'production'
		? process.env.PROD_DEPENDENCY_SERVER_IP
		: process.env.DEV_DEPENDENCY_SERVER_IP;

const COCONUT_SERVER =
	process.env.NODE_ENV === 'production'
		? process.env.PROD_COCONUT_SERVER_IP
		: process.env.DEV_COCONUT_SERVER_IP;

const LIVE_SERVER =
	process.env.NODE_ENV === 'production'
		? process.env.PROD_LIVE_SERVER_IP
		: process.env.DEV_LIVE_SERVER_IP;

const COCODE_SERVER =
	process.env.NODE_ENV === 'production'
		? process.env.PROD_COCODE_SERVER_IP
		: process.env.DEV_COCODE_SERVER_IP;

const DEFAULT_REQUEST_OPTION = {
	withCredentials: true,
	mode: 'cors',
	credentials: 'include'
};

const API = {
	getUserData: `${API_SERVER}/users`,
	login: `${API_SERVER}/users/login`,
	users: `${API_SERVER}/users`,
	projects: `${API_SERVER}/projects`,
	files: projectId => `${API_SERVER}/projects/${projectId}/files`,
	dependency: name => `${API_SERVER}/dependency/search?name=${name}`
};

const DEPENDENCY = {
	modules: `${DEPENDENCY_SERVER}/modules`
};

export {
	DEFAULT_REQUEST_OPTION,
	API,
	DEPENDENCY,
	COCONUT_SERVER,
	LIVE_SERVER,
	COCODE_SERVER
};
