import { createMachine } from "xstate";
import { CardContext, CardEvent, CardTypestate } from "./cardTypes";



export const createCardMachine = ({name}: {name: string}) => createMachine<CardContext, CardEvent, CardTypestate>({
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