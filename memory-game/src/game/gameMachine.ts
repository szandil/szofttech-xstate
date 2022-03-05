import { createMachine } from "xstate";
import { playerMachine } from "../player/playerMachine";


export const gameMachine = createMachine({
  tsTypes: {} as import("./gameMachine.typegen").Typegen0,
  id: "Memory game",
  context: {
    numberOfPlayers: 1,
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
            {target: ''}
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
    "game over": {

    }
  }
},
{
  delays: {
    DEFAULT_DELAY: 2000
  }
});