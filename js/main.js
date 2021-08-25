const root = document.documentElement;
const containerCardsElement = document.querySelector('.cards-container');
const printBtn = document.getElementById('print-btn');
const numberOfCards = document.getElementById('numbers-of-cards');
const sortBtn = document.getElementById('sort-btn');
const logSort = document.getElementById('sort-log');

// Var for functionality
let arrayCards = [];
let sorted = false;

// Listeners
numberOfCards.addEventListener('change', resetArrayCards);
printBtn.addEventListener('click', generateCards);
sortBtn.addEventListener('click', sortElements);


// functions

function generateCards() {

    resetArrayCards();
    logSort.innerHTML = "";
    if (numberOfCards.value < 1) {
        numberOfCards.value = "";
    } else if (numberOfCards.value > 30) {
        numberOfCards.value = 30;
    }
    for (let i = 0 ; i < numberOfCards.value; i ++) {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        const [pinta, content, value, valuePinta] = randomElements();
        cardElement.innerHTML = content;
        cardElement.classList.add(pinta);
        
        arrayCards.push({ cardElement, value, valuePinta});
    }
    printCards();
}

function printCards() {
    containerCardsElement.innerHTML = "";
    arrayCards.forEach((cardObj) => {
        containerCardsElement.appendChild(cardObj.cardElement);
    });
}

function resetArrayCards() {
    sorted = false;
    arrayCards = [];
}

function randomElements() {
    const arrayValue = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    const arrayPinta = [ 'clubs', 'spades', 'diamonds', 'hearts'];
    
    const randomPinta = arrayPinta[Math.floor(Math.random() * arrayPinta.length)]
    const randomValue = arrayValue[Math.floor(Math.random() * arrayValue.length)];
    const valueCard = arrayValue.indexOf(randomValue);
    const valuePinta = arrayPinta.indexOf(randomPinta);
    return [randomPinta, randomValue, valueCard, valuePinta];
}

function sortElements() {
    if (!sorted && numberOfCards.value) {
        logSort.innerHTML = "";
        selectionSortCards();
        sorted = true;
    }
}


function selectionSortCards() {
    let counter = 0;
    printSortedStep(counter);
    for (let i = 0; i < arrayCards.length - 1; i++) {
        let lowestValueIndex = i;
        for (let j = i + 1; j < arrayCards.length; j++) {
            if (arrayCards[j].value < arrayCards[lowestValueIndex].value) {
                lowestValueIndex = j;
            }
        }
        if (lowestValueIndex !== i) {
            let aux = arrayCards[j];
            arrayCards[j] = arrayCards[i];
            arrayCards[i] = aux;
            counter++;
            printSortedStep(counter);
        }
    }
}

function printSortedStep(paso) {
    const newArray = arrayCards.map(objCard => {
        const cloneCard = objCard.cardElement.cloneNode(true);
        return cloneCard;
    });
    const sortStep = document.createElement('div');
    const h1Log = document.createElement('h1');
    sortStep.classList.add('flex-log');
    const titleSort = document.createTextNode(`${paso}`);
    h1Log.classList.add('log-text');
    h1Log.appendChild(titleSort);
    sortStep.appendChild(h1Log);
    newArray.forEach((card) => {
        sortStep.appendChild(card);
    });
    logSort.appendChild(sortStep);
}