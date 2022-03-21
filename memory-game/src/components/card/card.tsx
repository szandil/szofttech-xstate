import { useActor } from '@xstate/react';
import { CardActorRefType } from '../../game/cardTypes';
import styles from './card.module.css';

interface CardProps {
    cardActor: CardActorRefType
}


export const Card = ({cardActor, ...props}: CardProps) => {

    const [state, send] = useActor(cardActor);
    const { id } = state.context;
    
    let visibleSide = '';
    if (typeof state.value === 'object') {
        if (state.value['in game'] === 'face down') {
            visibleSide = 'back';
        } else if (state.value['in game'] === 'face up') {
            visibleSide = 'front';
        }
    }

    const handleCardClick = (event: any) => {
        send('TRY_FLIPPING');
    }

    return (
        <span className={styles.card} onClick={handleCardClick}>
            <span>{id}</span>
            <span>{visibleSide}</span>
        </span>
    );
};