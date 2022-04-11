import { assign, createMachine } from 'xstate';
import { log, sendParent } from 'xstate/lib/actions';
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
          COLLECT_PAIR: {
            actions: 'collect'
          },
          FINISH_TURN: {
            target: 'waiting'
          }
        }
      }
    },
  }, {
    actions: {
      sendStartThinking: sendParent('PLAYER_TURN_START'),
      collect: assign({
        collectedPairs: (context, event) => {
          const {collectedPairs} = context;
          if (event.type !== 'COLLECT_PAIR') return collectedPairs;
          return [...collectedPairs, event.card];
        }
      })
    }
  });
