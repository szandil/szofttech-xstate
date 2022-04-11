import { ActorRef } from "xstate";

export interface CardContext {
    frontImage?: string,
    backImage?: string,
    id: string
}

export interface FlipEvent  {
    type: 'FLIP',
}

export interface TryFlippingEvent {
    type: 'TRY_FLIPPING'
}

export interface CollectEvent {
    type: 'COLLECT'
}

export type CardEvent = 
    | FlipEvent
    | TryFlippingEvent
    | { type: 'COLLECT' };


export type CardTypestate = {
    context: CardContext,
    value: 'in game' | 
            {'in game': 'face down'} | {'in game': 'face up'} |
            'collected' 
}

export type CardActorRefType = ActorRef<CardEvent, CardTypestate>;