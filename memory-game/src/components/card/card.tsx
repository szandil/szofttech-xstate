import { useActor } from '@xstate/react';
import { isElementOfType } from 'react-dom/test-utils';
import { ActorRef } from 'xstate';
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

    return (
        <span className={styles.card}>
            <span>{id}</span>
            <span>{visibleSide}</span>
        </span>
    );
};