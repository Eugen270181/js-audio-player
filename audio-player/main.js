const btnPrev = document.querySelector('.control-btn-prev');
const btnNext = document.querySelector('.control-btn-next');
const cards = document.querySelectorAll('.slider-card');
const countCards = cards.length;
let activeCard=0;

function goTo(index) {
  cards[activeCard].classList.remove('active');
  if (index===-1) {index=countCards-1}; if (index===countCards) {index=0;};
  cards[index].classList.add('active');
  activeCard=index;
}

btnPrev.addEventListener('click', () => goTo(activeCard-1));
btnNext.addEventListener('click', () => goTo(activeCard+1));
