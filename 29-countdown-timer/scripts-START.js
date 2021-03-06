const timerDisplay = document.querySelector('.display__time-left')
const endTime = document.querySelector('.display__end-time')
const buttons = document.querySelectorAll('[data-time]');

let countdown

function timer(seconds) {
  clearInterval(countdown)

  const now = Date.now()
  const then = now + seconds * 1000
  displayTimeLeft(seconds)
  displayEndTime(then)

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000)

    if (secondsLeft < 0) return clearInterval(countdown)
    displayTimeLeft(secondsLeft)
  }, 1000)
}

function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60)
  const remainderSecs = seconds % 60
  const display = `
  ${minutes}:${remainderSecs < 10 ? '0' : ''}${remainderSecs}
  `
  timerDisplay.textContent = display
  document.title = display
}

function displayEndTime(timestamp) {
  const end = new Date(timestamp)
  const [hour, minutes] = [end.getHours(), end.getMinutes()]
  const display = `
  Be Back at ${hour}:${minutes < 10 ? '0' : ''}${minutes}
  `
  endTime.textContent = display
}

function startTimer() {
  const seconds = parseInt(this.dataset.time)
  timer(seconds)
}

buttons.forEach(button => button.addEventListener('click', startTimer))
document.customForm.addEventListener('submit', function(e) {
  e.preventDefault()
  const mins = this.minutes.value
  timer(mins * 60)
  this.reset()
})