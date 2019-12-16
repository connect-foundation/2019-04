// API
const API_READY = 'API_READY';
const API_LOADING = 'API_LOADING';
const API_SUCCESS = 'API_SUCCESS';
const API_FAIL = 'API_FAILURE';

// Project
const UPDATE_CODE = 'updateCode';
const FETCH_PROJECT = 'fetchProject';
const SELECT_FILE = 'selectFile';
const CREATE_FILE = 'createFile';
const UPDATE_FILE_NAME = 'updateFileName';
const DELETE_FILE = 'deleteFile';
const MOVE_FILE = 'moveFile';
const INSTALL_DEPENDENCY = 'installDependency';
const WAITING_INSTALL_DEPENDENCY = 'waitingInstallDependency';
const CLONE_PROJECT = 'cloneProject';
const SAVE_FILE = 'saveFile';

//DashBoard
const FETCH_COCONUT = 'fetchCoconut';
const UPDATE_COCONUT_NAME = 'updateCoconutName';
const DELETE_COCONUT = 'deleteCoconut';

//Live
const FETCH_LIVE = 'fetchLive';
const LIVE_ON = 'liveOn';
const LIVE_OFF = 'liveOff';
const LIVE_JOIN_USER = 'liveJoinUser';
const LIVE_LEFT_USER = 'liveLeftUser';

export {
	API_READY,
	API_LOADING,
	API_SUCCESS,
	API_FAIL,
	UPDATE_CODE,
	FETCH_PROJECT,
	SELECT_FILE,
	UPDATE_FILE_NAME,
	CREATE_FILE,
	DELETE_FILE,
	MOVE_FILE,
	INSTALL_DEPENDENCY,
	WAITING_INSTALL_DEPENDENCY,
	CLONE_PROJECT,
	FETCH_COCONUT,
	UPDATE_COCONUT_NAME,
	DELETE_COCONUT,
	FETCH_LIVE,
	LIVE_ON,
	LIVE_OFF,
	LIVE_JOIN_USER,
	LIVE_LEFT_USER,
	SAVE_FILE
};
