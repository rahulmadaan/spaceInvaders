const currentPosition = {
    left: 700,
    bottom: 50,
};

const moveRight = function () {
    if (rightBounds(currentPosition.left)) {
        currentPosition.left = currentPosition.left + 30;
        document.getElementById('spaceship').style.left = currentPosition.left + 'px';
    }
};

const moveLeft = function () {
    if (leftBounds(currentPosition.left)) {
        currentPosition.left = currentPosition.left - 30;
        document.getElementById('spaceship').style.left = currentPosition.left + 'px';
    }
};

const moveUp = function () {
    if (upBounds(currentPosition.bottom)) {
        currentPosition.bottom = currentPosition.bottom + 30;
        document.getElementById('spaceship').style.bottom = currentPosition.bottom + 'px';
    }

};

const moveBottom = function () {
    if (bottomBounds(currentPosition.bottom)) {
        currentPosition.bottom = currentPosition.bottom - 30;
        document.getElementById('spaceship').style.bottom = currentPosition.bottom + 'px';
    }
};

const leftBounds = function (currentPosition) {
    return 10 < currentPosition;
};
const rightBounds = function (currentPosition) {
    return currentPosition < 1330;
};
const upBounds = function (currentPosition) {
    return 200 > currentPosition;
}
const bottomBounds = function (currentPosition) {
    return currentPosition > 70;
};
const makeBullet = function () {
    let { left, bottom } = currentPosition;
    bottom = bottom + 120;      // to place bullet at the tip of spaceship
    let div = document.createElement('div');
    div.style.left = left + 40 + 'px';
    div.style.bottom = bottom;
    div.className = 'bullet';
    document.body.appendChild(div);

    return { div, bottom };
}
const fireBullet = function () {
    let { div, bottom } = makeBullet();
    setInterval(() => {
        bottom = bottom + 70;
        div.style.bottom = bottom + 'px';
    }, 400);

};
