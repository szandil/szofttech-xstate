import { useActor } from '@xstate/react';
import { ActorRef } from 'xstate';
import styles from './card.module.css';

interface CardProps {
    cardActor: ActorRef<any, any>
}

// TODO: típusokat megcsinálni kézzel

export const Card = ({cardActor, ...props}: CardProps) => {

    const [state, send] = useActor(cardActor);
    // const { name } = cardActor;

    return (
        <span className={styles.card}>
            THIS IS A CARD
        </span>
    );
};