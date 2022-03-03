import logo from './logo.svg';
import './App.css';
import React from "react";
import ReactDOM from "react-dom";
import { createMachine, assign } from "xstate";
import { useMachine } from "@xstate/react";


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

- context megadása teljesen kívülről? talán createModel vagy withContext
*/


const gameMachine = 
/** @xstate-layout N4IgpgJg5mDOIC5QFkwFsD2AnAngAgHEBDNMAOgHUiBLAF2oDso8AxbQksAYgGVaistDqUSgADhlh1qGBqJAAPRAGZlAdjIBOAIy6AbAAYArMoBMAFmXbzAGhA5EADgNbtas5vOnHRzcr0AvgF2qJi4wuTEpHgAkgx4AApYGFBYcLBkAPIMYHgAwgIQrNRiYpBcLAA2JfmF8hJS9LLySghmpmRGBuZ6Rpaano7mjnYOCEa9ZEN6jsrmfXNGFkEh6Nj4UZGcsfFJKWmwGQByGLVYELDFpeVVNQXn9ZLSzUiKiH2dmoaajoaOpktPLZ7IhzF8yKYrMpjI5tIY9JDlEFgiAGBgIHB5KF1hFKDR6ExWOxNo9GjI5K9Wl5RohtMojGQDEymZoLADNGoDIEUdjwpsyJsdolkql0lkcmciiwSmUIKTnhTQK1tD8yHM1CqwaoDAM9GoaQhzOZtGRzEztEY4UyugZljy1nzOALtnFhfsxQAVADup3uF1Y1WucteDQVLUQGl8jh0XNmBjUHM8Bt8Jq5Fr0vVMei+0ZWIF5Gydgtde1FhzIJ0ll2lQflTUVbwQAFptFmpqZNJaVRarL9TAbLOYyOmwWpTB29F4kfawoXSM7oiWRQd4CGnvXw82LS5-p3dDoTNo+wb-Cb05amQnrI5fnmCxE6+TNy21EPd12D72EQaNDp3PTdAmOFHATZEAiAA */
createMachine({
  id: "Memory Game",
  initial: "Waiting For Game",
  states: {
    "Waiting For Game": {
      on: {
        "Start Game": {
          cond: "Valid Player Number",
          target: "#Memory Game.Game In Progress",
        },
      },
    },
    "Game In Progress": {
      initial: "No Cards Fipped",
      states: {
        "One Card Fipped": {
          on: {
            "Flip Card": {
              target: "#Memory Game.Game In Progress.Two Cards Flipped",
            },
          },
        },
        "Two Cards Flipped": {},
        "No Cards Fipped": {
          on: {
            "Flip Card": {
              target: "#Memory Game.Game In Progress.One Card Fipped",
            },
          },
        },
      },
    },
  },
});

const toggleMachine = createMachine({
  id: "toggle",
  initial: "inactive",
  context: {
    count: 0
  },
  states: {
    inactive: {
      on: { TOGGLE: "active" }
    },
    active: {
      entry: assign({ count: (ctx) => ctx.count + 1 }),
      on: { TOGGLE: "inactive" }
    }
  }
});

function App() {
  const [state, send] = useMachine(toggleMachine);
  const active = state.matches("active");
  const { count } = state.context;

  return (
    <div className="App">
      <h1>XState React Template</h1>
      <h2>Fork this template!</h2>
      <button onClick={() => send("TOGGLE")}>
        Click me ({active ? "✅" : "❌"})
      </button>{" "}
      <code>
        Toggled <strong>{count}</strong> times
      </code>
    </div>
  );
}

export default App;
