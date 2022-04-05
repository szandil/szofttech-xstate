import { useContext } from 'react';
import './App.css';
import { useSelector } from '@xstate/react';
import { Card } from './components/card/card';
import { GlobalGameContext } from './gameContext';
import { CardActorRefType } from './game/cardTypes';

/* 

MEMÓRIA JÁTÉK
- játék state machine-je
- adatok tárolása külön, a játék levezetésére metódusok
- vizualizáció

ÖTLETEK
- lehet, hogy a játékosok állapotait is külön kéne kezelni? (Player állapotgép) 
  --> játékosok számának választásakor a Memory Game állapotgépben létrejön (spawn)
  --> listában kell tárolni a játékosokat a contextben (és hogy hanyadik játokos jön) 
    --> ha a spawn-nál meg van adva név, akkor a send-ben ez megadható pl. send({ type: 'SUBMIT' }, { to: 'form' })
- kártyák megoldása? --> a játékosokhoz hasonlóan?
- kezelni kell azt is, hogy hány db van felfordítva, melyik játékosnál, melyik kártyák vannak --> ezt tudja egy állapotgép?

- context megadása teljesen kívülről? talán createModel vagy withContext vagy react context 
*/

const selectCards = (state: any): CardActorRefType[] => state.context.cards;

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
          <Card key={card.id} cardActor={card} />
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
    <div className='container-fluid pt-4 main'>
      {isWaitingForGame && waiting}
      {isGameInProgress && inProgress}
      {isGameOver && gameOver}
    </div>
  );
};

export default App;
