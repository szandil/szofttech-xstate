import { createMachine } from "xstate";

export const playerMachine = createMachine({
    tsTypes: {} as import("./playerMachine.typegen").Typegen0,
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