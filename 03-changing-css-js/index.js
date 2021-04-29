const inputs = document.querySelectorAll('input')

function change() {
  const suffix = this.dataset.sizing || ''
//   console.log(suffix, this.value, this.name);
  document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix)
}

inputs.forEach(input => input.addEventListener('change', change))
inputs.forEach(input => input.addEventListener('mousemove', change))