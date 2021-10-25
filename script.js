const video = document.querySelector('.video');
const playBtn = document.querySelector('.play');
const playCircleBtn = document.querySelector('.play-pause-circle-play');
const stopBtn = document.querySelector('.stop');
const stopCircleBtn = document.querySelector('.play-pause-circle-stop');
const playCircle = document.querySelector('.play-pause-circle')

const soundIcon = document.querySelector('.sound');
const soundMuteIcon = document.querySelector('.mute-sound');
const soundBar = document.querySelector('.sound-bar');
const soundDiv = document.querySelector('.sound-div')
let lastVolumeValue = soundBar.value;

const currentTime = document.querySelector('.time-passed');
const videoDuration = document.querySelector('.video-duration');

const circleForward = document.querySelector('.f-b-circle--forward')
const circleBackward = document.querySelector('.f-b-circle--backward')

setInterval(() => {
  const time = `${Math.floor(video.currentTime / 60)}:${String(Math.floor(video.currentTime % 60)).padStart(2, "0")}`
  currentTime.textContent = time;
}, 0100);

function updateVideoDuration() {
  const duration = `${Math.floor(video.duration / 60)}:${String(Math.floor(video.duration % 60)).padStart(2, "0")}`
  videoDuration.textContent = duration;
};

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
  this.classList.remove('play-pause-circle--anim');
};

function skipVideo(direction) {
  if (direction === 'goForward') {
    video.currentTime += 10;

    circleForward.classList.remove('play-pause-circle--anim');
    void circleForward.offsetWidth; 
    circleForward.classList.add('play-pause-circle--anim');
  } else {
    video.currentTime -= 10;

    circleBackward.classList.remove('play-pause-circle--anim');
    void circleBackward.offsetWidth; 
    circleBackward.classList.add('play-pause-circle--anim');
  }
}

function handleKeys(e) {
  if (e.key === 'k' || e.key === 'K') togglePlayPause.call(video);
  if (e.key === 'm' || e.key === 'M') toggleSound();
  if (e.key === 'j' || e.key === 'J') skipVideo('goBack');
  if (e.key === 'l' || e.key === 'L') skipVideo('goForward');
};

function muteSound() {
  lastVolumeValue = video.volume*100;
  video.volume = 0;
  soundBar.value = 0;
};

function unmuteSound() {
  video.volume = lastVolumeValue/100;
  soundBar.value = lastVolumeValue;
};

function toggleSound() {
  soundIcon.classList.toggle('sound--active');
  soundMuteIcon.classList.toggle('sound--active');
  if (soundIcon.classList.contains('sound--active')) unmuteSound();
  else muteSound();
};

function handleSound() {
  const volume = Number(this.value);
  if (volume === 0 && soundIcon.classList.contains('sound--active')) toggleSound();
  else if (volume > 0 && soundMuteIcon.classList.contains('sound--active'))toggleSound();
  video.volume = volume/100;
};

function toggleSoundBar() {
  soundDiv.classList.toggle('sound-div--active');
}

playCircle.addEventListener('animationend', removeCircleAnim)
circleForward.addEventListener('animationend', removeCircleAnim)
circleBackward.addEventListener('animationend', removeCircleAnim)
playBtn.addEventListener('click', togglePlayPause);
stopBtn.addEventListener('click', togglePlayPause);
video.addEventListener('click', togglePlayPause);
window.addEventListener('keydown', handleKeys);

soundIcon.addEventListener('click', toggleSound);
soundMuteIcon.addEventListener('click', toggleSound);
soundDiv.addEventListener('mouseenter', toggleSoundBar);
soundDiv.addEventListener('mouseenter', toggleSoundBar);
soundDiv.addEventListener('mouseleave', toggleSoundBar);
soundDiv.addEventListener('mouseleave', toggleSoundBar);
soundBar.addEventListener('input', handleSound);

video.addEventListener('durationchange', updateVideoDuration);
