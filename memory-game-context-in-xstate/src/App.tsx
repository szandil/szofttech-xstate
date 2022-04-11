import { useContext } from 'react';
import './App.css';
import { useSelector } from '@xstate/react';
import { Card } from './components/card/card';
import { GlobalGameContext } from './gameContext';
import { CardActorRefType } from './game/cardTypes';
import { PlayerActorType } from './player/playerTypes';
import { Player } from './components/player/player';
import { GameTypestate } from './game/gameTypes';

const selectCards = (state: any): CardActorRefType[] => state.context.cards;
const selectPlayers = (state: any): PlayerActorType[] => state.context.players;

const waitingForGameSelector = (state: any) =>
    state.matches('waiting for game');
const gameInProgressSelector = (state: any) =>
    state.matches('game in progress');
const gameOverSelector = (state: any) => state.matches('game over');
const winnerSelector = (state: GameTypestate) => {
    let winner: number[] = [];
    const { players } = state.context;
    let maxPairs = 0;
    for (const player of players) {
        
        const pContext = player.getSnapshot()?.context;
        const pairNum = pContext ? pContext.collectedPairs.length : 0;
        
        if (pairNum === maxPairs ){
            console.log('add another');
            winner.push(pContext?.id !== undefined ? pContext.id : -1);
        }
        if (pairNum > maxPairs){ 
            console.log('new max');
            maxPairs = pairNum;
            winner = [pContext?.id !== undefined ? pContext.id : -1];
        }
    }
    return winner;
};



const App = () => {
    const ctx = useContext(GlobalGameContext);
    const gameService = ctx.gameService;
    const { send } = gameService;

    const cards = useSelector(gameService, selectCards);
    const players = useSelector(gameService, selectPlayers);

    const isWaitingForGame = useSelector(gameService, waitingForGameSelector);
    const isGameInProgress = useSelector(gameService, gameInProgressSelector);
    const isGameOver = useSelector(gameService, gameOverSelector);
    const winner = useSelector(gameService, winnerSelector);


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
            <h1>Játék vége</h1>
            <h2>Nyertes: </h2>
            {winner.map((w) => <span key="w">játékos {w}, </span>)}
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
