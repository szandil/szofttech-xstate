import { ActorRef } from "xstate";

export interface CardContext {
    frontImage?: string,
    backImage?: string,
    name?: string
}

export type CardEvent = 
    | { type: 'TURN' }
    | { type: 'COLLECT' };

export type CardTypestate = {
    context: CardContext,
    value: 'in game' | 
            {'in game': 'face down'} | {'in game': 'face up'} |
            'collected' 
}

export type CardActorType = ActorRef<CardEvent, CardTypestate>;