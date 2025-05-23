import { Card } from './Card.js';

export class Deck {
    constructor() {
        this.cards = [];
        this.initialize();
    }

    initialize() {
        // Create 4 decks of cards numbered 1-10
        for (let deck = 0; deck < 4; deck++) {
            for (let value = 1; value <= 10; value++) {
                this.cards.push(new Card(value));
            }
        }
    }

    shuffle() {
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
    }

    draw() {
        return this.cards.pop();
    }
}
