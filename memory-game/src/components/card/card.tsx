import { useActor } from '@xstate/react';
import { CardActorRefType } from '../../game/cardTypes';
import styles from './card.module.css';

interface CardProps {
    cardActor: CardActorRefType
}


export const Card = ({cardActor, ...props}: CardProps) => {

    const [state, send] = useActor(cardActor);
    const { id, frontImage } = state.context;
    
    let visibleSide = '';
    if (typeof state.value === 'object') {
        if (state.value['in game'] === 'face down') {
            visibleSide = 'back';
        } else if (state.value['in game'] === 'face up') {
            visibleSide = 'front';
        }
    }
    const isFrontVisible = visibleSide === 'front';

    console.log(frontImage);
    
    const handleCardClick = (event: any) => {
        send('TRY_FLIPPING');
    }

    const image = {
        backgroundImage: `url(${frontImage})`, 
        backgroundSize: '70%', 
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center'
    };

    return (
        <span className={`${styles.card} ${isFrontVisible ? styles.front : styles.back}`} 
            onClick={handleCardClick}
            style={isFrontVisible ? image : {}}>
            {!isFrontVisible && <span>{id.split("-")[0]}</span>}
        </span>
    );
};