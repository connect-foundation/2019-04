let isScrollable = false;

function handleWheelScroll(e) {
	if (isScrollable) return;
	isScrollable = true;
	if (e.deltaY < 0) window.scrollBy(0, -window.innerHeight);
	else window.scrollBy(0, window.innerHeight);
	setTimeout(handleWheelAble, 1000);
}
function handleWheelAble() {
	isScrollable = false;
}

function addWheelEvent() {
	window.addEventListener('wheel', handleWheelScroll);
}

export default addWheelEvent;
