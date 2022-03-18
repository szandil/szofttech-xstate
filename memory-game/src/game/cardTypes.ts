import { ActorRef } from "xstate";

export interface CardContext {
    frontImage?: string,
    backImage?: string,
    visibleImage?: string,
    id: string
}

export type CardEvent = 
    | { type: 'TURN' }
    | { type: 'COLLECT' };


export type InGame = 'in game';
export type FaceDown = {InGame: 'face down'};
export type FaceUp = {InGame: 'face up'};

export type CardTypestate = {
    context: CardContext,
    value: InGame | 
            FaceDown | FaceUp |
            'collected' 
    // value: 'in game' | 
    //         {'in game': 'face down'} | {'in game': 'face up'} |
    //         'collected' 
}

export type CardActorRefType = ActorRef<CardEvent, CardTypestate>;