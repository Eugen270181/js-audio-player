const btnPausePlay = document.querySelector('.control-btn-play');
const btnPrev = document.querySelector('.control-btn-prev');
const btnNext = document.querySelector('.control-btn-next');
const cards = document.querySelectorAll('.slider-card');
let audio = document.querySelector('#mp3');
let progressBar = document.querySelector('.time-container-progressBar');
let lengthTrack = document.querySelector('.time-container-trackTime');
let currentTime = document.querySelector('.time-container-currentTime');
let onePercentTimeLine = 0;
const countCards = cards.length;
let activeCard=0;
const trackList = [
  "Alan Walker, Sorana - Catch Me If You Can.mp3",
  "Dezko - Ascend.mp3",
  "Gaullin - Moonlight.mp3"    
];
let ptrUpdateTimeLine = setInterval(updateTimeLine, 200);
let ptrUpdateCurrentTime = setInterval(updateCurrentTime, 200);
let rewindTimeLine = false;

audio.onloadedmetadata = function() {
  onePercentTimeLine = audio.duration/100;
  lengthTrack.textContent = formatTime(audio.duration);
}
audio.onended = () => {goTo(activeCard+1);}

function updateCurrentTime() {
  currentTime.textContent = formatTime(((!rewindTimeLine)?audio.currentTime:progressBar.value*onePercentTimeLine));
}
function updateTimeLine() {
  progressBar.value = audio.currentTime/onePercentTimeLine;
}

function goTo(index) {
  progressBar.value = 0;
  cards[activeCard].classList.remove('active');
  if (index===-1) {index=countCards-1}; if (index===countCards) {index=0;};
  cards[index].classList.add('active');
  audio.src = "./assets/audio/"+trackList[index]; //loading metadata
  progressBar.max = 100;
  updateCurrentTime(); //update current track time
  audioPlayPause(); //play audio because default it paused when loaded
  activeCard=index;
}
function audioPlayPause() {
  if(audio.paused) {btnPausePlay.src = "./assets/icon/pause.png"; audio.play();} 
  else { btnPausePlay.src = "./assets/icon/play.png"; audio.pause();}
}
function changeTimeLine() {
  audio.currentTime = progressBar.value * onePercentTimeLine;
  updateCurrentTime();
}
/*-------------------------------------------------------------*/
btnPrev.addEventListener('click', () => goTo(activeCard-1));
btnNext.addEventListener('click', () => goTo(activeCard+1));
btnPausePlay.addEventListener('click', audioPlayPause);
progressBar.addEventListener('change', changeTimeLine);
progressBar.addEventListener('mousedown', ()=> {clearInterval(ptrUpdateTimeLine);rewindTimeLine=true;});
progressBar.addEventListener('mouseup', ()=> {rewindTimeLine=false;ptrUpdateTimeLine=setInterval(updateTimeLine,200);});
/*---------------------------------------------------------------*/
/*-----------------------------------------------------*/
function formatTime (time) { //format = M:SS
  time = Math.floor(time);
  const minutes = Math.floor(time/60);
  const seconds = time%60;
  return `${minutes}:${(seconds<=9)?'0':''}${seconds}`;
}
