let timer;
let isRunning = false;
let startTime;
let lapTimes = [];

function startStop() {
  const startStopBtn = document.getElementById('startStopBtn');

  if (isRunning) {
    clearInterval(timer);
    startStopBtn.textContent = 'Start';
    startStopBtn.style.backgroundColor = '';
  } else {
    startTime = new Date() - lapTimes.reduce((acc, lap) => acc + lap, 0);
    timer = setInterval(updateDisplay, 1000);
    startStopBtn.textContent = 'Stop';
    startStopBtn.style.backgroundColor = 'green';
  }

  isRunning = !isRunning;
}

function updateDisplay() {
  const currentTime = new Date() - startTime;
  const formattedTime = formatTime(currentTime);
  document.getElementById('display').textContent = formattedTime;
}

function formatTime(milliseconds) {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const seconds = totalSeconds % 60;
  const minutes = Math.floor(totalSeconds / 60) % 60;
  const hours = Math.floor(totalSeconds / 3600);
  
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

function pad(number) {
  return number.toString().padStart(2, '0');
}

function lap() {
  if (isRunning) {
    const lapTime = new Date() - startTime;
    lapTimes.push(lapTime);
    displayLaps();
  }
}

function displayLaps() {
  const lapsContainer = document.getElementById('laps');
  const lapTime = lapTimes[lapTimes.length - 1];
  const formattedTime = formatTime(lapTime);

  const lapItem = document.createElement('li');
  lapItem.textContent = `Lap ${lapTimes.length}: ${formattedTime}`;
  lapsContainer.appendChild(lapItem);
}

function reset() {
  clearInterval(timer);
  isRunning = false;
  lapTimes = [];
  document.getElementById('display').textContent = '00:00:00';
  document.getElementById('startStopBtn').textContent = 'Start';
  document.getElementById('laps').innerHTML = '';
}
