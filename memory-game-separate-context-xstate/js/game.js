
// import { interpret } from "xstate";
const { interpret, withConfig } = XState;
import { gameMachine } from "../state-machine/game-machine.js";
import { Card } from "./card.js";
import { Player } from "./player.js";
import * as components from "./components.js";

// TODO: https://statecharts.dev/how-to-use-statecharts.html
const imageSets = ['animals', 'food', 'space', 'toys'];

export class Game {

    numOfPlayers;
    numOfCards;
    players;
    currentPlayerIndex;
    cards;
    selectedCards;
    imageSet;

    shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }


    newGame = (numberOfPlayers, numberOfCards) => {
        this.imageSet = imageSets[Math.floor(Math.random() * imageSets.length)];
        this.numOfPlayers = numberOfPlayers;
        this.numOfCards = numberOfCards;
        this.#createCards(numberOfCards);
        this.#createPlayers(numberOfPlayers);
        this.selectedCards = [];
        this.currentPlayerIndex = 0;
    }

    #createCards = (numberOfCards) => {
        this.cards = [];
        for(let i = 0; i < numberOfCards; i++) {
            this.cards.push({collected: false, card: new Card(i, i + '-1', this.imageSet)});
            this.cards.push({collected: false, card: new Card(i, i + '-2', this.imageSet)});
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
        this.selectedCards.push({index: ind, card: this.cards[ind].card});
        console.log('selected cards', this.selectedCards);
    }

    checkPairFound = () => {
        if (this.selectedCards.length < 2) return false;
        const cardId1 = this.selectedCards[0].card.id.split('-')[0];
        const cardId2 = this.selectedCards[1].card.id.split('-')[0];
        
        return cardId1 === cardId2;
    }

    collectPair = () => {
        this.players[this.currentPlayerIndex].pairFound(this.selectedCards[0].card);
        for (const selectedCard of this.selectedCards) {
            this.cards[selectedCard.index].collected = true;
        }
        gameService.send('PAIR_COLLECTED');
    }

    resetFlippedCards = () => {
        this.selectedCards = [];
    }

    checkGameOver = () => {
        let i = 0; 
        let allCardsCollected = this.cards.reduce((result, card) => result && card.collected, true);

        console.log('checkgameover: ', allCardsCollected);
        return allCardsCollected;
    }

    nextPlayer = () => {
        this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
    }

}

const game = new Game();
const waitingElement = document.getElementById('waiting');
const gameInProgressElement = document.getElementById('gameInProgress');

const gameMachineWithConfig = gameMachine.withConfig({
    actions: {
        initGame: (context, event) => {
            console.log('init game action');
            console.log(context, event);
            game.newGame(2, 3);     // TODO
            console.log('game after init', game);
        },
        onExitWaitingForGame: (context, event) => {
            waitingElement.innerHTML = '';
        },
        redrawCards: (context, event) => {
            gameInProgressElement.innerHTML = components.gameInProgress(game.cards, game.selectedCards);
            game.cards.forEach((card, ind) => {
                document.getElementById(ind).onclick = () => gameService.send({type: 'FLIP', cardIndex: ind});
            })
        },
        flipSelectedCard: (context, event) => {
            console.log('flip action', event.cardIndex);
            game.selectCard(event.cardIndex);
            components.cardElements[event.cardIndex].isFrontVisible = true;
            console.log('flip action, game', game);
        },
        collectPair: (context, event) => {
            console.log('collect pair action');
            game.collectPair();
        },
        resetFlippedCards: (context, event) => {
            console.log("reset cards action");
            for (const selectedCard of game.selectedCards) {
                components.cardElements[selectedCard.index].isFrontVisible = false;
            }
            game.resetFlippedCards();
        },
        nextPlayer: (context, event) => {
            console.log('next player action');
            game.nextPlayer();
        },
        setUpGameOver: (context, event) => {
            console.log('game over');
        }
    },
    guards: {
        cardIsFlippable: (context, event) => {
            const ind = event.cardIndex;
            const result = 
                !(game.cards[ind].collected ||                                              // already collected card
                (game.selectedCards.length > 0 && game.selectedCards[0].index === ind));    // currently visible card

            console.log('flippable guard result: ', result);
            return result;
        },
        pairFound: (context, event) => {
            console.log('pair found guard, game: ', game);
            return game.checkPairFound();
        },
        allCardsCollected: (context, event) => {
            console.log('\n---  all cards collected guard --- \n\n');
            game.checkGameOver();
        }
    }
});


export const gameService = interpret(gameMachineWithConfig);
gameService.onTransition((state, event) => {
    console.log('on transition - event', event);
    console.log('on transition - state', state.value);
});
gameService.start();

window.onload = () => {


    gameService.onTransition((state, event) => {
        console.log('on transition - event', event);
        console.log('on transition - state', state.value);
    });
    gameService.start();

    console.log(gameMachineWithConfig.initialState.value);
    console.log(gameService.initialState.value);


    // console.log('\n-- start --\n\n');
    // gameService.send('START_NEW_GAME');
    // console.log('state after "start new game"', gameService.state.value);

    waitingElement.innerHTML = components.waiting(gameService);
    document.getElementById('startBtn').onclick = () => gameService.send('START_NEW_GAME');
    gameInProgressElement.innerHTML = '';// components.gameInProgress(game.cards);
    
    // console.log('\n-- 1. flip --');
    // console.log('state', gameService.state.value);
    // gameService.send({type: 'FLIP', cardIndex: 0});
    // console.log('2. flip');
    // console.log('state', gameService.state.value);
    // gameService.send({type: 'FLIP', cardIndex: 0});
    // gameService.send({type: 'FLIP', cardIndex: 1});

    // console.log('game: ', game);
}
