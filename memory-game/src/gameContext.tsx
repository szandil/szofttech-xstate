import { useInterpret } from '@xstate/react';
import React, { createContext } from 'react'
import { InterpreterFrom } from 'xstate';
import { gameMachine } from './game/gameMachine';

export const GlobalGameContext = createContext({ gameService: {} as InterpreterFrom<typeof gameMachine>});

export const GameContextProvider = (props: any) => {
    const imageSets = ['animals', 'food', 'space', 'toys'];
    const imageSet = imageSets[Math.floor(Math.random() * imageSets.length)];
    const gameService = useInterpret(gameMachine, {context: {imageSet: imageSet}});

    return (
        <GlobalGameContext.Provider value={{gameService}}>
            {props.children}
        </GlobalGameContext.Provider>
    );
};
