// Open/close mobile menu
const navModal = document.querySelector('#nav-modal');
const hamMenu = document.querySelector('#ham-menu');
const navClose = document.querySelector('#ham-menu-close');

function showElem1HideElem2(element1, element2) {
  element1.classList.remove('visually-hidden');
  element2.classList.add('visually-hidden');
}

hamMenu.addEventListener('click', () => showElem1HideElem2(navModal, hamMenu));
navClose.addEventListener('click', () => showElem1HideElem2(hamMenu, navModal));

// Control active state for bookmark
const bkmk = document.querySelector('.bkmk');
let isBkMked = false;

bkmk.addEventListener('click', () => {
  isBkMked
    ? bkmk.classList.remove('bkmk-active')
    : bkmk.classList.add('bkmk-active');
  isBkMked = isBkMked ? false : true;
});

// Open/close/styles for selection modal
const backProjBtn = document.querySelector('#back-proj-btn');
const rewardBtns = document.querySelectorAll('#about button');
const selecModal = document.querySelector('#selection-modal');
const modalClose = document.querySelector('#close-modal');

backProjBtn.addEventListener('click', () =>
  selecModal.classList.remove('visually-hidden')
);

for (const btn of rewardBtns) {
  btn.addEventListener('click', () =>
    selecModal.classList.remove('visually-hidden')
  );
}

modalClose.addEventListener('click', () =>
  selecModal.classList.add('visually-hidden')
);

// Open pledge boxes
const innerCards = document.querySelectorAll('#selection-modal div.inner-card');
const selecCardHeaders = document.querySelectorAll('div.inner-card>header');
const circleBtns = document.querySelectorAll('.circle-btn');
const pledgeBoxes = document.querySelectorAll('.pledge-box');
const circleBtnsFill = document.querySelectorAll('.circle-btn>div');
const isClicked = [false, false, false];

for (let i = 0; i < selecCardHeaders.length - 1; i++) {
  selecCardHeaders[i].addEventListener('click', () => {
    if (isClicked[i]) {
      innerCards[i].classList.remove('inner-card-selected');
      circleBtns[i].classList.remove('circle-btn-active');
      circleBtnsFill[i].classList.remove('circle-btn-fill');
      pledgeBoxes[i].classList.add('visually-hidden');
    } else {
      innerCards[i].classList.add('inner-card-selected');
      circleBtns[i].classList.add('circle-btn-active');
      circleBtnsFill[i].classList.add('circle-btn-fill');
      pledgeBoxes[i].classList.remove('visually-hidden');
    }
    isClicked[i] = isClicked[i] ? false : true;
  });
}

// Update goals section, open/close thank you modal
const goalParas = document.querySelectorAll('#goals p');
const displayedFunds = goalParas[0].firstChild;
const displayedBackers = goalParas[1].firstChild;
const meter = document.querySelector('#goals meter');
const forms = document.querySelectorAll('#selection-modal form');
const pledgeFields = document.querySelectorAll('.pledge-field');
const thankUModal = document.querySelector('#thank-u-modal');
const gotItBtn = document.querySelector('#thank-u-modal button');
const aboutInventory = document.querySelectorAll('#about span.big-number');
// Each piece of inventory has two elements displaying the number left in the selection modal
const selecInventory = document.querySelectorAll(
  '#selection-modal span.big-number'
);
const inventory = { bamboo: 101, black: 64, mahogany: 0 };
const goalData = { funds: 89914, backers: 5007 };

function cleanInput(input) {
  return input.startsWith('$')
    ? input.substring(1).replaceAll(',', '')
    : input.substring(0).replaceAll(',', '');
}

function updateGoalData(input) {
  goalData.funds += parseFloat(cleanInput(input));
  goalData.backers++;
}

function updateGoalUI() {
  meter.value = goalData.funds;
  // Format goalData[0] into US currency format
  displayedFunds.textContent = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(goalData.funds);
  displayedBackers.textContent = goalData.backers;
}

function updateInventoryData(index) {
  switch (index) {
    case 1:
      inventory.bamboo--;
      break;
    case 2:
      inventory.black--;
      break;
    default:
      inventory.mahogany--;
  }
}

function updateInventoryUI(index) {
  // need to add grayed out classes for selection modal and about for items that reach 0
  if (index !== 0) {
    updateInventoryData(index);
    // selection modal has pledge with no reward first so must use index-1 to get right item
    aboutInventory[index - 1].textContent = Object.values(inventory)[index - 1];
    selecInventory[(index - 1) * 2].textContent =
      Object.values(inventory)[index - 1];
    selecInventory[(index - 1) * 2 + 1].textContent =
      Object.values(inventory)[index - 1];
  }
}

function updateUI(index) {
  showElem1HideElem2(thankUModal, selecModal);
  updateGoalData(pledgeFields[index].value);
  updateGoalUI();
  updateInventoryUI(index);
  pledgeFields[index].value = '';
}

for (let i = 0; i < forms.length; i++) {
  forms[i].addEventListener('submit', (event) => {
    event.preventDefault();
    updateUI(i);
    // close pledge-box, remove circle btn active, inner-card-selected
  });
}

gotItBtn.addEventListener('click', () => {
  thankUModal.classList.add('visually-hidden');
});
