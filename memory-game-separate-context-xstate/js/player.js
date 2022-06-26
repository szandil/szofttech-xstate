export class Player {
    id;
    collectedCards;

    constructor(id) {
        this.id = id;
        this.collectedCards = [];
    }

    pairFound(card) {
        this.collectedCards.push(card);
    }
};