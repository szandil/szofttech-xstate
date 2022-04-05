import { ActorRef } from "xstate";
import { CardActorRefType } from "../game/cardTypes";

export interface PlayerContext {
    id: number;
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


export type PlayerActorType = ActorRef<PlayerEvent, PlayerTypestate>; 