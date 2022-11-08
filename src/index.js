// Open/close mobile menu
const navModal = document.querySelector('#nav-modal');
const hamMenu = document.querySelector('#ham-menu');
const hamMenuClose = document.querySelector('#ham-menu-close');

hamMenu.addEventListener('click', () => {
  navModal.classList.remove('visually-hidden');
  hamMenu.classList.add('visually-hidden');
});

hamMenuClose.addEventListener('click', () => {
  navModal.classList.add('visually-hidden');
  hamMenu.classList.remove('visually-hidden');
});

// Control active state for bookmark
const bkmk = document.querySelector('#bkmk');
const bkmkCircle = document.querySelector('#bkmk-circle');
const bkmkPath = document.querySelector('#bkmk-path');
let isBkMked = false;

bkmk.addEventListener('click', () => {
  if (isBkMked) {
    bkmkCircle.setAttribute('fill', '#2F2F2F');
    bkmkPath.setAttribute('fill', '#B1B1B1');
  } else {
    bkmkCircle.setAttribute('fill', 'hsl(176, 72%, 28%)');
    bkmkPath.setAttribute('fill', '#FFFFFF');
  }
  isBkMked = isBkMked ? false : true;
});

// Open/close/styles for selection modal
const backProjBtn = document.querySelector('#back-proj-btn');
const selecModal = document.querySelector('#selection-modal');
const modalClose = document.querySelector('#close-modal');

backProjBtn.addEventListener('click', () => {
  selecModal.setAttribute('style', 'display: block');
});

modalClose.addEventListener('click', () => {
  selecModal.setAttribute('style', '');
});

// Open pledge boxes
const innerCards = document.querySelectorAll(
  '#selection-modal div.card.inner-card'
);
const selecCardHeaders = document.querySelectorAll('div.inner-card>header');
const circleBtns = document.querySelectorAll('.circle-btn');
const pledgeBoxes = document.querySelectorAll('.pledge-box');
const circleBtnsFill = document.querySelectorAll('.circle-btn>div');
const isClicked = [false, false, false];

for (let i = 0; i < circleBtns.length - 1; i++) {
  selecCardHeaders[i].addEventListener('click', () => {
    if (isClicked[i]) {
      innerCards[i].setAttribute('class', 'card inner-card');
      circleBtns[i].setAttribute('class', 'circle-btn');
      circleBtnsFill[i].setAttribute('class', '');
      pledgeBoxes[i].setAttribute('class', 'pledge-box visually-hidden');
    } else {
      innerCards[i].setAttribute('class', 'card inner-card-selected');
      circleBtns[i].setAttribute('class', 'circle-btn circle-btn-active');
      circleBtnsFill[i].setAttribute('class', 'circle-btn-fill');
      pledgeBoxes[i].setAttribute('class', 'pledge-box');
    }
    isClicked[i] = isClicked[i] ? false : true;
  });
}

// Open/close thank you modal
const thankUModal = document.querySelector('#thank-u-modal');
const contBtns = document.querySelectorAll('div.pledge-box button');
const gotItBtn = document.querySelector('#thank-u-modal button');

for (let i = 0; i < contBtns.length; i++) {
  contBtns[i].addEventListener('click', () => {
    selecModal.setAttribute('style', '');
    thankUModal.setAttribute('style', 'display: block');
  });
}

gotItBtn.addEventListener('click', () => {
  thankUModal.setAttribute('style', '');
});
