function playSound(e){
    const key = document.querySelector(`.key[data-key="${e.keyCode}"]`)
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`)
    if(!audio) return null
    if(e.keyCode == "71"){
      audio.playbackRate=0.2
    }
    audio.currentTime = 0
    audio.play()
    key.classList.add("playing")
    // setTimeout(() => {
    //   key.classList.remove("playing")
    // }, 70); // transition .07
  }

  function PlayViaClick(){
    const button = this.getAttribute("data-key")
    const key = document.querySelector(`.key[data-key="${button}"]`)
    const audio = document.querySelector(`audio[data-key="${button}"]`)
    if(button == '71'){
      audio.playbackRate=0.2
    }
    audio.currentTime = 0
    audio.play()
    key.classList.add("playing")
  }

  function transitionEnd(e){
    if (e.propertyName !== 'transform') return null
    this.classList.remove("playing")
  }

const keys = document.querySelectorAll(".key")
keys.forEach(key => key.addEventListener('click', PlayViaClick))
keys.forEach(key => key.addEventListener('transitionend', transitionEnd))
window.addEventListener("keydown",playSound)