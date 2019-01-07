const currentPosition = {
    left: 700,
    bottom: 0,
};
const currentAlienPosition = {
    left: 700,
    bottom: 610
};
//----------------------------------------------------
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
    return currentPosition > 0;
};
//--------------------------------------------------
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
    }, 200);
};
//-------------------------------------------
const moveAlienRight = function () {
    let move = setInterval(() => {
        currentAlienPosition.left = currentAlienPosition.left + 50; // for moving right
        document.getElementById('alien').style.left = currentAlienPosition.left;
        if (currentAlienPosition.left > 1200) {
            clearInterval(move);
            moveAlienLeft(currentAlienPosition.left);
        }
    }, 300);    // speed of alien while moving right
};

const moveAlienLeft = function () {
    let move = setInterval(() => {
        currentAlienPosition.left = currentAlienPosition.left - 50; // for moving left
        document.getElementById('alien').style.left = currentAlienPosition.left;
        if (currentAlienPosition.left < 100) {
            clearInterval(move);
            moveAlienRight(currentAlienPosition.left);
        }
    }, 300);    // speed of alien while going left
}
const moveAlien = function () {
    moveAlienLeft(currentAlienPosition.left);
};
const inRange = function (left, bottom, currentPosition) {
    const leftCheck = left >= currentPosition.left - 40 && left <= currentPosition.left + 40;
    const bottomCheck = bottom >= currentPosition.bottom - 50 && bottom <= currentPosition.bottom + 50;
    if (leftCheck && bottomCheck) {
        return true;
    }
};
const makeShot = function () {
    let { left, bottom } = currentAlienPosition;
    bottom = 500;
    let div = document.createElement('div');
    div.style.left = left + 80 + 'px'; // to put shot at center of spaceship
    div.style.bottom = bottom;
    div.className = 'alienAttack';
    document.body.appendChild(div);

    return { div, left, bottom };
}
const fireShot = function () {
    let { div, left, bottom } = makeShot();
    let shot = setInterval(() => {
        bottom = bottom - 70;
        div.style.bottom = bottom + 'px';
        if (bottom <= 0) {
            clearInterval(shot);
            document.body.removeChild(div);
        }
        if (inRange(left, bottom, currentPosition)) {
            clearInterval(shot);
            document.body.removeChild(div);
            alert('boom!!!!!!!!');
        }

    }, 150);    // speed of bullet
};
const getRandomInterval = function () {
    let result = Math.ceil(Math.random() * 15) * 100

    return result;
}
const fireContinousShot = function () {
    let interval = getRandomInterval();
    setTimeout(() => {
        fireShot();
        fireContinousShot();
    }, interval);

};

