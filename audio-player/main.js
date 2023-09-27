console.log(`
1. Вёрстка +10
    - Вёрстка аудиоплеера: есть кнопка Play/Pause, кнопки "Вперёд" и "Назад" для пролистывания аудиотреков, прогресс-бар, отображается название и автор трека +5
    - В футере приложения есть ссылка на гитхаб автора приложения, год создания приложения, логотип курса со ссылкой на курс +5
2. Кнопка Play/Pause +10
    - Есть кнопка Play/Pause, при клике по которой можно запустить или остановить проигрывание аудиотрека +5
    - Внешний вид и функционал кнопки Play/Pause изменяется в зависимости от того, проигрывается ли в данный момент аудиотрек +5
3. При кликах по кнопкам "Вперёд" и "Назад" переключается проигрываемый аудиотрек. Аудиотреки пролистываются по кругу - после последнего идёт первый +10
4. При смене аудиотрека меняется изображение - обложка аудиотрека +10
5. Прогресс-бар отображает прогресс проигрывания текущего аудиотрека. При перемещении ползунка вручную меняется текущее время проигрывания аудиотрека +10
6. Отображается продолжительность аудиотрека и его текущее время проигрывания +10
7. Очень высокое качество оформления приложения и/или дополнительный не предусмотренный в задании функционал, улучшающий качество приложения +10:
   Кроме основных функций, реализована возможность изменения текущего времени при перемещении ползунка прогресс-бара для быстрого поиска
   конкретного времени трека.

   Score: 70/60
`);
/*----------------------------------------------------------------------*/
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
