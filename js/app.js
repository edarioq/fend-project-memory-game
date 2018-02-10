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
        // Uncomment for debugging purposes
        list.classList.add('show');
        cards.appendChild(list);
    }
    gameTimer();
}

function checkIfCardsMatched() {
    var cards = document.getElementsByClassName('card');
    var savedFlippedCards = new Array();
    var resetFlippedCards = new Array();
    var matchedCards = new Array();
    var cardsDidMatch = false;

    for (var i = 0; i < cards.length; i++) {

        cards[i].addEventListener('click', function () {     
            
            this.classList.add('open', 'show');
            
            matchedCards.push(this);
            savedFlippedCards.push(this.children[0].className);
            resetFlippedCards.push(this);

            if (savedFlippedCards.length === 2) {

                if (savedFlippedCards[0] === savedFlippedCards[1]) {
                    cardsDidMatch = true;
                    
                    setTimeout(function() {
                        matchedCards[0].classList.add('match');
                        matchedCards[1].classList.add('match');
                    }, 300);

                    if (cardsDidMatch) {
                        matchedCardsList.push(savedFlippedCards[0]);
                        matchedCardsList.push(savedFlippedCards[1]);
                        setTimeout(function() {
                            savedFlippedCards.length = 0;
                            resetFlippedCards.length = 0;
                            matchedCards.length = 0;
                        }, 500);
                        
                    }

                } else {
                    cardsDidMatch = false;
                    savedFlippedCards.length = 0;

                    setTimeout(function () {
                        resetFlippedCards[0].classList.remove('open', 'show');
                        resetFlippedCards[1].classList.remove('open', 'show');
                        resetFlippedCards.length = 0;
                    }, 1000);

                }

/*                 for (var j = 0; j < cards.length; j++) {
                    if (!cards[j].classList.contains('open', 'show')) {
                        cards[j].classList.add('disabled');
                    }
                } */

            } else {

            }
            checkIfGameIsWon();
        });

    }
}


function disableCards() {
    var cards = document.getElementsByClassName('card');
    console.log('disableCards: ', cards);
    
    for (var i = 0; i < cards.length; i++) {
        if (!cards[i].classList.contains('open', 'show')) {
            cards[i].classList.add('');
        }
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
    var body = document.getElementsByTagName('body')[0];
    var gameWonModal = document.getElementsByClassName('game-won')[0];
    if (gg === true) {
        body.classList.add('overlay');
        gameWonModal.classList.remove('hidden');
    } else {
        body.classList.remove('overlay');
        gameWonModal.classList.add('hidden');
    }

}

function gameTimer() {
    var totalSeconds = 0;
    var mins = document.getElementById("minutes");
    var secs = document.getElementById("seconds");

    function pad(val) {
        var valString = val + "";
        if (valString.length < 2) {
            return "0" + valString;
        } else {
            return valString;
        }
    }

    function setTime() {
        totalSeconds++;
        secs.innerHTML = pad(totalSeconds % 60);
        mins.innerHTML = pad(parseInt(totalSeconds / 60));
    }

    setInterval(setTime, 1000);
}

/*
 * Go!
 */
function init() {
    gg = false;
    document.getElementById('cards').innerHTML = '';
    gameOver();
    createCards();
    checkIfCardsMatched();
}

init();