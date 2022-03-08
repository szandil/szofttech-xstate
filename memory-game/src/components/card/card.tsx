import { useActor } from '@xstate/react';
import { ActorRef } from 'xstate';
import { CardActorType } from '../../game/cardTypes';
import styles from './card.module.css';

interface CardProps {
    cardActor: CardActorType
}


export const Card = ({cardActor, ...props}: CardProps) => {

    const [state, send] = useActor(cardActor);
    const { name } = state.context;

    return (
        <span className={styles.card}>
            THIS IS A CARD
        </span>
    );
};