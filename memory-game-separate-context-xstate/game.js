class Card {
    id;
    frontImage;

    constructor(id) {
        this.id = id;
    }
};

class Player {
    id;
    collectedCards;

    constructor(id) {
        this.id = id;
    }
};

class Game {

    players;
    currentPlayerIndex;
    cards;


    newGame = (numberOfPlayers, numberOfCards) => {
        this.#createCards(numberOfCards);
        this.#createPlayers(numberOfPlayers);
    }

    #createCards = (numberOfCards) => {
        this.cards = [];
        for(let i = 0; i < numberOfCards; i++) {
            this.cards.push(new Card(i + '-1'));
            this.cards.push(new Card(i + '-2'));
        }
    }

    #createPlayers = (numberOfPlayers) => {
        this.players = [];
        this.currentPlayerIndex = 0;
        for (let i = 0; i < numberOfPlayers; i++) {
            this.players.push(new Player(i));
        }
    }

    nextPlayer = () => {
        this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
    }

}


window.onload = () => {

    console.log('aaa');
    
}

const game = new Game();
