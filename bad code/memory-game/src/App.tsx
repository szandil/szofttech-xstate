import './App.css';
import React from "react";
import { useMachine } from "@xstate/react";
import { gameMachine } from './game/memory_game';


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
// TODO átírni typescriptre --> típusos fsm
// TODO storybook? 




// const toggleMachine = createMachine({
//   id: "toggle",
//   initial: "inactive",
//   context: {
//     count: 0
//   },
//   states: {
//     inactive: {
//       on: { TOGGLE: "active" }
//     },
//     active: {
//       entry: assign({ count: (ctx) => ctx.count + 1 }),
//       on: { TOGGLE: "inactive" }
//     }
//   }
// });

export const App = () => {
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
