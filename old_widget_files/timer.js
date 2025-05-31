let remaining;
let countdown;
let ogTime;
let isPaused = false;

document.getElementById('pauseBtn').disabled = true;
document.getElementById('stopBtn').disabled = true;

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
        if (totalSec === 0) {
            alert('please input a time larger than 0 seconds');
            return;
        }
        update(totalSec)
        remaining = totalSec;
        clearInterval(countdown);
    } else {
        update(remaining);
        isPaused = false;
    }

    countdown = setInterval(tick, 1000);
    isPaused = false;

    document.getElementById('minInput').disabled = true;
    document.getElementById('secInput').disabled = true;

    document.getElementById('startBtn').disabled = true;
    document.getElementById('pauseBtn').disabled = false;
    document.getElementById('stopBtn').disabled = false;
}

function pause() {
    clearInterval(countdown);
    isPaused = true;

    document.getElementById('minInput').disabled = true;
    document.getElementById('secInput').disabled = true;

    document.getElementById('startBtn').disabled = false;
    document.getElementById('pauseBtn').disabled = true;
    document.getElementById('stopBtn').disabled = false;
}

function stop() {
    update(0);
    remaining = 0;
    clearInterval(countdown);
    isPaused = false;

    document.getElementById('startBtn').disabled = false;
    document.getElementById('minInput').disabled = false;
    document.getElementById('secInput').disabled = false;
    document.getElementById('pauseBtn').disabled = true;
    document.getElementById('stopBtn').disabled = true;
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
        alert("timer is up!");
    }
}