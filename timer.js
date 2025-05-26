const defaultTime = '30:00';

let remaining;
let countdown;
let ogTime;
let isPaused = false;

function getTotalSeconds() {
    let min = Number(document.getElementById('minInput').value);
    let sec = Number(document.getElementById('secInput').value);

    return Math.abs(min * 60 + sec);
}

function secondsToString(totalSeconds) {
    if (totalSeconds < 60) {
        return '00:' + String(totalSeconds).padStart(2, '0');
    } else {
        const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
        const seconds = String(totalSeconds % 60).padStart(2, '0');

        return minutes + ':' + seconds;
    }
}

function start() {
    if (!isPaused) {
        totalSec = getTotalSeconds()

        update(totalSec)
        remaining = totalSec;
        clearInterval(countdown);
    } else {
        update(remaining);
        isPaused = false;
    }

    countdown = setInterval(tick, 1000);
    isPaused = false;
    
    document.getElementById('minInput').value = null;
    document.getElementById('secInput').value = null;
    document.getElementById('startBtn').disabled = true;
}

function pause() {
    clearInterval(countdown);
    isPaused = true;

    document.getElementById('startBtn').disabled = false;
}

function stop() {
    update(0);
    remaining = 0;
    clearInterval(countdown);

    document.getElementById('startBtn').disabled = false;
}

function update(time) {
    document.getElementById("timer-display").innerHTML = secondsToString(time);
}

function tick() {
    if (remaining > 0) {
        remaining --;
        update(remaining);
    } else {
        clearInterval(countdown);
        alert();
    }
}

function alert() {

}