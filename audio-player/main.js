const btnPausePlay = document.querySelector('.control-btn-play');;
const btnPrev = document.querySelector('.control-btn-prev');
const btnNext = document.querySelector('.control-btn-next');
const cards = document.querySelectorAll('.slider-card');
const audio = document.querySelector('#mp3');
const countCards = cards.length;
let activeCard=0;
const trackList = [
  "Alan Walker, Sorana - Catch Me If You Can.mp3",
  "Dezko - Ascend.mp3",
  "Gaullin - Moonlight.mp3"    
];
  

function goTo(index) {
  cards[activeCard].classList.remove('active');
  if (index===-1) {index=countCards-1}; if (index===countCards) {index=0;};
  cards[index].classList.add('active');
  if(audio.paused) audio.src = "./assets/audio/"+trackList[index];
  else {audio.src = "./assets/audio/"+trackList[index]; audio.play();}
  activeCard=index;
}

function audioPlayPause() {
  if(audio.paused) {btnPausePlay.src = "./assets/icon/pause.png"; audio.play();} 
  else { btnPausePlay.src = "./assets/icon/play.png"; audio.pause();}
}


btnPrev.addEventListener('click', () => goTo(activeCard-1));
btnNext.addEventListener('click', () => goTo(activeCard+1));
btnPausePlay.addEventListener('click', audioPlayPause);
