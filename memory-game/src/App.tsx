import React from 'react';
import './App.css';
import { useMachine } from "@xstate/react";
import { gameMachine } from './game/gameMachine';

const App = () => {
  const [state, send] = useMachine(gameMachine);      // useInterprettel jobb?
  // const active = state.matches("active");
  // const { count } = state.context;

  const waiting = 
    <div>
      <h1>Játék indítása</h1>
      <button onClick={() => send("START GAME")}>START GAME</button>
    </div>;

  return (
    <div>
      {state.matches("waiting for game") && waiting }
      {state.matches("game in progress") && <h1>Játék folyamatban</h1>}
      {state.matches("invalid player number") && <h1>Helytelen játékos szám!</h1>}
    </div>
  );
}

export default App;
