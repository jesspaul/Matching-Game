var cardsArray = [
    {'name': 'cat1', 'img': '/images/cat1.jpg'},
    {'name': 'cat2', 'img': '/images/cat2.jpg'},
    {'name': 'cat3', 'img': '/images/cat3.jpg'},
    {'name': 'cat4', 'img': '/images/cat4.jpg'},
    {'name': 'cat5', 'img': '/images/cat5.jpg'},
    {'name': 'cat6', 'img': '/images/cat6.jpg'},
    {'name': 'cat7', 'img': '/images/cat7.png'},
    {'name': 'cat8', 'img': '/images/cat8.jpeg'},
    {'name': 'cat9', 'img': '/images/cat9.jpeg'},
    {'name': 'cat10', 'img': '/images/cat10.jpg'},
    {'name': 'cat11', 'img': '/images/cat11.png'},
    {'name': 'cat12', 'img': '/images/cat12.png'}
];

//double the cards to create matching pairs for each image
var gameGrid = cardsArray.concat(cardsArray);

//sort the cards in a random order
gameGrid.sort(function() {
    return 0.5 - Math.random();
})

//create game board elements
var game = document.getElementById('game-board');
var grid = document.createElement('section');
grid.setAttribute('class', 'grid');
game.appendChild(grid);

//fill game board with cards
for (let i = 0; i < gameGrid.length; i++) {
    let card = document.createElement('div');
    card.classList.add('card');
    card.dataset.name = gameGrid[i].name;

    let front = document.createElement('div');
    front.classList.add('front');

    let back = document.createElement('div');
    back.classList.add('back');
    back.style.backgroundImage = `url(${gameGrid[i].img})`;

    grid.appendChild(card);
    card.appendChild(front);
    card.appendChild(back);
}

let firstGuess = '';
let secondGuess = '';
let count = 0;
let previousTarget = null;
let delay = 1200;

//identify when a match pair is found
let match = function() {
    let selected = document.querySelectorAll('.selected');
    for (let i = 0; i < selected.length; i++) {
        selected[i].classList.add('match');
    }
}

//if selected pair is not a match, reset guesses to try again
let resetGuesses = function() {
    firstGuess = '';
    secondGuess = '';
    count = 0;
    previousTarget = null;

    let selected = document.querySelectorAll('.selected');
    for (let i = 0; i < selected.length; i++) {
        selected[i].classList.remove('selected');
    }
}

//add click functionality to select only two cards at a time
grid.addEventListener('click', function(event) {
    let clicked = event.target;
    if (clicked.nodeName === 'SECTION' || clicked === previousTarget || clicked.parentNode.classList.contains('match') || clicked.parentNode.classList.contains('selected')) {
        return;
    }
    if (count < 2) {
        count++;

        if (count === 1) {
            firstGuess = clicked.parentNode.dataset.name;
            clicked.parentNode.classList.add('selected');
        }
        else {
            secondGuess = clicked.parentNode.dataset.name;
            clicked.parentNode.classList.add('selected');
        }
    }
    if (firstGuess !== '' && secondGuess !== '') {
        if (firstGuess === secondGuess) {
            setTimeout(match, delay);
            setTimeout(resetGuesses, delay);
        } else {
            setTimeout(resetGuesses, delay);
        }
    }
    previousTarget = clicked;
})