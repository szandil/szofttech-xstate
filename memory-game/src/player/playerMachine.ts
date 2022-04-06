import { createMachine } from 'xstate';
import { sendParent } from 'xstate/lib/actions';
import { PlayerContext, PlayerEvent, PlayerTypestate } from './playerTypes';

export const createPlayerMachine = ({ id }: { id: number }) =>
  createMachine<PlayerContext, PlayerEvent, PlayerTypestate>({
    initial: 'waiting',
    context: {
      id,
      collectedPairs: [],
    },
    states: {
      'waiting': {
        on: {
          TAKE_TURN: {
            target: 'thinking'
          }
        }
      },
      'thinking': {
        entry: 'sendStartThinking',
        on: {
          FINISH_TURN: {
          }
        }
      },
      'one card chosen': {},
      'two cards chosen': {},
    },
  }, {
    actions: {
      sendStartThinking: sendParent('TURN_START')
    }
  });
