const API_SERVER =
	process.env.NODE_ENV === 'production'
		? process.env.REACT_APP_PROD_API_SERVER_IP
		: process.env.REACT_APP_DEV_API_SERVER_IP;

const DEPENDENCY_SERVER =
	process.env.NODE_ENV === 'production'
		? process.env.REACT_APP_PROD_DEPENDENCY_SERVER_IP
		: process.env.REACT_APP_DEV_DEPENDENCY_SERVER_IP;

const DEFAULT_REQUEST_OPTION = {
	withCredentials: true,
	mode: 'cors',
	credentials: 'include'
};

const API = {
	projects: `${API_SERVER}/projects`,
	dependency: name => `${API_SERVER}/dependency/search?name=${name}`
};

const DEPENDENCY = {
	modules: `${DEPENDENCY_SERVER}/modules`
};

export { DEFAULT_REQUEST_OPTION, API, DEPENDENCY };
