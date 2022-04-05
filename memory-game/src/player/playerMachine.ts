import { createMachine } from 'xstate';
import { PlayerContext, PlayerEvent, PlayerTypestate } from './playerTypes';

export const createPlayerMachine = ({ id }: { id: number }) =>
  createMachine<PlayerContext, PlayerEvent, PlayerTypestate>({
    initial: 'waiting',
    context: {
      id,
      collectedPairs: [],
    },
    states: {
      waiting: {},
      thinking: {},
      'one card chosen': {},
      'two cards chosen': {},
    },
  });
