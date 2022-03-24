import { createMachine } from "xstate";
import { sendParent } from "xstate/lib/actions";
import { CardContext, CardEvent, CardTypestate } from "./cardTypes";
import { flipCardEvent } from "./gameTypes";



export const createCardMachine = ({id, frontImage}: {id: string, frontImage: string}) => createMachine<CardContext, CardEvent, CardTypestate>({
    id: 'card',
    context: {
        id,
        frontImage
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
                            actions: 'sendFlip'
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
        sendFlip: sendParent(context => {
            const event: flipCardEvent = {
                type: 'FLIP',
                cardId: context.id
            }
            return event;
        })
    },
    guards: {},
    delays: {},
    services: {}
});