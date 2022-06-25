import { CardComponent } from "./components/card.js";

export const waiting = (gameService) => {
    // console.log('waiting, game' ,gameService);

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

export let cardElements = null;

export const gameInProgress = (cards, selectedCards) => {

    if (cardElements === null) {
        cardElements = [];
        cards.forEach((card, ind) => {
            cardElements.push(
                new CardComponent(card, ind,
                selectedCards.reduce(((result, selectedCard) => result || selectedCard.index === ind), 
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

