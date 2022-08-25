let countdown;

const timerDisplay = document.querySelector('.display_time-left');
const endTime = document.querySelector('.display_end-time');
const buttons = document.querySelectorAll('[data-time]');

const displayTimeLeft = (seconds) => {
  const minutes = Math.floor(seconds/60);
  const remainderSeconds = seconds % 60;
  const hour = Math.floor(minutes/60);
  const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
  timerDisplay.innerHTML = display;
  document.title = display;
}

const displayEndTime = (timestamp) => { 
  const end = new Date(timestamp);
  const hour = end.getHours();
  const minutes = end.getMinutes();
  endTime.textContent = `be back at ${hour}:${minutes < 10 ? '0' : ''}${minutes}`;
}

const timer = (seconds) => {
  clearInterval(countdown); //clear any existing timers
  const now = Date.now(); //when the timer starts (milliseconds) 
  const then = now + seconds * 1000;
  displayTimeLeft(seconds); //here the second is gonna displayed
  displayEndTime(then); //it just gonna to happen once
  
  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    //be sure that we can stop this interval
    if (secondsLeft < 0) {
        clearInterval(countdown);
        return;
    }
    //before to display it
    displayTimeLeft(secondsLeft);
}, 1000);
}

const startTimer = (e) => {
    const btn = e.path[0]; 
    const seconds = parseInt(btn.dataset.time);
    timer(seconds)
  }

buttons.forEach(button => button.addEventListener('click', startTimer));
document.customForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const mins = this.minutes.value * 60;
  timer(mins);
});