import { useContext } from 'react';
import './App.css';
import { useSelector } from '@xstate/react';
import { Card } from './components/card/card';
import { GlobalGameContext } from './gameContext';
import { CardActorRefType } from './game/cardTypes';
import { PlayerActorType } from './player/playerTypes';
import { Player } from './components/player/player';

const selectCards = (state: any): CardActorRefType[] => state.context.cards;
const selectPlayers = (state: any): PlayerActorType[] => state.context.players;

const waitingForGameSelector = (state: any) =>
    state.matches('waiting for game');
const gameInProgressSelector = (state: any) =>
    state.matches('game in progress');
const gameOverSelector = (state: any) => state.matches('game over');

const App = () => {
    const ctx = useContext(GlobalGameContext);
    const gameService = ctx.gameService;
    const { send } = gameService;

    const cards = useSelector(gameService, selectCards);
    const players = useSelector(gameService, selectPlayers);

    const isWaitingForGame = useSelector(gameService, waitingForGameSelector);
    const isGameInProgress = useSelector(gameService, gameInProgressSelector);
    const isGameOver = useSelector(gameService, gameOverSelector);


    const waiting = (
        <>
            <h1>Játék indítása</h1>
            <button
                type='button'
                className='btn btn-primary'
                onClick={() => send('START GAME')}
            >
                START GAME
            </button>
        </>
    );

    const inProgress = (
        <>
            <h1>Játék folyamatban</h1>
            <div className='cards'>
                {cards.map((card) => (
                    <Card key={card.id} cardActor={card} inPlayersCollectedArray={false} />
                ))}
            </div>
        </>
    );

    const gameOver = (
        <>
            <h1>Game Over</h1>
        </>
    );

 

    return (
        <>
            <div className='container-fluid pt-4 main'>
                {isWaitingForGame && waiting}
                {isGameInProgress && inProgress}
                {isGameOver && gameOver}
            </div>
            <div className='m-5 players-div'>
                {players.map(player => <Player key={player.id} playerActor={player} />)}
            </div>
        </>
    );
};

export default App;
