import { createMachine } from "xstate";

const cardMachine = createMachine({
    id: 'card',
    initial: 'in game',
    states: {
        'in game': {
            initial: 'face down',
            states: {
                'face down': {
                    on: {
                        TURN: 'face up'
                    }
                },
                'face up': {
                    on: {
                        TURN: 'face down',
                        COLLECT: '#card.collected'
                    }
                }
            },
        }, 
        'collected': {
            type: "final"
        }
    }
});