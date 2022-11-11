const main = document.querySelector('main');
const selecModalHeader = document.querySelector('#selection-modal header');

function openModal(modal, isReward, index = 0) {
  modal.classList.remove('visually-hidden');
  main.classList.add('more-opaque');
  const rewardScrollValue =
    index === 0
      ? 150 + selecModalHeader.scrollHeight + innerCards[0].scrollHeight
      : 150 +
        selecModalHeader.scrollHeight +
        innerCards[0].scrollHeight +
        innerCards[1].scrollHeight;
  // 150 is default value that selection/thank u modals are offset from top of screen
  isReward
    ? window.scrollTo({
        top: rewardScrollValue,
        left: 0,
        behavior: 'smooth',
      })
    : window.scrollTo({ top: 150, left: 0, behavior: 'smooth' });
}

function closeModal(modal) {
  modal.classList.add('visually-hidden');
  main.classList.remove('more-opaque');
}

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

// Style selected cards in selection modal, open pledge boxes
const innerCards = document.querySelectorAll('#selection-modal div.inner-card');
const selecCardHeaders = document.querySelectorAll('div.inner-card>header');
const circleBtns = document.querySelectorAll('.circle-btn');
const pledgeBoxes = document.querySelectorAll('.pledge-box');
const circleBtnsFill = document.querySelectorAll('.circle-btn>div');
const isClicked = Array(selecCardHeaders.length).fill(false);

function styleSelectedCard(index) {
  innerCards[index].classList.add('inner-card-selected');
  circleBtns[index].classList.add('circle-btn-active');
  circleBtnsFill[index].classList.add('circle-btn-fill');
  pledgeBoxes[index].classList.remove('visually-hidden');
}

function unstyleSelectedCard(index) {
  innerCards[index].classList.remove('inner-card-selected');
  circleBtns[index].classList.remove('circle-btn-active');
  circleBtnsFill[index].classList.remove('circle-btn-fill');
  pledgeBoxes[index].classList.add('visually-hidden');
}

function removeAllOtherSelections(startIndex) {
  // Change state to false and unstyle all other cards in selection modal besides the one clicked
  for (let i = 0; i < isClicked.length; i++) {
    if (i !== startIndex) {
      isClicked[i] = false;
    }
  }
  for (let j = 0; j < innerCards.length; j++) {
    if (!innerCards[j].classList.contains('opaque') && j !== startIndex) {
      unstyleSelectedCard(j);
    }
  }
}

for (let i = 0; i < selecCardHeaders.length; i++) {
  // Only add event listner to cards not grayed out
  if (!innerCards[i].classList.contains('opaque')) {
    selecCardHeaders[i].addEventListener('click', () => {
      if (isClicked.includes(true)) {
        removeAllOtherSelections(i);
      }
      isClicked[i] ? unstyleSelectedCard(i) : styleSelectedCard(i);
      isClicked[i] = isClicked[i] ? false : true;
    });
  }
}

// Open/close/styles for selection modal
const backProjBtn = document.querySelector('#back-proj-btn');
const rewardBtns = document.querySelectorAll('#about button');
const selecModal = document.querySelector('#selection-modal');
const modalClose = document.querySelector('#close-modal');

backProjBtn.addEventListener('click', () => openModal(selecModal, false));

for (let i = 0; i < rewardBtns.length; i++) {
  rewardBtns[i].addEventListener('click', () => {
    // Pledge with no reward first card in selection modal so index needs to be shifted by 1
    removeAllOtherSelections(i + 1);
    styleSelectedCard(i + 1);
    isClicked[i + 1] = true;
    openModal(selecModal, true, i);
  });
}

modalClose.addEventListener('click', () => closeModal(selecModal));

// Update goals section, inventory, open/close thank you modal
const goalParas = document.querySelectorAll('#goals p');
const displayedFunds = goalParas[0].firstChild;
const displayedBackers = goalParas[1].firstChild;
const meter = document.querySelector('#goals meter');
const forms = document.querySelectorAll('#selection-modal form');
const pledgeFields = document.querySelectorAll('.pledge-field');
const thankUModal = document.querySelector('#thank-u-modal');
const gotItBtn = document.querySelector('#thank-u-modal button');
const aboutInventory = document.querySelectorAll('#about span.big-number');
// Each piece of inventory has two elements displaying the number of items left in the selection modal
const selecInventory = document.querySelectorAll(
  '#selection-modal span.big-number'
);
const inventory = { bamboo: 101, black: 64, mahogany: 0 };
const goalData = { funds: 89914, backers: 5007 };
// Need to add ability to gray out cards whose inventory is 0
function cleanInput(input) {
  return input.startsWith('$')
    ? input.substring(1).replaceAll(',', '')
    : input.substring(0).replaceAll(',', '');
}

function updateGoal(input) {
  // Update goalData
  goalData.funds += parseFloat(cleanInput(input));
  goalData.backers++;
  // Update goalUI
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

function updateSelecModalUI(index) {
  // close pledge-box, remove circle btn active, inner-card-selected, clear input field
  unstyleSelectedCard(index);
  isClicked[index] = false;
  pledgeFields[index].value = '';
}

function updateUI(event, index) {
  event.preventDefault();
  closeModal(selecModal);
  updateGoal(pledgeFields[index].value);
  updateInventoryUI(index);
  updateSelecModalUI(index);
  openModal(thankUModal, false);
}

for (let i = 0; i < forms.length; i++) {
  forms[i].addEventListener('submit', (event) => updateUI(event, i));
}

gotItBtn.addEventListener('click', () => closeModal(thankUModal));
