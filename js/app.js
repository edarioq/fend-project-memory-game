/*
 * Create a list that holds all of your cards
 */
var icons = [
    '<i class="fa fa-diamond"></i>',
    '<i class="fa fa-paper-plane-o"></i>',
    '<i class="fa fa-anchor"></i>',
    '<i class="fa fa-bolt"></i>',
    '<i class="fa fa-cube"></i>',
    '<i class="fa fa-anchor"></i>',
    '<i class="fa fa-bicycle"></i>',
    '<i class="fa fa-bomb"></i>'     
];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 *   - shuffle function from http://stackoverflow.com/a/2450976
 */
function shuffle(icons) {
    var currentIndex = icons.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = icons[currentIndex];
        icons[currentIndex] = icons[randomIndex];
        icons[randomIndex] = temporaryValue;
    }
    console.log(icons);
    
    return icons;
}

function createCards() {
    var cards = document.getElementById('cards');
    shuffle(icons);
    for (var i = 0; i < icons.length; i++) {
        
        var list = document.createElement('li');
        list.classList.add('card');
        console.log(list);
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

    for (var i = 0; i < cards.length; i++) {
        cards[i].addEventListener('click', function() {
            matchingCards.push(this.children[0].className);
            console.log(matchingCards);
            if (matchingCards.length === 2) {
                if (matchingCards[0] === matchingCards[1]) {
                    console.log('Win!');
                } else {
                    matchingCards.length = 0;
                }
            } 
        });
        
    }
}

function restart() {

}

function init() {
    gameWon();
    createCards();
}

init();