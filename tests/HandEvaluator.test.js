import { HandEvaluator } from '../src/utils/HandEvaluator.js';

describe('HandEvaluator', () => {
    describe('Four of a Kind', () => {
        test('should detect four of a kind', () => {
            const playerCards = [{ value: 7 }, { value: 7 }];
            const communityCards = [{ value: 7 }, { value: 7 }, { value: 2 }, { value: 3 }];
            const result = HandEvaluator.evaluateHand(playerCards, communityCards);
            expect(result.name).toBe('Four of a Kind');
            expect(result.value).toBe(7);
        });

        test('should not detect four of a kind with three cards', () => {
            const playerCards = [{ value: 7 }, { value: 7 }];
            const communityCards = [{ value: 7 }, { value: 2 }, { value: 3 }];
            const result = HandEvaluator.evaluateHand(playerCards, communityCards);
            expect(result.name).not.toBe('Four of a Kind');
        });
    });

    describe('Full House', () => {
        test('should detect full house', () => {
            const playerCards = [{ value: 7 }, { value: 7 }];
            const communityCards = [{ value: 7 }, { value: 2 }, { value: 2 }, { value: 3 }];
            const result = HandEvaluator.evaluateHand(playerCards, communityCards);
            expect(result.name).toBe('Full House');
            expect(result.value).toBe(72); // 7 (three of a kind) * 10 + 2 (pair)
        });

        test('should not detect full house with only three of a kind', () => {
            const playerCards = [{ value: 7 }, { value: 7 }];
            const communityCards = [{ value: 7 }, { value: 2 }, { value: 3 }];
            const result = HandEvaluator.evaluateHand(playerCards, communityCards);
            expect(result.name).not.toBe('Full House');
        });
    });

    describe('Straight', () => {
        test('should detect straight', () => {
            const playerCards = [{ value: 5 }, { value: 6 }];
            const communityCards = [{ value: 7 }, { value: 8 }, { value: 9 }, { value: 2 }];
            const result = HandEvaluator.evaluateHand(playerCards, communityCards);
            expect(result.name).toBe('Straight');
            expect(result.value).toBe(9); // Highest card in straight
        });

        test('should not detect straight with non-consecutive cards', () => {
            const playerCards = [{ value: 5 }, { value: 7 }];
            const communityCards = [{ value: 8 }, { value: 10 }, { value: 2 }];
            const result = HandEvaluator.evaluateHand(playerCards, communityCards);
            expect(result.name).not.toBe('Straight');
        });
    });

    describe('Three of a Kind', () => {
        test('should detect three of a kind', () => {
            const playerCards = [{ value: 7 }, { value: 7 }];
            const communityCards = [{ value: 7 }, { value: 2 }, { value: 3 }];
            const result = HandEvaluator.evaluateHand(playerCards, communityCards);
            expect(result.name).toBe('Three of a Kind');
            expect(result.value).toBe(7);
        });

        test('should not detect three of a kind with only pairs', () => {
            const playerCards = [{ value: 7 }, { value: 7 }];
            const communityCards = [{ value: 2 }, { value: 2 }, { value: 3 }];
            const result = HandEvaluator.evaluateHand(playerCards, communityCards);
            expect(result.name).not.toBe('Three of a Kind');
        });
    });

    describe('Two Pairs', () => {
        test('should detect two pairs', () => {
            const playerCards = [{ value: 7 }, { value: 7 }];
            const communityCards = [{ value: 2 }, { value: 2 }, { value: 3 }];
            const result = HandEvaluator.evaluateHand(playerCards, communityCards);
            expect(result.name).toBe('Two Pairs');
            expect(result.value).toBe(72); // 7 (higher pair) * 10 + 2 (lower pair)
        });

        test('should not detect two pairs with only one pair', () => {
            const playerCards = [{ value: 7 }, { value: 7 }];
            const communityCards = [{ value: 2 }, { value: 3 }, { value: 4 }];
            const result = HandEvaluator.evaluateHand(playerCards, communityCards);
            expect(result.name).not.toBe('Two Pairs');
        });
    });

    describe('One Pair', () => {
        test('should detect one pair', () => {
            const playerCards = [{ value: 7 }, { value: 7 }];
            const communityCards = [{ value: 2 }, { value: 3 }, { value: 4 }];
            const result = HandEvaluator.evaluateHand(playerCards, communityCards);
            expect(result.name).toBe('One Pair');
            expect(result.value).toBe(7);
        });

        test('should not detect pair with no matching cards', () => {
            const playerCards = [{ value: 7 }, { value: 8 }];
            const communityCards = [{ value: 2 }, { value: 3 }, { value: 4 }];
            const result = HandEvaluator.evaluateHand(playerCards, communityCards);
            expect(result.name).not.toBe('One Pair');
        });
    });

    describe('High Card', () => {
        test('should detect high card', () => {
            const playerCards = [{ value: 7 }, { value: 8 }];
            const communityCards = [{ value: 2 }, { value: 3 }, { value: 4 }];
            const result = HandEvaluator.evaluateHand(playerCards, communityCards);
            expect(result.name).toBe('High Card');
            expect(result.value).toBe(8); // Highest card
        });

        test('should return highest card value', () => {
            const playerCards = [{ value: 7 }, { value: 8 }];
            const communityCards = [{ value: 2 }, { value: 3 }, { value: 4 }];
            const result = HandEvaluator.evaluateHand(playerCards, communityCards);
            expect(result.value).toBe(Math.max(7, 8, 2, 3, 4));
        });
    });
});
