import { createMachine } from "xstate";

export interface CardContext {
    frontImage?: string,
    backImage?: string,
    name?: string
}

export const createCardMachine = ({name}: {name: string}) => createMachine({
    tsTypes: {} as import("./cardMachine.typegen").Typegen0,
    id: 'card',
    context: {
        name
    } as CardContext,
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