import { useActor } from '@xstate/react';
import { isElementOfType } from 'react-dom/test-utils';
import { ActorRef } from 'xstate';
import { CardActorRefType, FaceDown } from '../../game/cardTypes';
import styles from './card.module.css';

interface CardProps {
    cardActor: CardActorRefType
}


export const Card = ({cardActor, ...props}: CardProps) => {

    const [state, send] = useActor(cardActor);
    const { id } = state.context;
    const { visibleImage } = state.context;

    // console.log(typeof state.value ===  FaceDown);

    
    

    return (
        <span className={styles.card}>
            <span>{id}</span>
            <span>{visibleImage}</span>
        </span>
    );
};