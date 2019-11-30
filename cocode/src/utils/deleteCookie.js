import { DELETE_COOKIE_VALUE } from 'constants/cookie';

function deleteCookie(key) {
    document.cookie = key + DELETE_COOKIE_VALUE;
    window.location.reload();
};

export default deleteCookie;