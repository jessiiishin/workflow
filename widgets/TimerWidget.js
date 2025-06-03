import { Widget } from './Widget.js';

export class TimerWidget extends Widget {
    constructor () {
        super('timer', 'timer-widget');
        this.remaining = 0;
        this.countdown;
        this.isPaused = false;

        this.setupTimerUI();
    }

    setupTimerUI() {
        this.timerDisplay = document.createElement('div');
        this.timerDisplay.id = 'timer-display'
        this.timerDisplay.textContent = '00:00';
        this.frame.appendChild(this.timerDisplay);
        this.setupInputs();
        this.setupButtons();
    }

    setupInputs() {
        const inputdiv = document.createElement('div');
        inputdiv.classList.add('timer-input-group');

        this.minInput = document.createElement('input');
        this.secInput = document.createElement('input');

        this.minInput.classList.add('timer-input');
        this.secInput.classList.add('timer-input');

        this.minInput.type = 'number';
        this.secInput.type = 'number';

        this.minInput.placeholder = 'minutes';
        this.secInput.placeholder = 'seconds';
        
        inputdiv.append(this.minInput, this.secInput);
        this.frame.appendChild(inputdiv);
    }

    setupButtons() {
        const buttondiv = document.createElement('div');
        buttondiv.classList.add('timer-button-group');

        this.startBtn = document.createElement('button');
        this.pauseBtn = document.createElement('button');
        this.stopBtn = document.createElement('button');

        this.startBtn.textContent = 'start';
        this.pauseBtn.textContent = 'pause';
        this.stopBtn.textContent = 'stop';

        this.startBtn.classList.add('timer-btn');
        this.pauseBtn.classList.add('timer-btn');
        this.stopBtn.classList.add('timer-btn');

        this.startBtn.addEventListener('click', () => this.start());
        this.pauseBtn.addEventListener('click', () => this.pause());
        this.stopBtn.addEventListener('click', () => this.stop());

        this.pauseBtn.disabled = true;
        this.stopBtn.disabled = true;

        buttondiv.append(this.startBtn, this.pauseBtn, this.stopBtn);
        this.frame.appendChild(buttondiv);
    }

    getTotalSeconds() {
        let min = Number(this.minInput.value);
        let sec = Number(this.secInput.value);

        return Math.abs(min * 60 + sec);
    }

    secondsToString(totalSeconds) {
        if (totalSeconds < 60) {
            return '00:' + String(totalSeconds).padStart(2, '0');
        } else {
            const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
            const seconds = String(totalSeconds % 60).padStart(2, '0');

            return minutes + ':' + seconds;
        }
    }

    start() {
        if (!this.isPaused) {
            const totalSec = this.getTotalSeconds()
            if (totalSec === 0) {
                alert('please input a time larger than 0 seconds');
                return;
            }
            this.update(totalSec)
            this.remaining = totalSec;
            clearInterval(this.countdown);
        } else {
            this.update(this.remaining);
            this.isPaused = false;
        }

        this.countdown = setInterval(() => this.tick(), 1000);
        this.isPaused = false;

        this.minInput.disabled = true;
        this.secInput.disabled = true;

        this.startBtn.disabled = true;
        this.pauseBtn.disabled = false;
        this.stopBtn.disabled = false;
    }

    pause() {
        clearInterval(this.countdown);
        this.isPaused = true;

        this.minInput.disabled = true;
        this.secInput.disabled = true;

        this.startBtn.disabled = false;
        this.pauseBtn.disabled = true;
        this.stopBtn.disabled = false;
    }

    stop() {
        this.update(0);
        this.remaining = 0;
        clearInterval(this.countdown);
        this.isPaused = false;

        this.minInput.disabled = false;
        this.secInput.disabled = false;

        this.startBtn.disabled = false;
        this.pauseBtn.disabled = true;
        this.stopBtn.disabled = true;
    }

    update(time) {
        this.timerDisplay.innerHTML = this.secondsToString(time);
    }

    tick() {
        if (this.remaining > 0) {
            this.remaining --;
            this.update(this.remaining);
        } else {
            clearInterval(this.countdown);
            alert("timer is up!");
        }
    }
}