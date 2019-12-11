import { KEY_CODE_S } from '../constants/keyCode';

const isPressCtrlAndS = e =>
	(window.navigator.platform.match('Mac') ? e.metaKey : e.ctrlKey) &&
	e.which === KEY_CODE_S;

export { isPressCtrlAndS };
