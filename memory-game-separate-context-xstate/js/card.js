export class Card {
    id;
    frontImage;

    constructor(type, id, imageSet) {
        this.id = id;
        this.frontImage = `assets/${imageSet}/${type}.png`;
    }
};