export class HandEvaluator {
    static evaluateHand(playerCards, communityCards) {
        const allCards = [...playerCards, ...communityCards];
        const values = allCards.map(card => card.value);

        // Check for Four of a Kind
        if (this.hasFourOfAKind(values)) {
            return { rank: 1, name: 'Four of a Kind', value: this.getFourOfAKindValue(values) };
        }

        // Check for Full House
        if (this.hasFullHouse(values)) {
            return { rank: 2, name: 'Full House', value: this.getFullHouseValue(values) };
        }

        // Check for Straight
        if (this.hasStraight(values)) {
            return { rank: 3, name: 'Straight', value: this.getStraightValue(values) };
        }

        // Check for Three of a Kind
        if (this.hasThreeOfAKind(values)) {
            return { rank: 4, name: 'Three of a Kind', value: this.getThreeOfAKindValue(values) };
        }

        // Check for Two Pairs
        if (this.hasTwoPairs(values)) {
            return { rank: 5, name: 'Two Pairs', value: this.getTwoPairsValue(values) };
        }

        // Check for One Pair
        if (this.hasOnePair(values)) {
            return { rank: 6, name: 'One Pair', value: this.getOnePairValue(values) };
        }

        // High Card
        return { rank: 7, name: 'High Card', value: Math.max(...values) };
    }

    static hasFourOfAKind(values) {
        const counts = this.getCounts(values);
        return Object.values(counts).some(count => count >= 4);
    }

    static getFourOfAKindValue(values) {
        const counts = this.getCounts(values);
        const fourValue = Object.entries(counts).find(([_, count]) => count >= 4)[0];
        return parseInt(fourValue);
    }

    static hasFullHouse(values) {
        const counts = this.getCounts(values);
        const countsArray = Object.values(counts);
        return countsArray.includes(3) && countsArray.includes(2);
    }

    static getFullHouseValue(values) {
        const counts = this.getCounts(values);
        const threeValue = parseInt(Object.entries(counts).find(([_, count]) => count === 3)[0]);
        const twoValue = parseInt(Object.entries(counts).find(([_, count]) => count === 2)[0]);
        return threeValue * 10 + twoValue; // Combine values for comparison
    }

    static hasStraight(values) {
        const uniqueValues = [...new Set(values)].sort((a, b) => a - b);
        if (uniqueValues.length < 5) return false;

        // Check for regular straight
        for (let i = 0; i <= uniqueValues.length - 5; i++) {
            if (uniqueValues[i + 4] - uniqueValues[i] === 4) {
                return true;
            }
        }
        return false;
    }

    static getStraightValue(values) {
        const uniqueValues = [...new Set(values)].sort((a, b) => a - b);
        for (let i = 0; i <= uniqueValues.length - 5; i++) {
            if (uniqueValues[i + 4] - uniqueValues[i] === 4) {
                return uniqueValues[i + 4];
            }
        }
        return 0;
    }

    static hasThreeOfAKind(values) {
        const counts = this.getCounts(values);
        return Object.values(counts).some(count => count >= 3);
    }

    static getThreeOfAKindValue(values) {
        const counts = this.getCounts(values);
        return parseInt(Object.entries(counts).find(([_, count]) => count >= 3)[0]);
    }

    static hasTwoPairs(values) {
        const counts = this.getCounts(values);
        const pairs = Object.values(counts).filter(count => count >= 2);
        return pairs.length >= 2;
    }

    static getTwoPairsValue(values) {
        const counts = this.getCounts(values);
        const pairs = Object.entries(counts)
            .filter(([_, count]) => count >= 2)
            .map(([value, _]) => parseInt(value))
            .sort((a, b) => b - a);
        return pairs[0] * 10 + pairs[1];
    }

    static hasOnePair(values) {
        const counts = this.getCounts(values);
        return Object.values(counts).some(count => count >= 2);
    }

    static getOnePairValue(values) {
        const counts = this.getCounts(values);
        return parseInt(Object.entries(counts).find(([_, count]) => count >= 2)[0]);
    }

    static getCounts(values) {
        return values.reduce((acc, value) => {
            acc[value] = (acc[value] || 0) + 1;
            return acc;
        }, {});
    }
}
