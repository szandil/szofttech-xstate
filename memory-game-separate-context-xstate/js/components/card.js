import {gameService} from '../game.js';

export class CardComponent {

    card;
    index;
    isFrontVisible;
    isInPlayersCollection;

    constructor(card, index, isFrontVisible, isInPlayersCollection) {
        this.card = card;
        this.index = index;
        this.isFrontVisible = isFrontVisible;
        this.isInPlayersCollection = isInPlayersCollection;
    } 

    getCardHtml = () => {
        const collected = `
            visibility: hidden
        `;
    
        const image = `
            background-image: url(${this.card.card.frontImage}); 
            background-size: 70%;
            background-repeat: no-repeat;
            background-position: center
        `;
    
        const inPlayerHand = `
            ${image};
            width: 50px;
            height: 50px;
            cursor: default;
            background-color: white
        `;
    
        const sideClass = this.isFrontVisible ? 'front' : 'back';
        let style = ``;
        if (this.isFrontVisible) style = image;
        if (this.card.collected) style = collected;
        if (this.isInPlayersCollection) style = inPlayerHand;


        return  `
        <span class='card ${sideClass}' 
            style='${style}'
            id=${this.index}>
            ${this.card.card.id.split("-")[0]}
        </span>
        `;
    }
}