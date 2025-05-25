const defaultTime = '30:00';
let inputTime;

function getTotalSeconds() {
    let min = Number(document.getElementById('minInput').value);
    let sec = Number(document.getElementById('secInput').value);

    return min * 60 + sec;
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
    const startTime = secondsToString(getTotalSeconds());
    document.getElementById("timer-display").innerHTML = startTime;
    
    document.getElementById('minInput').value = null;
    document.getElementById('secInput').value = null;
}

function pause() {

}

function reset() {

}

document.getElementById("timer-display")