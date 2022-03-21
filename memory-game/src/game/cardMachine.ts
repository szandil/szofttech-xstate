import { createMachine } from "xstate";
import { sendParent } from "xstate/lib/actions";
import { CardContext, CardEvent, CardTypestate } from "./cardTypes";



export const createCardMachine = ({id}: {id: string}) => createMachine<CardContext, CardEvent, CardTypestate>({
    id: 'card',
    context: {
        id,
    },
    initial: 'in game',
    states: {
        'in game': {
            initial: 'face down',
            states: {
                'face down': {
                    on: {
                        FLIP: {
                            target: 'face up',
                            // actions: [
                            //     'turnAction', 
                            //     sendParent('FLIP')
                            // ]
                        },
                        TRY_FLIPPING: {
                            actions: sendParent('FLIP')
                        }
                    }
                },
                'face up': {
                    on: {
                        FLIP: {
                            target: 'face down',
                            // actions: 'turnAction'
                        },
                        COLLECT: '#card.collected'
                    }
                },
            },
        }, 
        'collected': {
            type: "final"
        }
    }
}, 
{
    actions: {
    },
    guards: {},
    delays: {},
    services: {}
});