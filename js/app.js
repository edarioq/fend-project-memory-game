/*
 * Globals
 */

var icons = [
    '<i class="fa fa-windows" aria-hidden="true"></i>',
    '<i class="fa fa-youtube" aria-hidden="true"></i>',
    '<i class="fa fa-twitter" aria-hidden="true"></i>',
    '<i class="fa fa-slack" aria-hidden="true"></i>',
    '<i class="fa fa-whatsapp" aria-hidden="true"></i>',
    '<i class="fa fa-google" aria-hidden="true"></i>',
    '<i class="fa fa-apple" aria-hidden="true"></i>',
    '<i class="fa fa-linux" aria-hidden="true"></i>'     
];

var matchedCardsList = new Array();
var gg = false;

function createIconSet(iconsArray) {
    var iconSet = new Array();

    for (var i = 0; i < iconsArray.length; i++) {
        iconSet.push(iconsArray[i]);
        iconSet.push(iconsArray[i]);
    }
    return iconSet;
}


/*
 * Board functionality
 */
function shuffle(arr) {
    for (var j, x, i = arr.length; i; j = parseInt(Math.random() * i), x = arr[--i], arr[i] = arr[j], arr[j] = x);
    return arr;
}

function createCards() {
    var cards = document.getElementById('cards');
    var iconSet = createIconSet(icons);    
    var shuffledIcons = shuffle(iconSet);

    for (var i = 0; i < shuffledIcons.length; i++) {  
        var list = document.createElement('li');
        list.classList.add('card');
        list.innerHTML = shuffledIcons[i];
        list.classList.add('show'); // Remove
        cards.appendChild(list);
    }
}

function checkIfCardsMatched() {
    var cards = document.getElementsByClassName('card');
    var matchingCards = new Array();
    var wrongCards = new Array();
    var cardsMatch = false;

    for (var i = 0; i < cards.length; i++) {
        
        cards[i].addEventListener('click', function() {

            matchingCards.push(this.children[0].className);
            wrongCards.push(this);
            this.classList.add('open', 'show');

            if (matchingCards.length === 2) {
                if (matchingCards[0] === matchingCards[1]) {
                    cardsMatch = true;

                    if (cardsMatch) {
                        matchedCardsList.push(matchingCards[0]);
                        matchedCardsList.push(matchingCards[1]);
                        matchingCards.length = 0;
                        wrongCards.length = 0;
                    }

                } else {
                    cardsMatch = false;
                    matchingCards.length = 0;

                    setTimeout(function() {
                        wrongCards[0].classList.remove('open', 'show');
                        wrongCards[1].classList.remove('open', 'show');
                        wrongCards.length = 0;
                    }, 500);
                    
                }
            } 
            checkIfGameIsWon();
        });
        
    }
}


/*
 * Core functionality
 */

function checkIfGameIsWon() {
    var allCards = icons.length * 2;
    if (matchedCardsList.length === allCards) {
        gg = true;
        gameOver();
        console.log('GAME OVER!');
    }
}

function gameOver() {
    if (gg === true) {
        document.getElementsByTagName('body')[0].classList.add('overlay');
        document.getElementsByClassName('game-won')[0].classList.remove('hidden');
    } else {
        document.getElementsByTagName('body')[0].classList.remove('overlay');
        document.getElementsByClassName('game-won')[0].classList.add('hidden');
    }
    
}


/*
 * Go!
 */
function init() {
    document.getElementById('cards').innerHTML = '';
    createCards();
    checkIfCardsMatched();
}

init();