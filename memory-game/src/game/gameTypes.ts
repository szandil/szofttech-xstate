import { State } from "xstate";
import { PlayerActorType } from "../player/playerTypes";
import { CardActorRefType, CardContext, CardEvent, CardTypestate } from "./cardTypes";


export interface GameContextType {
    numberOfPlayers: number;
    numberOfCards: number;
    cards: CardActorRefType[];
    players: PlayerActorType[];
    firstFlippedCard?: CardActorRefType;
}

export interface startGameEvent {
    type: 'START GAME'
};

export interface flipCardEvent {
    type: 'FLIP CARD'
};

export type GameEvent = 
    | startGameEvent
    | flipCardEvent;

export type GameTypestate = {
    context: GameContextType;
    value: 'waiting for game' |
            'game in progress' | {'game in progress': 'one card flipped'} | {'game in progress': 'two cards flipped'} | {'game in progress': 'no cards fipped'} |
            'game over'
};

export type CardState = State<CardContext, CardEvent, any, CardTypestate>;
