import { Deck } from '../src/models/Deck.js';

describe('Deck', () => {
    let deck;

    beforeEach(() => {
        deck = new Deck();
    });

    describe('Initialization', () => {
        test('should create a deck with 52 cards', () => {
            expect(deck.cards.length).toBe(52);
        });

        test('should have unique cards', () => {
            const cardValues = deck.cards.map(card => card.value);
            const uniqueValues = new Set(cardValues);
            expect(uniqueValues.size).toBe(52);
        });
    });

    describe('Shuffling', () => {
        test('should shuffle the deck', () => {
            const originalOrder = [...deck.cards];
            deck.shuffle();
            expect(deck.cards).not.toEqual(originalOrder);
        });

        test('should maintain all cards after shuffling', () => {
            const originalCards = new Set(deck.cards.map(card => card.value));
            deck.shuffle();
            const shuffledCards = new Set(deck.cards.map(card => card.value));
            expect(shuffledCards).toEqual(originalCards);
        });
    });

    describe('Drawing Cards', () => {
        test('should draw a card from the deck', () => {
            const initialLength = deck.cards.length;
            const card = deck.draw();
            expect(card).toBeDefined();
            expect(deck.cards.length).toBe(initialLength - 1);
        });

        test('should not draw the same card twice', () => {
            const drawnCards = new Set();
            for (let i = 0; i < 52; i++) {
                const card = deck.draw();
                expect(drawnCards.has(card.value)).toBe(false);
                drawnCards.add(card.value);
            }
        });

        test('should throw error when trying to draw from empty deck', () => {
            // Draw all cards
            for (let i = 0; i < 52; i++) {
                deck.draw();
            }
            expect(() => deck.draw()).toThrow();
        });
    });

    describe('Card Values', () => {
        test('should have cards with values between 1 and 10', () => {
            const allValuesValid = deck.cards.every(card =>
                card.value >= 1 && card.value <= 10
            );
            expect(allValuesValid).toBe(true);
        });

        test('should have correct distribution of card values', () => {
            const valueCounts = deck.cards.reduce((acc, card) => {
                acc[card.value] = (acc[card.value] || 0) + 1;
                return acc;
            }, {});

            // Each value should appear 5 or 6 times (52 cards / 10 values ≈ 5.2)
            const allCountsValid = Object.values(valueCounts).every(count =>
                count === 5 || count === 6
            );
            expect(allCountsValid).toBe(true);
        });
    });
});
