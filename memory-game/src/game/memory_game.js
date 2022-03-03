import { createMachine } from "xstate";


export const gameMachine = createMachine({
  id: "Memory game",
  context: {
    numberOfPlayers: 1,
    cards: [],
    players: []
  },
  initial: "waiting for game",
  states: {
    "waiting for game": {
      on: {
        "START GAME":[ 
          {
            cond: "validPlayerNumber",
            target: "#Memory game.game in progress",
          },
          {
            cond: "invalidPlayerNumber",
            target: "#Memory game.invalid player number",
          }
        ],
      },
    },
    "invalid player number": {
      after: {
        2000: "waiting for game"
      }
    },
    "game in progress": {
      initial: "no cards flipped",
      states: {
        "one card flipped": {
          on: {
            "FLIP CARD": {
              target: "#Memory game.game in progress.two cards flipped",
            },
          },
        },
        "two cards flipped": {
          after: {
            2000: {target: "no cards flipped"}
          }
        },
        "no cards flipped": {
          on: {
            "FLIP CARD": {
              target: "#Memory game.game in progress.one card flipped",
            },
          },
        },
      },
    },
  }
},
{
  guards: {
    validPlayerNumber: (context, event) => context.numberOfPlayers >= 2,
    invalidPlayerNumber: context => !context.validPlayerNumber
  }
});