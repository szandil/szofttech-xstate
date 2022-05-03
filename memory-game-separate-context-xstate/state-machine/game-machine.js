const { createMachine } = require("xstate");

const gameMachine = 
/** @xstate-layout N4IgpgJg5mDOIC5RQIYFswDoDuKCWALngHZQAEAZgPYBOZqGAxAMoAqAggEqsD6AcgFEA6jwDi7ALIDEoAA5VYhPFWIyQAD0QBaAIwBmACyYAHACYA7AAZjO8+b0Xj1gDQgAnttMBWHZi9eATgA2IIMfYwC9IONzAF9Y1wYsYioyAGMUGghYSgAbPFlZSEYAMQAZAEkABTV5RSIVNU0Eb18InRC9Jy7jAwNjVw8ELVa-QKCvQyCdXr09eMT0LBUwdMyIPIKiiFLKmqQQOqVGg+bJ4xNzIMsbq-N+0wH3Tx8x4MmDadnDBZAkzAI2FSGSyOQo+UKxVqCmOqlOiDClj8Bki-gCVi8Bks5kG2n0ekweiu4X62Ms-iC8QSIBSEDgan+uCUpEotHoS2h9WUcNAzS0cyCJi8xj0lneATFOlxw285jeEwMUwMOmsv3+KTWoM2kIgnNhTUQr3aITMpiC5lMOgCpmlIy8crRCqVKuMaqWmBWmo24K2kD1DR5GkQczlpj0k3RxhsIXROOeMvt8qun3Jkbi1P+gOB6zBEO2-u5BoQ0wJ5oCgU+pksyoMtrNctT0VMKNsegCroz7rSVFyuTAaSILNk+BoBZOvMQpjDJksQXDgX8KrFcaGujblwmc0V5ki5i8pjdGEwSTIVAAbmBRwcjgGiyMVZhLJa92ErDphTNbTorZgrMZJpK4YGBYXiHmAY6BnyURIv+IpihMEoBFK8b8lij7jPckQWNYlJUkAA */
createMachine({
  initial: "waiting for game",
  states: {
    "waiting for game": {
      on: {
        START_NEW_GAME: {
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
          cond: "pairFound",
          target: "collecting pair",
        },
        {
          target: "no cards flipped",
        },
      ],
    },
    "collecting pair": {},
    "game over": {},
  },
  id: "game",
});