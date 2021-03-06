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

const settingsBtn = document.querySelector('.settings-btn');
const playBackLi = document.querySelector('.playback-speed-li');
const qualityLi = document.querySelector('.quality-li');
const settingsPlaybackMenu = document.querySelector('.playback-speed-ul');
const qualityMenu = document.querySelector('.xul');
const settingsBtnIcon = document.querySelector('.settings-btn');
const settingsMenus = document.querySelectorAll('.settings-menu ul');
const settingsMenu = document.querySelector('.settings-menu');
const settingsMenuMain = document.querySelector('.settings-menu ul:nth-child(2)');
const settingsMenuBG = document.querySelector('.settings-menu-bg');
const goBacks = document.querySelectorAll('.go-back');
const playBackOptions = document.querySelectorAll('.playback-speed-ul > li:not(.go-back)');
const playBackH6 = document.querySelector('.playback-speed-curr--h6');
let setMenuBGy;

const player = document.querySelector('.player')
const fullScreenBtns = document.querySelectorAll('.fullscreen');

const playerProgress = document.querySelector('.player__progress');
const playerProgressScrubbleBar = document.querySelector('.player__progress-scrubble-bar');
const playerControls = document.querySelector('.player__controls');


setInterval(() => {
  const time = `${Math.floor(video.currentTime / 60)}:${String(Math.floor(video.currentTime % 60)).padStart(2, "0")}`;
  currentTime.textContent = time;

  const videoTimeInPercent = (video.currentTime / video.duration) * 100;
  playerProgressScrubbleBar.style.width = `${videoTimeInPercent * 0.98}%`;
}, 100);

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
  if (e.key === "Enter") {
    toggleFullScreen();
  }
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
};

function goBackToMenu() {
  closeAllSettingsMenus();
  updateSettingsBackground(settingsMenuMain);
  settingsMenuBG.classList.add('settings-menu-bg--active');
  settingsMenuMain.classList.add('settings--active')
}

function closeAllSettingsMenus() {
  for(let menu of settingsMenus) {
    menu.classList.remove('settings--active');
  }
}

function openSettingsMenu() {
  if (settingsMenuBG.classList.contains('settings-menu-bg--active')) {
    closeAllSettingsMenus();
    updateSettingsBackground(settingsMenuMain);
    settingsMenuBG.classList.remove('settings-menu-bg--active');
    settingsBtn.style.background = 'transparent';
    settingsMenu.classList.remove('settings-menu--active');
  } else {
    settingsMenu.classList.add('settings-menu--active');
    settingsMenuMain.classList.add('settings--active');
    settingsMenuBG.classList.add('settings-menu-bg--active');
    settingsBtn.style.background = 'linear-gradient(to top, rgba(255, 0, 0, 0.425), transparent)';
    setMenuBGy = Number(settingsMenuMain.clientHeight);
    updateSettingsBackground(settingsMenuMain);
  };
};

function updateSettingsBackground(menu) {
  settingsMenuBG.style.transform = `scaleY(${menu.clientHeight/setMenuBGy})`;
};

function openPlaybackMenu() {
  closeAllSettingsMenus();
  updateSettingsBackground(settingsPlaybackMenu);
  settingsPlaybackMenu.classList.add('settings--active');
};

function openQualityMenu() {
  closeAllSettingsMenus();
  updateSettingsBackground(qualityMenu);
  qualityMenu.classList.add('settings--active');
};

function changePlaybackRate() {
  const playbackRateValue = this.textContent === 'Normal' ? 1 : Number(this.textContent);
  video.playbackRate = playbackRateValue;

  playBackH6.textContent = this.textContent;
  for (let playBack of playBackOptions) {
    playBack.querySelector('span').classList.remove('playback-speed-curr');
  }
  this.querySelector('span').classList.add('playback-speed-curr');
 
  closeAllSettingsMenus();
  updateSettingsBackground(settingsMenuMain);
  settingsMenuBG.classList.remove('settings-menu-bg--active');
  settingsBtn.style.background = 'transparent';
  settingsMenu.classList.remove('settings-menu--active');
};


function toggleFullScreen() {
  for (let fullScreenBtn of fullScreenBtns) fullScreenBtn.classList.toggle('fullscreen--active');

  if (!document.fullscreenElement) {
      player.requestFullscreen();
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
};

function toggleProgressBar() {
  playerControls.classList.toggle('player__progress--active');
};

function playAtThisTimeVideo(e) {
  const progressBarStats = playerProgress.getBoundingClientRect();
  const progressBarStart = progressBarStats.x;
  const progressBarEnd = progressBarStats.x + progressBarStats.width;
  const percentWhereClicked = ((e.x - progressBarStart) / (progressBarEnd - progressBarStart)) * 100;
  const percentWidthProgress = percentWhereClicked * 0.98;
  const oneWidthPercentOfVideoTime = video.duration / 100;

  playerProgressScrubbleBar.style.width = `${percentWidthProgress}%`;
  video.currentTime = oneWidthPercentOfVideoTime * percentWhereClicked;
};

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

settingsBtn.addEventListener('click', openSettingsMenu);
playBackLi.addEventListener('click', openPlaybackMenu);
qualityLi.addEventListener('click', openQualityMenu);
for (let goBack of goBacks) {
  goBack.addEventListener('click', goBackToMenu);
};
for (let playBack of playBackOptions) {
  playBack.addEventListener('click', changePlaybackRate);
}

for (let btn of fullScreenBtns) {
  btn.addEventListener('click', toggleFullScreen);
}

playerProgress.addEventListener('mouseenter', toggleProgressBar);
playerProgressScrubbleBar.addEventListener('mouseenter', toggleProgressBar);
playerProgress.addEventListener('mouseleave', toggleProgressBar);
playerProgressScrubbleBar.addEventListener('mouseleave', toggleProgressBar);

playerProgress.addEventListener('click', playAtThisTimeVideo);
playerProgressScrubbleBar.addEventListener('click', playAtThisTimeVideo);
