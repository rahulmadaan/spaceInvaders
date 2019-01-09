const currentPosition = {
    left: 700,
    bottom: 0,
};
const currentAlienPosition = {
    left: 700,
    bottom: 610
};
const UNIT = "px";
//----------------------------------------------------

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

const bounds = {
    "left": leftBounds,
    "right": rightBounds,
    "up": upBounds,
    "bottom": bottomBounds
};

const directionToMove = {
    "left": "left",
    "right": "left",
    "up": "bottom",
    "bottom": "bottom"
};
const increment = function (variable, value) {
    return variable + value;
};

const decrement = function (variable, value) {
    return variable - value;
};

const incrementOrDecrement = function (direction, actualDirection, distanceToMove) {
    if (direction == actualDirection) {
        currentPosition[actualDirection] = decrement(currentPosition[actualDirection], distanceToMove)
        return;
    }
    currentPosition[actualDirection] = increment(currentPosition[actualDirection], distanceToMove);
    return;

};

const move = function (direction, distanceToMove = 30) {
    let actualDirection = directionToMove[direction]
    if (bounds[direction](currentPosition[actualDirection])) {
        incrementOrDecrement(direction, actualDirection, distanceToMove);
        document.getElementById('spaceship').style[actualDirection] = currentPosition[actualDirection] + UNIT;
    }
};

//--------------------------------------------------
const makeBullet = function () {
    let { left, bottom } = currentPosition;
    bottom = bottom + 120;      // to place bullet at the tip of spaceship
    let div = document.createElement('div');
    div.style.left = left + 40 + UNIT;
    div.style.bottom = bottom;
    div.className = 'bullet';
    document.body.appendChild(div);

    return { div, left, bottom };
}
const fireBullet = function () {
    let { div, left, bottom } = makeBullet();
    setInterval(() => {
        bottom = bottom + 50;
        div.style.bottom = bottom + UNIT;
        if (inRangeAlienCraft(left, bottom, currentAlienPosition)) {
            alert('hehe');
        }
    }, 100);
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
const inRangeSpacecraft = function (left, bottom, currentPosition) {
    const leftCheck = left >= currentPosition.left - 80 && left <= currentPosition.left - 20;
    const bottomCheck = bottom >= currentPosition.bottom - 150 && bottom <= currentPosition.bottom + 30;
    if (leftCheck && bottomCheck) {
        return true;
    }
};
const inRangeAlienCraft = function (left, bottom, currentAlienPosition) {
    const leftCheck = left >= currentAlienPosition.left - 50 && left <= currentAlienPosition.left + 90;
    const bottomCheck = bottom >= currentAlienPosition.bottom - 35 && bottom <= currentAlienPosition.bottom + 150;
    if (leftCheck && bottomCheck) {
        return true;
    }
}
const makeShot = function () {
    let { left, bottom } = currentAlienPosition;
    bottom = 500;
    let div = document.createElement('div');
    div.style.left = left + 80 + UNIT; // to put shot at center of spaceship
    div.style.bottom = bottom;
    div.className = 'alienAttack';
    document.body.appendChild(div);

    return { div, left, bottom };
}
const fireShot = function () {
    let { div, left, bottom } = makeShot();
    let shot = setInterval(() => {
        bottom = bottom - 50;
        div.style.bottom = bottom + UNIT;
        if (bottom <= 0 || inRangeSpacecraft(left, bottom, currentPosition)) {
            clearInterval(shot);
            document.body.removeChild(div);
        }
        if (inRangeSpacecraft(left, bottom, currentPosition)) {
            alert('hehe');
        }
        // if (inRangeSpacecraft(left, bottom, currentPosition)) {
        //     clearInterval(shot);
        //     document.body.removeChild(div);
        //     // alert('boom!!!!!!!!');
        //     console.log('boom');
        // }

    }, 100);    // speed of bullet
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

