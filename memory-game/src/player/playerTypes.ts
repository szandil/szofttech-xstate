import { ActorRef } from "xstate";
import { CardActorRefType } from "../game/cardTypes";

export interface PlayerContext {
    collectedPairs: CardActorRefType[];
}

export type PlayerEvent = 
    | {type: 'TURN'}
    | {type: 'COLLECT'};

export type PlayerTypestate = {
    context: PlayerContext,
    value: 'in game' | {'in game': 'face down'} | {'in game': 'face up'} |
            'collected'
}


export type PlayerActorType = ActorRef<any, PlayerTypestate>; 