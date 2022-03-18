import { assign, createMachine } from "xstate";
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
                        TURN: {
                            target: 'face up',
                            actions: 'changeImageToFront'
                        }
                    }
                },
                'face up': {
                    on: {
                        TURN: {
                            target: 'face down',
                            actions: 'changeImageToBack'
                        },
                        COLLECT: '#card.collected'
                    }
                }
            },
        }, 
        'collected': {
            type: "final"
        }
    }
}, 
{
    actions: {},
    guards: {},
    delays: {},
    services: {}
});