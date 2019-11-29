const API_SERVER =
	process.env.NODE_ENV === 'production'
		? process.env.PROD_API_SERVER_IP
		: process.env.DEV_API_SERVER_IP;

const DEFAULT_REQUEST_OPTION = {
	withCredentials: true,
	mode: 'cors',
	credentials: 'include'
};

const API = {
	getUserData: `${API_SERVER}/users`,
	login: `${API_SERVER}/users/login`,
	users: `${API_SERVER}/users`,
	projects: `${API_SERVER}/projects`
};

export { DEFAULT_REQUEST_OPTION, API };
