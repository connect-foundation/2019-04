import { DELETE_COOKIE_VALUE } from 'constants/cookie';

function deleteCookie(key) {
	document.cookie = key + DELETE_COOKIE_VALUE;
}

//참고: https://cofs.tistory.com/363
function getCookie(name) {
	const value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
	return value ? value[2] : null;
}

export { deleteCookie, getCookie };
