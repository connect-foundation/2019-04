let marker = true;
let scroll = true;
let delta;
let counter1 = 0;
let counter2;

function wheel (e) {
    counter1++;
    delta = e.deltaY;
    if (marker) wheelStart();
};

function wheelStart () {
    marker = false;
    wheelAct();
};

function wheelAct () {
    counter2 = counter1;
    setTimeout(() => {
        if (counter2 === counter1) return wheelEnd();
        if (scroll) return scrollMove();
        return wheelAct();
    }, 10);
};

function wheelEnd() {
    marker = true;
    scroll = true;
    counter1 = 0;
    counter2 = false;
};

function scrollMove() {
    scroll = false;
    if (delta > 0) window.scrollBy(0, -window.innerHeight);
    else if (delta < 0) window.scrollBy(0, window.innerHeight);
    wheelAct();
};

function addWheelEvent() {
    window.addEventListener('wheel', wheel);
}

export default addWheelEvent;