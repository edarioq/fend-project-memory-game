/*
 * Data
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

function createIconSet(iconsArray) {
    var iconSet = new Array();

    for (var i = 0; i < iconsArray.length; i++) {
        iconSet.push(iconsArray[i]);
        iconSet.push(iconsArray[i]);
    }
    return iconSet;
}





/* 
 * Shuffle cards thanks to:
 * //stackoverflow.com/questions/20031629/how-to-shuffle-array-without-duplicate-elements-using-jquery
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
        cards.appendChild(list);
    }
}





/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

function gameWon() {
    var cards = document.getElementsByClassName('card');
    var matchingCards = new Array();
    var wrongCards = new Array();
    var cardsMatch = false;

    for (var i = 0; i < cards.length; i++) {
        
        cards[i].addEventListener('click', function() {

            matchingCards.push(this.children[0].className);
            this.classList.add('open', 'show');
            
            wrongCards.push(this);
            console.log(wrongCards);
            if (matchingCards.length === 2) {
                if (matchingCards[0] === matchingCards[1]) {
                    cardsMatch = true;
                    console.log('Match!');
                    if (cardsMatch === true) {
                        matchingCards.length = 0;
                        wrongCards.length = 0;
                    }
                } else {
                    cardsMatch = false;
                    console.log('No match!');
                    matchingCards.length = 0;
                    setTimeout(function() {
                        wrongCards[0].classList.remove('open', 'show');
                        wrongCards[1].classList.remove('open', 'show');
                        wrongCards.length = 0;
                    }, 500);
                    
                }
            } 

        });
        
    }
}

function restart() {

}

function init() {
    createCards();
    gameWon();
}

init();