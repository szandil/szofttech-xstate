// const { createMachine } = require("xstate");

import { createMachine } from "xstate";

export const gameMachine = 
/** @xstate-layout N4IgpgJg5mDOIC5RQIYFswDoDuKCWALngHZQAEAZgPYBOZqGAxAMoAqAggEqsD6AcgFEA6jwDi7ALIDEoAA5VYhPFWIyQAD0QBaAIwBmACyYAHACYA7AAZjO8+b0Xj1gDQgAnttMBWHZi9eATgA2IIMfYwC9IONzAF9Y1wYsYioyAGMUGghYSgAbPFlZSEYAMQAZAEkABTV5RSIVNU0EPQdMAINTIICdIMtukJ0vVw8ELVMA80wg8wm+gwXzIa94xPQsFTB0zIg8gqKIUsqapBA6pUbT5ujfS0sloJ1jecsA0xHtfT1MPXMgr2snWMTlMv1WICSmAI2FSGSyOQo+UKxVqCguqiuiFaxj8gQijy8BgCkQCHzGOksJgM0XMnR0Oki1i8enBkLSVFyuTAaSIpDIsnwNEYqPqygxoGauksRlMd30BksQ2JC2G7ixAUwswCwP0kwZDKCrPWmCSZCoADcwEK2FxeIIROIpCL0U1Pnc-HoSV4grL7qYLGTdIZNZYHCEosSQtF4gkQCkIHA1JDcEo+dQ6ElnQ1xRptK0giYvMY9K9-gFXjpA94pv5goTDKEKcYjRhMCltvC9siIFmxa6ED4TD0QmYurMGe81WNq7i6wYGwYmy2NsQtnDdoj9pBe5cJYgfZS9EXZqZ59L56Sp+MvDXAv959TF9Y4rHIdDYTsEUiDjuc9dbNMDi9L85a-NSZI6AqmCWISHSypBTzli+aytuynLcry5ACngNC-v2DI4lYi5EnctJmAEqqjEGGoxP8pj6OY3rMtGr7GqaFpWnhmLTjM7RvH85Y+j0TyBhS3wRGYhKgr8dzGAYy5cXuYxRJSxhFiWdblj0gYydMWpahEJEvvEQA */
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
          cond: "cardIsFlippable",
          target: "one card flipped",
        },
      },
    },
    "one card flipped": {
      on: {
        FLIP: {
          cond: "cardIsFlippable",
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