const htmlCollectionOfCards = document.getElementsByClassName("card");
const arrayOfCards = Array.from(htmlCollectionOfCards);
const htmlCollectionOfStars = document.getElementsByClassName("fa-star");
const arrayOfStars = Array.from(htmlCollectionOfStars);
const deck = document.querySelector(".deck");
const restart = document.querySelector(".restart");
const modal = document.getElementsByClassName('modal')[0];
const modalContent = document.getElementsByClassName('modal-content')[0];
let listOfOpenCards = [];
let counter = 0;
let moves = 0;
let stars = 3;
let seconds = 0;
let intervalID;

// Shuffle function from http://stackoverflow.com/a/2450976
const shuffle = (array) => {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

const shuffleAndAppendToDeck = () => {
    shuffle(arrayOfCards);

    arrayOfCards.forEach(card => {
        deck.appendChild(card);
    });
}

shuffleAndAppendToDeck();

const checkForWin = () => {
    if (counter == 8) {
        openModal();
        handleRestartGame();
    }
}

const starsCounter =() => {
    if (moves > 15) {
        htmlCollectionOfStars[1].classList.add('cover');
        htmlCollectionOfStars[2].classList.add('cover');
        stars  = 1;
    } else if (moves > 12) {
        htmlCollectionOfStars[2].classList.add('cover');
        stars = 2;
    }
}

const moveCounter = () => {
    moves++;
    document.querySelector('.moves').innerHTML = moves;
    starsCounter();
}

const checkForMatch = () => {
    const firstCard = listOfOpenCards[0];
    const secondCard = listOfOpenCards[1];
    moveCounter();

    if (firstCard.innerHTML === secondCard.innerHTML) {
        firstCard.classList.add('match');
        secondCard.classList.add('match');
        counter++;
        setTimeout(checkForWin, 1000);
    } else {
        firstCard.classList.add('unmatch');
        secondCard.classList.add('unmatch');
        setTimeout(() => {
            firstCard.classList.remove('open', 'show', 'unmatch');
            secondCard.classList.remove('open', 'show', 'unmatch');
        }, 500);
    }
    listOfOpenCards = [];
}

const addOpenCardsToList = (evt) => {
    listOfOpenCards.push(evt.target);
    console.log(listOfOpenCards);

    if (listOfOpenCards.length == 2) {
        checkForMatch(evt);
    }
}

const isAlreadyOpen = (evt) => {
    return evt.target.classList.contains('open', 'show');
}

const isADeck = (evt) => {
    return evt.target.classList.contains('deck');
}


const handleClick = (evt) => {
    if (!isAlreadyOpen(evt) && !isADeck(evt)) {
        handleTimer();
        evt.target.classList.add('open', 'show');
        addOpenCardsToList(evt);
    }
}

const handleTimer = () => {
    if(intervalID === undefined) {
        intervalID = setInterval(
            () => {
                seconds = seconds + 1;
                setTimer();
            }, 1000);
    }
}

const setTimer = () => {
    let timePassed = document.getElementById("timePassed");
    timePassed.innerHTML = seconds.toString();
}

const openModal = () => {
    modal.style.display = "block";
    const firstSpan = document.createElement('span');
    const span = document.createElement('span');
    const button = document.createElement('button');
    firstSpan.textContent = 'Congratulation! You won!';
    firstSpan.classList.add('first-span');
    span.classList.add('span');
    modalContent.appendChild(firstSpan);
    span.textContent = `With ${moves} moves and ${stars} stars in ${seconds} seconds.`;
    modalContent.appendChild(span);
    button.textContent = 'Play again!';
    button.classList.add('button');
    modalContent.appendChild(button);
    button.addEventListener('click', () => {
        modal.style.display = 'none';
        modalContent.innerHTML = "";
        seconds = 0;
        setTimer();
    })
}

const handleRestartGame = () => {
    arrayOfCards.forEach(card => {
         card.classList.remove('open', 'show', 'match');
    })
    arrayOfStars.forEach(star => {
        star.classList.remove('cover');
    })
    document.querySelector('.moves').innerHTML = 0;
    moves = 0;
    counter = 0;
    stars = 3;
    listOfOpenCards = [];
    shuffleAndAppendToDeck();
    seconds = 0;
    setTimer();
    clearInterval(intervalID);
    intervalID = undefined;
}

deck.addEventListener('click', handleClick);
restart.addEventListener('click', handleRestartGame);









