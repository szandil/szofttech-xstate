// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  eventsCausingActions: {};
  internalEvents: {
    "xstate.init": { type: "xstate.init" };
  };
  invokeSrcNameMap: {};
  missingImplementations: {
    actions: never;
    services: never;
    guards: never;
    delays: never;
  };
  eventsCausingServices: {};
  eventsCausingGuards: {};
  eventsCausingDelays: {};
  matchesStates:
    | "waiting for game"
    | "game in progress"
    | "game in progress.one card flipped"
    | "game in progress.two cards flipped"
    | "game in progress.no cards flipped"
    | "game over"
    | {
        "game in progress"?:
          | "one card flipped"
          | "two cards flipped"
          | "no cards flipped";
      };
  tags: never;
}
