import { useActor } from '@xstate/react';
import { PlayerActorType } from '../../player/playerTypes';
import { Card } from '../card/card';

interface PlayerProps {
    playerActor: PlayerActorType;
}

export const Player = ({ playerActor }: PlayerProps) => {
    const [state, send] = useActor(playerActor);
    const { id, collectedPairs } = state.context;

    let playerState = 'ismeretlen';
    if (state.value === 'waiting') {
        playerState = 'várakozik';
    } else if (state.value === 'thinking') {
        playerState = 'gondolkozik';
    }
    

    return (
        <div>
            <h5>Játékos {id + 1}</h5>
            <p>Állapot: {playerState}</p>
            <p>Összegyűjtött lapok: </p>
            {collectedPairs.map(pair => <p key={pair.getSnapshot()?.context.id}>{pair.getSnapshot()?.context.id.split('-')[0]}</p>)}
        </div>
    );
};
