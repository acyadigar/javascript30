const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo() {
  navigator.mediaDevices.getUserMedia({
    video: true,
    audio: false
  })
  .then(localMediaStream => {
    console.log(localMediaStream)
    video.srcObject = localMediaStream
    video.play()
  })
  .catch(err => {alert(err)})
}

function paintToCanvas() {
  const [width, height] = [video.videoWidth, video.videoHeight]
  canvas.width = width;
  canvas.height = height;

  return setInterval(() => {
    // ctx.drawImage(image, dx, dy, dWidth, dHeight);
    // ctx.getImageData(sx, sy, sw, sh);
    ctx.drawImage(video, 0, 0, width, height)

    let pixels = ctx.getImageData(0, 0, width, height)
    pixels = rgbSplit(pixels)
    pixels = redEffect(pixels)
    // pixels = greenScreen(pixels)
    ctx.globalAlpha = .7
    ctx.putImageData(pixels, 0, 0)
  }, 16)
}

function takePhoto() {
  // sound
  snap.currentTime = 0
  snap.play()

  // data of the canvas
  const data = canvas.toDataURL('image/jpeg')
  const link = document.createElement('a')
  link.href = data
  link.setAttribute('download', 'selfie')
  link.innerHTML = `<img src='${data}' alt='Selfie'/>`
  strip.insertBefore(link, strip.firstChild)
}

function redEffect(pixels) {
  for(let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i]     = pixels.data[i] + 100 // Red
    pixels.data[i + 1] = pixels.data[i + 1] - 100 // Green
    pixels.data[i + 2] = pixels.data[i + 2] * 0.7 // Blue
    // alpha
  }
  return pixels
}

function rgbSplit(pixels) {
  for(let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i - 100] = pixels.data[i]
    pixels.data[i + 500] = pixels.data[i + 1]
    pixels.data[i - 1500] = pixels.data[i + 2]
  }
  return pixels
}

function greenScreen() {
  const levels = {}

  document.querySelectorAll('.rgb input').forEach((input) => {
    levels[input.name] = input.value
  })

  for (let i = 0; i < pixels.data.length; i += 4) {
    red = pixels.data[i]
    green = pixels.data[i + 1]
    blue = pixels.data[i + 2]
    alpha = pixels.data[i + 3]
  
    if (red >= levels.rmin
      && green >= levels.gmin
      && blue >= levels.bmin
      && red <= levels.rmax
      && green <= levels.gmax
      && blue <= levels.bmax) {
        pixels.data[i + 3] = 0
      }
  }
  return pixels
}
 
getVideo()
video.addEventListener('canplay', paintToCanvas);