import { KEY_CODE_S } from 'constants/keyCode';

//출처: https://michilehr.de/overwrite-cmds-and-ctrls-in-javascript/
const isPressCtrlAndS = e =>
	(window.navigator.platform.match('Mac') ? e.metaKey : e.ctrlKey) &&
	e.which === KEY_CODE_S;

export { isPressCtrlAndS };
