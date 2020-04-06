

let slides = document.querySelectorAll('.slide');
let carousel = document.querySelector('.carousel');
let pauseButton = document.querySelector('#pause');
let next = document.querySelector('#next');
let previous = document.querySelector('#previous');
let sliderBtn = document.querySelector('.sliderBtn');
let indicatorsContainer = document.querySelector('.indicators');
let indicators = document.querySelectorAll('.indicator');

let currentSlide = 0;
let isPlaying = true;
let interval = 2500;
let slidesLenght = slides.length;
let swipeStartX = null;
let swipeEndX = null;
let timerID = null;

const LEFT_ARROW = 'ArrowLeft';
const RIGHT_ARROW = 'ArrowRight';
const SPACE = ' ';


sliderBtn.style.display = 'flex';
indicatorsContainer.style.display = 'flex';



let gotoSlide = (n) => {
  slides[currentSlide].classList.toggle('active');
  indicators[currentSlide].classList.toggle('active');
  currentSlide = (n + slides.length) % slides.length;
  slides[currentSlide].classList.toggle('active');
  indicators[currentSlide].classList.toggle('active');
};

let gotoNextSlide = () => {
  gotoSlide(currentSlide + 1);
};

let gotoPrevSlide = () => {
  gotoSlide(currentSlide - 1);
};

let pause = () => {
  if (isPlaying) {
    pauseButton.innerHTML = 'Play';
    isPlaying = !isPlaying;
    clearInterval(timerID);
  }
};

let play = () => {
  pauseButton.innerHTML = 'Pause';
  isPlaying = true;
  timerID = setInterval(gotoNextSlide, interval);
};

let clickPause = () => isPlaying ? pause() : play();

let clickNext = () => {
  pause();
  gotoNextSlide();
};

let clickPrev = () => {
  pause();
  gotoPrevSlide();
};

let clickIndicatorButton = (e) => {
  let target = e.target;
  if (target.classList.contains('indicator')) {
    pause();
    gotoSlide(+target.getAttribute('data-slide-to'));
  }
};

let pressKey = (e) => {
  if (e.key === LEFT_ARROW) clickPrev();
  if (e.key === RIGHT_ARROW) clickNext();
  if (e.key === SPACE) clickPause();
};

let swipeStart = (e) => {
  swipeStartX = e.changedTouches[0].pageX;
};

let swipeEnd = (e) => {
  swipeEndX = e.changedTouches[0].pageX;
  swipeStartX - swipeEndX < 150 && clickPrev();
  swipeStartX - swipeEndX > -50 && clickNext();
};


pauseButton.addEventListener('click', clickPause);
next.addEventListener('click', clickNext);
previous.addEventListener('click', clickPrev);
indicatorsContainer.addEventListener('click', clickIndicatorButton);
document.addEventListener('keydown', pressKey);
carousel.addEventListener('touchstart', swipeStart);
carousel.addEventListener('touchend', swipeEnd);


timerID = setInterval(gotoNextSlide, interval);


