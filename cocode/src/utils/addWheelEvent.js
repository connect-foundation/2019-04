let scroll = false;

function handleWheelScroll(e) {
	if (scroll) return;
	scroll = true;
	if (e.deltaY < 0) window.scrollBy(0, -window.innerHeight);
	else window.scrollBy(0, window.innerHeight);
	wheelTimer = setTimeout(handleWheelAble, 1000);
}
function handleWheelAble() {
	scroll = false;
}

function addWheelEvent() {
	window.addEventListener('wheel', handleWheelScroll);
}

export default addWheelEvent;
