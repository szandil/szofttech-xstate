import { DoneEventObject, State } from 'xstate';
import { PlayerActorType } from '../player/playerTypes';
import {
    CardActorRefType,
    CardContext,
    CardEvent,
    CardTypestate,
} from './cardTypes';

export interface GameContext {
    numberOfPlayers: number;
    numberOfCards: number;
    cards: CardActorRefType[];
    players: PlayerActorType[];
    flippedCards: CardActorRefType[];
    imageSet: string;
}

export interface startGameEvent {
    type: 'START GAME';
}

export interface flipEvent {
    type: 'FLIP';
    cardId: string;
}

export type GameEvent =
    | startGameEvent
    | flipEvent
    | {type: 'CARD_COLLECTED'}
    | {type: 'TURN_START'}
    | DoneEventObject; // workaround for Type 'EventObject' is not assignable to type 'GameEvent' error  (https://github.com/statelyai/xstate/issues/1276)

export type GameTypestate = {
    context: GameContext;
    value:
        | 'waiting for game'
        | 'game in progress'
        | { 'game in progress': 'one card flipped' }
        | { 'game in progress': 'two cards flipped' }
        | { 'game in progress': 'no cards fipped' }
        | { 'game in progress': 'evaluate game over' }
        | { 'game in progress': 'wait' }
        | 'game over';
};

export type CardState = State<CardContext, CardEvent, any, CardTypestate>;
