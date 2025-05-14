let timerInterval;
let milliseconds = 0;
const laps = [];

function startTimer() {
  if (timerInterval) return;
  timerInterval = setInterval(() => {
    milliseconds += 10;
    updateTimer();
  }, 10);
}

function stopTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
}

function resetTimer() {
  stopTimer();
  milliseconds = 0;
  laps.length = 0;
  updateTimer();
  document.getElementById("lapsList").innerHTML = "";
}

function saveLap() {
  laps.push(milliseconds);
  renderLaps();
}

function updateTimer() {
  const minutes = Math.floor(milliseconds / 60000)
    .toString()
    .padStart(2, "0");
  const seconds = Math.floor((milliseconds % 60000) / 1000)
    .toString()
    .padStart(2, "0");
  const ms = (milliseconds % 1000).toString().padStart(3, "0");
  document.getElementById("timer").textContent = `${minutes}:${seconds}:${ms}`;
}

function renderLaps() {
  const lapsList = document.getElementById("lapsList");
  lapsList.innerHTML = "";

  laps.forEach((lapTime, index) => {
    const minutes = Math.floor(lapTime / 60000)
      .toString()
      .padStart(2, "0");
    const seconds = Math.floor((lapTime % 60000) / 1000)
      .toString()
      .padStart(2, "0");
    const ms = (lapTime % 1000).toString().padStart(3, "0");

    const lapItem = document.createElement("div");
    lapItem.className = "lap-item";
    lapItem.textContent = `Giro ${index + 1}: ${minutes}:${seconds}:${ms}`;
    lapsList.appendChild(lapItem);
  });
}