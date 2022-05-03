const { createMachine } = require("xstate");

const gameMachine = 
/** @xstate-layout N4IgpgJg5mDOIC5RQIYFswDoDuKCWALngHZQAEAZgPYBOZqGAxAMoAqAggEqsD6AcgFEA6jwDi7ALIDEoAA5VYhPFWIyQAD0QBaAIwBmACyYAHACYA7AAZjO8+b0Xj1gDQgAnttMBWHZi9eATgA2IIMfYwC9IONzAF9Y1wYsYioyAGMUGghYSgAbPFlZSEYAMQAZAEkABTV5RSIVNU0Eb18InRC9Jy7jAwNjVw8ELVa-QKCvQyCdXr09eMT0LBUwdMyIPIKiiFLKmqQQOqVGg+bJ4xNzIMsbq-N+0wH3Tx8x4MmDadnDBZAkzAI2FSGSyOQo+UKxVqCmOqlOiDClj8Bki-gCVi8Bks5kG2n0ekweiu4X62Ms-iCv3+aSouVyYDSRFIZFk+BojGh9WUcNAzV0liMphu+ixOkCAT6XlxCD0AUw5lMAWMNll5h0AXVlISfyWmCSZCoADcwOy2FxeIIROIpJzYU08Tc-LLZV4gkLsaYLNLdIZ5ZYHJ0ggFgiFjPFtSkIHA1P9cEpmdQ6ElbQ0eRptHMgiYvMY9JZ3gF8zpvd5zG8JgYpgYdNYqbqUmtQZtIRAU9z7QhXu1Q56ggr1aYS14y2iK1Wa2Htf8Vo2NuCtpA2ydeYg5mXTHpJujlR0g3YhyPxldPuTt3Ep7rAcD1mCIdsl2nmtMCX2AoFPkLqwYS33MKfoqYKK2LKk6LBgmA0nSDJMuQrJ4DQD4duqFxWF+hbYg8b7evocoxBMpj6OYrqTNEdbgfqRomoh8LDKYv7BhYQaWG6GozNh-omEq3gGBuRI3L0ZFgNRK7DFESLGDmeYFkW3qGEi-5vv6ExiuGsRAA */
createMachine({
  initial: "waiting for game",
  states: {
    "waiting for game": {
      on: {
        START_NEW_GAME: {
          actions: "initGame",
          target: "no cards flipped",
        },
      },
    },
    "no cards flipped": {
      on: {
        FLIP: {
          target: "one card flipped",
        },
      },
    },
    "one card flipped": {
      on: {
        FLIP: {
          target: "two cards flipped",
        },
      },
    },
    "two cards flipped": {
      always: [
        {
          actions: "collectPair",
          cond: "pairFound",
          target: "collecting pair",
        },
        {
          actions: ["resetFlippedCards", "nextPlayer"],
          target: "no cards flipped",
        },
      ],
    },
    "collecting pair": {
      always: [
        {
          description: "\n",
          cond: "allCardsCollected",
          target: "game over",
        },
        {
          actions: "resetFlippedCards",
          target: "no cards flipped",
        },
      ],
    },
    "game over": {
      on: {
        START_NEW_GAME: {
          actions: "initGame",
          target: "no cards flipped",
        },
      },
    },
  },
  id: "game",
});