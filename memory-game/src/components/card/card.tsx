import React, { useActor } from '@xstate/react';
import { CardActorRefType } from '../../game/cardTypes';
import styles from './card.module.css';

interface CardProps {
    cardActor: CardActorRefType,
    inPlayersCollectedArray: boolean
}


export const Card = ({cardActor, inPlayersCollectedArray}: CardProps) => {

    const [state, send] = useActor(cardActor);
    const { id, frontImage } = state.context;
    
    let visibleSide = '';
    let isCollected = false;
    if (typeof state.value === 'object') {
        if (state.value['in game'] === 'face down') {
            visibleSide = 'back';
        } else if (state.value['in game'] === 'face up') {
            visibleSide = 'front';
        }
    } else if (typeof state.value === 'string') {
        isCollected = state.value === 'collected';
    }

    const isFrontVisible = visibleSide === 'front';

    const handleCardClick = (event: any) => {
        send('TRY_FLIPPING');
    }

    const image = {
        backgroundImage: `url(${frontImage})`, 
        backgroundSize: '70%', 
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center'
    };

    const collected = {
        visibility: 'hidden'
    }

    const inPlayerHand = {
        ...image,
        width: '50px',
        height: '50px',
        cursor: 'default',
        'background-color': 'white'
    }

    let style = {};
    if (isFrontVisible) style = image;
    if (isCollected) style = collected;
    if (inPlayersCollectedArray) style = inPlayerHand;

    return (
        <span className={`${styles.card} ${isFrontVisible ? styles.front : styles.back}`} 
            onClick={handleCardClick}
            style={style}>
            {!isFrontVisible && !inPlayersCollectedArray && <span>{id.split("-")[0]}</span>}
        </span>
    );
};