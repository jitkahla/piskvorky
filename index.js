//začíná kolečko
let plays = 'circle';

//funkce co vyplní políčko po kliknutí kolečkem, znepřístupní ho a zařídí, aby se dostal na řadu křížek nebo naopak
const blockFill = (event) => {
  event.target.classList.add(`field-${plays}`);
  event.target.disabled = true;
  if (plays === 'circle') {
    plays = 'cross';
  } else {
    plays = 'circle';
  }
  document.querySelector('.plays').src = `images/${plays}.svg`;
};

//vybírám všechny buttony v hracím poli a přidávám na ně eventlistener, který kliknutím spustí fci výše
const buttons = document.querySelectorAll('.field button');
for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', blockFill);
}
