import { createMachine } from "xstate";


export const createCardMachine = ({name}: {name: string}) => createMachine({
    tsTypes: {} as import("./cardMachine.typegen").Typegen0,
    id: 'card',
    context: {
        name
    },
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