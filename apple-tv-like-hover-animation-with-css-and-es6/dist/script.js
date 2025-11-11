const card = document.querySelector('.card');
const cardWidth = card.offsetWidth;
const cardHeight = card.offsetHeight;
const rotationLimit = 6;
const middleX = cardWidth / 2;
const middleY = cardHeight / 2;

function addRotation() {
  this.classList.add('transition');
  this.firstElementChild.classList.add('transition');
  setTimeout(() => {
    this.classList.remove('transition');
    this.firstElementChild.classList.remove('transition');
  }, 250);
}

function animateRotation(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  const rotateX = (x - middleX) * (rotationLimit / middleX);
  const rotateY = (middleY - y) * (rotationLimit / middleY);
  this.style.transform = `rotateX(${rotateY}deg) rotateY(${rotateX}deg)`;
  this.firstElementChild.style.top = `-${rotateY * 50}px`;
  this.firstElementChild.style.right = `${rotateX * 50}px`;
}

function removeRotation() {
  this.classList.add('transition');
  this.firstElementChild.classList.add('transition');
  setTimeout(() => {
    this.removeAttribute('style');
    this.firstElementChild.removeAttribute('style');
  }, 250);
  setTimeout(() => {
    this.classList.remove('transition');
    this.firstElementChild.classList.remove('transition');
  }, 500);
}

card.addEventListener('mouseenter', addRotation);
card.addEventListener('mousemove', animateRotation);
card.addEventListener('mouseleave', removeRotation);