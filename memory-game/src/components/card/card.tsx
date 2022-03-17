import { useActor } from '@xstate/react';
import { ActorRef } from 'xstate';
import { CardActorRefType } from '../../game/cardTypes';
import styles from './card.module.css';

interface CardProps {
    cardActor: CardActorRefType
}


export const Card = ({cardActor, ...props}: CardProps) => {

    const [state, send] = useActor(cardActor);
    const { id } = state.context;
    const { visibleImage } = state.context;
    
    

    return (
        <span className={styles.card}>
            <span>{id}</span>
            <span>{visibleImage}</span>
        </span>
    );
};