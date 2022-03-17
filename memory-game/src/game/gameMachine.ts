import { assign, createMachine, spawn } from "xstate";
import { playerMachine } from "../player/playerMachine";
import { createCardMachine } from "./cardMachine";
import { CardActorRefType } from "./cardTypes";
import { GameContext, GameEvent, GameTypestate } from "./gameTypes";


export const gameMachine = createMachine<GameContext, GameEvent, GameTypestate>({
  id: "Memory game",
  context: {
    numberOfPlayers: 1,
    numberOfCards: 16,
    cards: [],
    players: [],
    firstFlippedCard: undefined
  },
  invoke: {
    id: 'playerActor',
    src: playerMachine
  },
  initial: "waiting for game",
  states: {
    "waiting for game": {
      on: {
        "START GAME":[ 
          { target: "game in progress" }
        ],
      },
    },
    "game in progress": {
      entry: 'initGame',
      initial: "no cards flipped",
      states: {
        "one card flipped": {
          on: {
            "FLIP CARD": {
              target: "two cards flipped",
            },
          },
        },
        "two cards flipped": {
          always: [
            {target: '#Memory game.game over', cond: 'allCardsCollected'},
            {target: 'no cards flipped'}
          ]
        },
        "no cards flipped": {
          on: {
            "FLIP CARD": {
              target: "one card flipped"
            },
          },
        },
      },
    },
    "game over": { }
  }
},
{
  actions: {
    initGame: (context, event) => {
      console.log('init');
      
      let newCards = [];
      const { cards } = context;
      const { numberOfCards } = context;
      for (let i = 0; i < numberOfCards / 2; i++) {
        const newCard1 = createCardMachine({id: i.toString() + "-1"});
        const newCard2 = createCardMachine({id: i.toString() + "-2"});
        newCards.push(newCard1);
        newCards.push(newCard2);
      }
      assign({
        cards: [
          ...cards,
          ...newCards.map(card => spawn(card) as CardActorRefType)
        ]
      });
      console.log('newcards', newCards);
      
    }
    // {
    //   for (let i = 0; i < 2; i+=2) {
    //     const newCard = createCardMachine({id: i.toString()});
    //     cards.push(spawn(newCard));
    //   }
    //   console.log('init game');
            
    // }
  },
  guards: {
    allCardsCollected: (context, event) => {
        return context.cards.length === 0;
    }
  },
  delays: {
    DEFAULT_DELAY: 2000
  }
});