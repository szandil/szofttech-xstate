import { CardComponent } from "./card.js";
import { PlayerComponent } from "./player.js";

export const waiting = () => {
    return `
    <h1>Játék indítása</h1>
    <button
        type='button'
        id='startBtn'
        class='btn btn-primary'
    >
        START GAME
    </button>`
};

export const gameOver = () => {
    return `
        <h1>Játék vége</h1>
    `
};

export let playerElements = null;
export const players = (players, currentPlayerIndex) => {
    if (playerElements === null) {
        playerElements = [];
        players.forEach(player => {
            playerElements.push(new PlayerComponent(player, 'ismeretlen'));
        });
        playerElements[0].setState('gondolkodik');
    } else {
        players.forEach((player, index) => {
            if (index === currentPlayerIndex) playerElements[index].setState('gondolkozik');
            else playerElements[index].setState('várakozik');
            let i = playerElements[index].cardElements.length;
            while (player.collectedCards.length > playerElements[index].cardElements.length) {
                playerElements[index].cardElements.push((
                    new CardComponent(
                        {card: player.collectedCards[i]}, 
                        'in-player-hand-' + index,
                        true, 
                        true)));
                i++;
            }
        });
    }

    return `
        ${playerElements.map(player => player.getPlayerHtml()).join('')}
    `;
}

export let cardElements = null;

export const gameInProgress = (cards, selectedCards) => {

    if (cardElements === null) {
        cardElements = [];
        cards.forEach((card, ind) => {
            cardElements.push(
                new CardComponent(
                    card, 
                    ind,
                    selectedCards.reduce(
                        ((result, selectedCard) => result || selectedCard.index === ind), 
                        false), 
                    false)
                );
        });
    }

    return `
        <h1>Játék folyamatban</h1>
        <div class='cards'>
         ${cardElements.map((card) => card.getCardHtml())
            .join('')}
        </div>
    `
};

