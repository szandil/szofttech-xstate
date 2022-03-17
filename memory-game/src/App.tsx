import React, { useEffect } from 'react';
import './App.css';
import { useMachine } from "@xstate/react";
import { gameMachine } from './game/gameMachine';
import { Card } from './components/card/card';

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


const App = () => {
  // const gameService = useInterpret(gameMachine);
  // const { state, send } = gameService; 
  const [state, send] = useMachine(gameMachine);      // useInterprettel jobb?
  // const active = state.matches("active");
  // const { count } = state.context;

  const { cards } = state.context;
  useEffect(() => {
    console.log('cards changed: ', cards);
    
  }, [cards])
  

  const waiting = 
    <>
      <h1>Játék indítása</h1>
      <button 
        type = 'button'
        className='btn btn-primary'
        onClick={() => send("START GAME")}>
          START GAME
          </button>
    </>;


  const inProgress = 
    <>
      <h1>Játék folyamatban</h1>
      {cards.map(card => <Card key={card.id} cardActor={card} />)}
    </>
    

  return (
    <div className="container-fluid pt-4 main"> 
      {state.matches("waiting for game") && waiting }
      {state.matches("game in progress") && inProgress}
    </div>
  );
}

export default App;
