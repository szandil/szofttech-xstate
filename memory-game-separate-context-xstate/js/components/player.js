export class PlayerComponent {

    player;
    state = 'ismeretlen';
    cardElements;
    isThinking = false;

    setState(state) {
        if (state === 'várakozik') {
            this.isThinking = false;
        } else if (state === 'gondolkozik') {
            this.isThinking = true;
        }
    }

    constructor(player, state) {
        this.player = player;
        this.cardElements = [];
        this.setState(state);
    }

    getPlayerHtml = () => {

        const thinkingClass = this.isThinking ? 'thinking' : '';
        const cards = this.cardElements.map(cardEl => cardEl.getCardHtml());

        return `
        <div class='${thinkingClass} player-div'>
            <h5>Játékos ${this.player.id + 1}</h5>
            <div class='collected-pairs'>
                ${cards.join('')}
            </div>
        </div>`
    }
}