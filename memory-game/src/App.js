import logo from './logo.svg';
import './App.css';
import React from "react";
import ReactDOM from "react-dom";
import { createMachine, assign } from "xstate";
import { useMachine } from "@xstate/react";

const gameMachine = 
/** @xstate-layout N4IgpgJg5mDOIC5QFkwFsD2AnAngAgHEBDNMAOgHUiBLAF2oDso8AxbQksAYgGVaistDqUSgADhlh1qGBqJAAPRACYArAGYyAFgBsADgDs65coCMp5TpN6ANCByIAnKbIAGd+4Nb1B1860AvgF2qJi4wuTEpHgAkgx4AApYGFBYcLBkAPIMYHgAwgIQrNRiYpBcLAA2JfmF8hJS9LLySgjGymSqrrqq3o6OWnqDdg4IqjqqZEP66lq9s6rKgcEgodj4UZGcsfFJKWmwGQByGLVYELDFpeVVNQXn9ZLSzUiKiL2djjp+et96asoBloRogtF8yMp1KZ1K5VHpTN8rOp1EEVgwMBA4PI1uFNpQaPQmKx2JtHo0ZHJXq0tMoQQhoZMPO5HEs1I5fDogiF0OsImRNjtEslUuksjkzkUWCUyhAyc9KaBWqZHHoyLMDMqwci-F8DHStFoXFp3KZVAj3F1XEsuasebjOPztnEhftRQAVADup3uF1Y1WusteDXlLUQBk+emcrhmrgM7IGdNUzjcOlNOgmli+kZtOI2DoFzr2IsOZBOEsuUoDcqaCreCAAtBYdFNAWblaaob9afZQbMyGmwQYTF8aSiVrm+QXdsKDvAg08a6GG6bXC3HG3nBpTF26epU-3xoMlqZfAj0zm7XmRPPyS9FYhG141xuO9urHTt24PBZXMZVF4dDmVEAiAA */
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
