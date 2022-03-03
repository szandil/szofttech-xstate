import { createMachine } from "xstate";


const playerMachine = createMachine({
    initial: "waiting",
    states: {
        "waiting": {}
    }
});