const panels = document.querySelectorAll('.panel')
function toggleOpen() {
    this.classList.toggle('open')
    this.classList.toggle('active')
    console.log('YUP!');
}

function toggleActive(e) {
  console.log(e.propertyName);
  if (e.propertyName.includes('flex')) {
    this.classList.toggle('open-active');
  }
}

panels.forEach(panel => panel.addEventListener('click', toggleOpen))
panels.forEach(panel => panel.addEventListener('transitionend', toggleActive));
