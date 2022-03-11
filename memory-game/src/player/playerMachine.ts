import { createMachine } from "xstate";

export const playerMachine = createMachine({
    initial: "waiting",
    context: {
        collectedPairs: []
    },
    states: {
        "waiting": {},
        "thinking": {},
        "one card chosen": {},
        "two cards chosen": {},
    }
});