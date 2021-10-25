const video = document.querySelector('.video');
const playBtn = document.querySelector('.play');
const playCircleBtn = document.querySelector('.play-pause-circle-play');
const stopBtn = document.querySelector('.stop');
const stopCircleBtn = document.querySelector('.play-pause-circle-stop');
const playCircle = document.querySelector('.play-pause-circle')

console.log('JJJ', video.autoplay);

function togglePlayPause() {
  playBtn.classList.toggle('video--active');
  playCircleBtn.classList.toggle('video--active');
  stopBtn.classList.toggle('video--active');
  stopCircleBtn.classList.toggle('video--active');

  if (playBtn.classList.contains('video--active')) {
    video.play();
  } else {
    video.pause();
  };

  if (this.classList.contains('video')) {
    displayCircleAnim();
  };
};

function displayCircleAnim() {
  playCircle.classList.remove('play-pause-circle--anim');
  void playCircle.offsetWidth; 
  playCircle.classList.add('play-pause-circle--anim');
}

function removeCircleAnim() {
  playCircle.classList.remove('play-pause-circle--anim');
};

function handleKeys(e) {
  if (e.key === 'k' || e.key === 'K') togglePlayPause.call(video);
};

playCircle.addEventListener('animationend', removeCircleAnim)
playBtn.addEventListener('click', togglePlayPause);
stopBtn.addEventListener('click', togglePlayPause);
video.addEventListener('click', togglePlayPause);
window.addEventListener('keydown', handleKeys);
