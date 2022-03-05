import { createMachine } from "xstate";
import { DEFAULT_DELAY } from "../common/common_config";

// TODO: delay
const _delay = DEFAULT_DELAY;

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
              target: "game in progress",
            },
            {
              target: "invalid player number",
            }
          ],
        },
      },
      "invalid player number": {
        after: {
            _delay: "waiting for game"
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
                _delay: {target: "no cards flipped"}
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
      validPlayerNumber: (context, event) => context.numberOfPlayers >= 2
    },
    delays: {
        _delay
    }
  }
  );