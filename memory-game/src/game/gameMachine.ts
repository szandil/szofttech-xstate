import { assign, createMachine, send, spawn } from 'xstate';
import {  respond } from 'xstate/lib/actions';
import { shuffleArray } from '../common/common_config';
import { createPlayerMachine } from '../player/playerMachine';
import { CollectPairEvent, PlayerActorType } from '../player/playerTypes';
import { createCardMachine } from './cardMachine';
import { CardActorRefType, CardTypestate } from './cardTypes';
import { flipEvent, GameContext, GameEvent, GameTypestate } from './gameTypes';

export const gameMachine = createMachine<GameContext, GameEvent, GameTypestate>(
  {
    id: 'Memory game',
    context: {
      numberOfPlayers: 3,
      numberOfCards: 20,
      currentPlayerIndex: 0,
      cards: [],
      players: [],
      flippedCards: [],
      imageSet: 'animals',
    },
    initial: 'waiting for game',
    states: {
      'waiting for game': {
        on: {
          'START GAME': [{ target: 'game in progress' }],
        },
      },
      'game in progress': {
        entry: ['initGame', 'setFirstPlayer'],
        initial: 'no cards flipped',
        states: {
          'no cards flipped': {
            on: {
              FLIP: {
                target: 'one card flipped',
                actions: ['respondFlip', 'addCardToFlipped'],
              },
            },
          },
          'one card flipped': {
            on: {
              FLIP: {
                target: 'two cards flipped',
                actions: ['respondFlip', 'addCardToFlipped'],
              },
            },
          },
          'two cards flipped': {
            after: {
              500: [
                {
                  target: 'wait',
                  actions: [
                    send(
                      { type: 'COLLECT' },
                      { to: (context) => context.flippedCards[0] }
                    ),
                    send(
                      { type: 'COLLECT' },
                      { to: (context) => context.flippedCards[1] }
                    ),
                    send(context => {
                        const card = context.flippedCards[0];
                        const event: CollectPairEvent = {
                          type: 'COLLECT_PAIR',
                          card: card
                        };
                        return event;
                      },
                      { to: (context) => context.players[context.currentPlayerIndex]}
                    )
                  ],
                  cond: 'foundPair',
                },
                {
                  target: 'evaluate game over',
                  actions: [
                    send(
                      { type: 'FLIP' },
                      { to: (context) => context.flippedCards[0] }
                    ),
                    send(
                      { type: 'FLIP' },
                      { to: (context) => context.flippedCards[1] }
                    ),
                  ],
                },
              ],
            },
          },
          'wait': {
            on: {
              CARD_COLLECTED: {
                target: 'evaluate game over',
              },
            },
          },
          'evaluate game over': {
            always: [
              { target: '#Memory game.game over', cond: 'allCardsCollected' },
              { target: 'no cards flipped', cond: 'foundPair' },
              { target: 'waiting for player swap', actions: ['sendCurrentFinish', 'sendNextStart'] },
            ],
            exit: assign({ flippedCards: (context, _) => [] }),
          },
          'waiting for player swap': { 
            on: {
              PLAYER_TURN_START: {
                target: 'no cards flipped',
                actions: 'nextPlayer'
              }
            }
          }
        },
      },
      'game over': {},
    },
  },
  {
    actions: {
      initGame: assign({
        cards: (context, _) => {
          const newCards = [];
          const { numberOfCards } = context;
          for (let i = 0; i < numberOfCards / 2; i++) {
            const image = `assets/${context.imageSet}/${i}.png`;
            const newCard1 = createCardMachine({
              id: i.toString() + '-1',
              frontImage: image,
            });
            const newCard2 = createCardMachine({
              id: i.toString() + '-2',
              frontImage: image,
            });
            newCards.push(newCard1);
            newCards.push(newCard2);
          }
          shuffleArray(newCards);
          return [...newCards.map((card) => spawn(card) as CardActorRefType)];
        },
        flippedCards: (context, _) => [],
        players: (context, _) => {
          const { numberOfPlayers } = context;
          const _players = [];
          for(let i = 0; i < numberOfPlayers; i++) {
            _players.push(createPlayerMachine({id: i}));
          }
          return [..._players.map((player) => spawn(player) as PlayerActorType)];
        }
      }),
      setFirstPlayer: send('TAKE_TURN', {to: (context) => context.players[0]}),
      respondFlip: respond('FLIP'),
      addCardToFlipped: assign({
        flippedCards: (context, event) => {
          if (event.type !== 'FLIP') return context.flippedCards;
          const { cards } = context;
          let i = 1;
          let card = cards[0];
          let { id } = (card.getSnapshot() as CardTypestate).context;
          const eventCardId = (event as flipEvent).cardId;
          while (i < cards.length && id !== eventCardId) {
            card = cards[i];
            id = (card.getSnapshot() as CardTypestate).context.id;
            i++;
          }
          if (id === eventCardId) {
            return [...context.flippedCards, card];
          }
          return [];
        },
      }),
      sendCurrentFinish: send('FINISH_TURN', {to: (context) => context.players[context.currentPlayerIndex]}),
      sendNextStart: send('TAKE_TURN', {to: (context) => context.players[(context.currentPlayerIndex + 1) % context.numberOfPlayers]}),
      nextPlayer: assign({
        currentPlayerIndex: (context) => (context.currentPlayerIndex + 1) % context.numberOfPlayers
      })
      // nextPlayer:  pure((context, event) => {
      //   type: ActionTypes.Pure,
      //   get: () => 
      // }),
      // send('TAKE_TURN', {to: (context) => context.players[context.currentPlayerIndex + 1]})
    },
    guards: {
      foundPair: (context, _) => {
        const { flippedCards } = context;
        if (flippedCards.length !== 2) return false;
        const card1Number = flippedCards[0]
          .getSnapshot()
          ?.context.id.split('-')[0];
        const card2Number = flippedCards[1]
          .getSnapshot()
          ?.context.id.split('-')[0];
        return card1Number === card2Number;
      },
      allCardsCollected: (context, event) => {
        const { cards } = context;
        let allCollected = true;
        let i = 0;
        while (allCollected && i < cards.length) {
          const card = cards[i].getSnapshot();
          allCollected =
            typeof card?.value === 'string' && card.value === 'collected';
          i++;
        }
        return allCollected;
      },
    },
    delays: {
      DEFAULT_DELAY: 2000,
    },
  }
);
