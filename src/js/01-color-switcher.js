const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');
const bodyRef = document.querySelector('body');

let timerId = null;

startButton.addEventListener('click', onChangeColorBackground);
stopButton.addEventListener('click', onStopChangeColorBackground);

function onChangeColorBackground(event) {
  timerId = setInterval(() => {
    bodyRef.style.backgroundColor = getRandomHexColor();
  }, 1000);

  event.currentTarget.disabled = true;
}

function onStopChangeColorBackground() {
  clearInterval(timerId);
  startButton.disabled = false;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
