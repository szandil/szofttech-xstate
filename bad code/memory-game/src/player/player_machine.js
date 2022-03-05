import { createMachine } from "xstate";
import { DEFAULT_DELAY } from './common/common_config';



const playerMachine = createMachine({
    initial: "waiting",
    context: {
        collectedPairs: []
    },
    states: {
        "waiting": {},
        "thinking": {},
        "one card chosen": {},
        "two cards chosen": {
            after: {
                DEFAULT_DELAY: {target: "waiting"}
            }
        },
    }
});