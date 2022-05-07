//začíná kolečko
let plays = 'circle';
const playsImg = document.querySelector('.plays');
//fce vracející řetězec kolečko nebo křížek, podle toho kdo hraje - potřebuju použít víckrát
const playsCz = (plays) => {
  if (plays === 'circle') {
    return 'kolečko';
  } else {
    return 'křížek';
  }
};
// fce zobrazující confirm, pokud se potvrdí, načte se nová hra, pokud ne, zůstane dohraná hra a políčka se znepřístupní, aby nešlo ve hře pokračovat
const winConfirm = () => {
  if (confirm(`Vyhrává ${playsCz(plays)}! Spustit novou hru?`)) {
    location.reload();
  } else buttons.forEach((button) => (button.disabled = true));
};

//funkce co vyplní políčko po kliknutí kolečkem pomocí třídy, znepřístupní ho a zařídí, aby se dostal na řadu křížek nebo naopak, mění se img src a alt
const blockFill = (event) => {
  event.target.classList.add(`field-${plays}`);
  event.target.disabled = true;

  //volám fci, kontrolující výherní tah, pokud vrátí true, zavolám fci winConfirm se zpožděním, aby se nejdřív vykreslil symbol a pak zobrazil confirm

  if (winCheck(event.target)) {
    setTimeout(winConfirm, 500);
  }

  if (plays === 'circle') {
    plays = 'cross';
  } else {
    plays = 'circle';
  }
  playsImg.src = `images/${plays}.svg`;
  playsImg.alt = playsCz(plays);
};

//vybírám všechny buttony v hracím poli a přidávám na ně eventlistener, který kliknutím spustí fci výše
const buttons = document.querySelectorAll('.field button');
for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', blockFill);
  //přiřazuji buttonům indexy
  buttons[i].index = i;
}

//fce vracející objekt s číslem řádku a sloupce - index políčka převedu na string, tvořící dva znaky, první je řádek, druhý sloupec, ve výsledném objektu zase převedu na číslo

const getRowColumn = (element) => {
  let index = String(element.index).padStart(2, '0');
  const row = index.slice(0, 1);
  const column = index.slice(1);

  return { row: Number(row), column: Number(column) };
};

//fce opačná, bere parametry číslo řádku a sloupce, vrací index políčka
const getIndex = (row, column) => {
  const index = String(row) + String(column);
  return buttons[Number(index)];
};

//fce vracející true, pokud symbol na daném políčku souhlasí s tím, kdo teď hraje
const playsCheck = (element) => {
  if (element.className === `field-${plays}`) return true;
  return false;
};

//fce kontrolující výherní tah - řádek, sloupec, diagonály
const winCheck = (element) => {
  //proměnné, do kterých se bude ukládat počet políček s daným symbolem v řádku, sloupci, diagonále
  let rowMove = 1;
  let columnMove = 1;
  let crossLeftMove = 1;
  let crossRightMove = 1;

  const mustHave = 5; //počet políček/ tahů pro výhru

  const start = getRowColumn(element); //startovní pozice, fce vrátí její řádek a sloupec
  let ir = start.row; //číslo řádku startovní pozice
  let ic = start.column; //číslo sloupce startovní pozice

  //procházím řádek doprava, zastavím na konci řádku/sloupce nebo když v políčku (fce getIndex) není symbol toho, kdo právě hraje (fce playsCheck), počítám tahy / políčka (proměnná row/column/crossLeft/crossRightMove)

  while (ic !== 9 && playsCheck(getIndex(ir, ic + 1))) {
    ic++;
    rowMove++;

    //console.log(`počet ${plays} v řádku: ${rowMove}`);
  }

  //procházím řádek doleva
  ic = start.column;
  while (ic !== 0 && playsCheck(getIndex(ir, ic - 1))) {
    ic--;
    rowMove++;

    //console.log(`počet ${plays} v řádku: ${rowMove}`);
  }

  if (rowMove === mustHave) {
    return true;
  }

  //sloupec nahoru
  ic = start.column;
  while (ir !== 0 && playsCheck(getIndex(ir - 1, ic))) {
    ir--;
    columnMove++;

    //console.log(`počet ${plays} ve sloupci: ${columnMove}`);
  }
  //sloupec dolu
  ir = start.row;
  while (ir !== 9 && playsCheck(getIndex(ir + 1, ic))) {
    ir++;
    columnMove++;

    //console.log(`počet ${plays} ve sloupci: ${columnMove}`);
  }

  if (columnMove === mustHave) {
    return true;
  }

  //diagonála zleva nahoru
  ir = start.row;
  ic = start.column;
  while (ir !== 0 && ic !== 9 && playsCheck(getIndex(ir - 1, ic + 1))) {
    ir--;
    ic++;
    crossLeftMove++;

    //console.log(`počet ${plays} v diagonále zleva: ${crossLeftMove}`);
  }

  //diagonála zleva dolu
  ir = start.row;
  ic = start.column;
  while (ir !== 9 && ic !== 0 && playsCheck(getIndex(ir + 1, ic - 1))) {
    ir++;
    ic--;
    crossLeftMove++;

    //console.log(`počet ${plays} v diagonále zleva: ${crossLeftMove}`);
  }

  if (crossLeftMove === mustHave) {
    return true;
  }

  //diagonála zprava nahoru
  ir = start.row;
  ic = start.column;
  while (ir !== 0 && ic !== 0 && playsCheck(getIndex(ir - 1, ic - 1))) {
    ir--;
    ic--;
    crossRightMove++;

    //console.log(`počet ${plays} v diagonále zprava: ${crossRightMove}`);
  }

  //diagonála zprava dolu
  ir = start.row;
  ic = start.column;
  while (ir !== 9 && ic !== 9 && playsCheck(getIndex(ir + 1, ic + 1))) {
    ir++;
    ic++;
    crossRightMove++;

    //console.log(`počet ${plays} v diagonále zprava: ${crossRightMove}`);
  }

  if (crossRightMove === mustHave) {
    return true;
  }

  return false;
};
