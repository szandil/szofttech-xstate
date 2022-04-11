import { ActorRef } from 'xstate';
import { CardActorRefType } from '../game/cardTypes';

export interface PlayerContext {
    id: number;
    collectedPairs: CardActorRefType[];
}

export interface CollectPairEvent {
    type: 'COLLECT_PAIR';
    card: CardActorRefType;
}

export type PlayerEvent = 
    { type: 'TAKE_TURN' } | 
    { type: 'FINISH_TURN' } |
    CollectPairEvent;

export type PlayerTypestate = {
    context: PlayerContext;
    value: 'waiting' | 'thinking';
};

export type PlayerActorType = ActorRef<PlayerEvent, PlayerTypestate>;
