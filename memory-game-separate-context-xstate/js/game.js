import './card';
import './player';


// TODO: https://statecharts.dev/how-to-use-statecharts.html
class Game {

    numOfPlayers;
    numOfCards;
    players;
    currentPlayerIndex;
    cards;
    selectedCards;

    shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }


    newGame = (numberOfPlayers, numberOfCards) => {
        this.numOfPlayers = numberOfPlayers;
        this.numOfCards = numberOfCards;
        this.#createCards(numberOfCards);
        this.#createPlayers(numberOfPlayers);
        this.selectedCards = [];
        this.currentPlayerIndex = 0;
        console.log('new game', this);
    }

    #createCards = (numberOfCards) => {
        this.cards = [];
        for(let i = 0; i < numberOfCards; i++) {
            this.cards.push({collected: false, card: new Card(i + '-1')});
            this.cards.push({collected: false, card: new Card(i + '-2')});
        }
        this.shuffleArray(this.cards);
    }

    #createPlayers = (numberOfPlayers) => {
        this.players = [];
        this.currentPlayerIndex = 0;
        for (let i = 0; i < numberOfPlayers; i++) {
            this.players.push(new Player(i));
        }
    }

    selectCard(ind) {
        if (this.cards[ind].collected || (this.selectedCards.length > 0 && this.selectedCards[0].index === ind)) return;
        
        this.selectedCards.push({index: ind, card: this.cards[ind].card});
        console.log('selected cards', this.selectedCards);

        if (this.selectedCards.length === 2) {
            this.#handleTwoCardsSelected();
        }
    }

    #handleTwoCardsSelected = () => {
        const cardId1 = this.selectedCards[0].card.id.split('-')[0];
        const cardId2 = this.selectedCards[1].card.id.split('-')[0];

        if (cardId1 === cardId2) {
            this.#pairFound();
            this.#checkGameOver();
        } else {
            this.#nextPlayer();
        }
        this.selectedCards = [];
    }

    #pairFound = () => {
        this.players[this.currentPlayerIndex].pairFound(this.selectedCards[0].card);
        for (const selectedCard of this.selectedCards) {
            this.cards[selectedCard.index].collected = true;
        }
    }

    #checkGameOver = () => {
        let i = 0; 
        let allCardsCollected = true;
        while (i < this.cards.length && allCardsCollected) {
            allCardsCollected = (this.cards[i].collected);
            ++i;
        }
        if (allCardsCollected) {
            console.log('game over', this.players);
            // this.newGame(this.numOfPlayers, this.numOfCards);

        }
    }

    #nextPlayer = () => {
        this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
    }

}


window.onload = () => {

    // let game = new Game();
    // game.newGame(2, 16);
    // console.log(game);
    
}
