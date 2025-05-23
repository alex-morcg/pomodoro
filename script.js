let timeLeft;
let timerId = null;
let isWorkMode = true;

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const workButton = document.getElementById('work');
const breakButton = document.getElementById('break');

const WORK_TIME = 25 * 60; // 25 minutes in seconds
const BREAK_TIME = 5 * 60; // 5 minutes in seconds

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    minutesDisplay.textContent = minutes.toString().padStart(2, '0');
    secondsDisplay.textContent = seconds.toString().padStart(2, '0');
}

function startTimer() {
    if (timerId === null) {
        timerId = setInterval(() => {
            timeLeft--;
            updateDisplay();
            
            if (timeLeft === 0) {
                clearInterval(timerId);
                timerId = null;
                alert(isWorkMode ? 'Work session completed! Take a break!' : 'Break time is over! Back to work!');
                isWorkMode = !isWorkMode;
                timeLeft = isWorkMode ? WORK_TIME : BREAK_TIME;
                updateDisplay();
                updateModeButtons();
            }
        }, 1000);
    }
}

function pauseTimer() {
    clearInterval(timerId);
    timerId = null;
}

function resetTimer() {
    clearInterval(timerId);
    timerId = null;
    timeLeft = isWorkMode ? WORK_TIME : BREAK_TIME;
    updateDisplay();
}

function switchMode(mode) {
    isWorkMode = mode === 'work';
    timeLeft = isWorkMode ? WORK_TIME : BREAK_TIME;
    updateDisplay();
    updateModeButtons();
    resetTimer();
}

function updateModeButtons() {
    workButton.classList.toggle('active', isWorkMode);
    breakButton.classList.toggle('active', !isWorkMode);
}

// Initialize
timeLeft = WORK_TIME;
updateDisplay();

// Event listeners
startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
workButton.addEventListener('click', () => switchMode('work'));
breakButton.addEventListener('click', () => switchMode('break')); 