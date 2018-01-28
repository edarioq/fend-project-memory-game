/*
 * Create a list that holds all of your cards
 */
var createIconSet = [];
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
for (let i = 0; i < icons.length; i++) {
    createIconSet.push(icons[i]);
    createIconSet.push(icons[i]);
}
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 *   - shuffle function from http://stackoverflow.com/a/2450976
 */
function shuffle(arr) {
    var currentIndex = arr.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = createIconSet[currentIndex];
        arr[currentIndex] = arr[randomIndex];
        arr[randomIndex] = temporaryValue;
    }
    return arr;
}

function createCards() {
    var cards = document.getElementById('cards');
    shuffle(createIconSet);
    for (var i = 0; i < createIconSet.length; i++) {  
        var list = document.createElement('li');
        list.classList.add('card');
        list.innerHTML = shuffle(createIconSet)[i];
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
    var cardsMatch = false;
    for (var i = 0; i < cards.length; i++) {
        cards[i].addEventListener('click', function() {
            matchingCards.push(this.children[0].className);
            this.classList.add('open', 'show');
            if (matchingCards.length === 2) {
                if (matchingCards[0] === matchingCards[1]) {
                    cardsMatch = true;
                    console.log('Match!');
                    if (cardsMatch === true) {
                        matchingCards.length = 0;
                    }
                } else {
                    console.log('No match!');
                    matchingCards.length = 0;
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