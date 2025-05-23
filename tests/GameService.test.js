import { GameService } from '../src/services/GameService.js';
import { Deck } from '../src/models/Deck.js';
import { HandEvaluator } from '../src/utils/HandEvaluator.js';

// Mock DOM elements
document.body.innerHTML = `
    <div id="player-chips">60</div>
    <div id="current-bet">0</div>
    <div class="game-phase-title"></div>
    <button id="ready-btn"></button>
    <input id="bet-input" type="number" min="1" max="60" value="1">
    <button id="bet-btn"></button>
    <button id="check-btn"></button>
    <button id="fold-btn"></button>
    <button id="snipe-btn"></button>
    <div id="snipe-panel">
        <select id="hand-type">
            <option value="four-of-a-kind">Four of a Kind</option>
            <option value="full-house">Full House</option>
            <option value="straight">Straight</option>
            <option value="three-of-a-kind">Three of a Kind</option>
            <option value="two-pairs">Two Pairs</option>
            <option value="one-pair">One Pair</option>
            <option value="high-card">High Card</option>
        </select>
        <select class="card-value">
            <option value="1">Ace</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
        </select>
        <button id="snipe-confirm-btn"></button>
        <button id="no-snipe-btn"></button>
    </div>
`;

// Mock UIService
jest.mock('../src/services/UIService.js', () => ({
    UIService: {
        updateCards: jest.fn(),
        updatePlayerInfo: jest.fn(),
        updateControlsVisibility: jest.fn()
    }
}));

describe('GameService', () => {
    let game;

    beforeEach(() => {
        game = new GameService();
        jest.clearAllMocks();
    });

    describe('Initialization', () => {
        test('should initialize with correct starting values', () => {
            expect(game.playerChips).toBe(60);
            expect(game.currentBet).toBe(0);
            expect(game.gamePhase).toBe('preflop');
            expect(game.snipedHand).toBeNull();
            expect(game.playerCards).toHaveLength(2);
            expect(game.communityCards).toHaveLength(0);
        });

        test('should deal two cards to player on initialization', () => {
            expect(game.playerCards).toHaveLength(2);
            expect(game.playerCards[0]).toBeDefined();
            expect(game.playerCards[1]).toBeDefined();
        });
    });

    describe('Game Phases', () => {
        test('should progress from preflop to flop when player is ready', () => {
            game.playerReady();
            expect(game.gamePhase).toBe('flop');
            expect(game.communityCards).toHaveLength(2);
        });

        test('should progress from flop to turn after betting', () => {
            game.gamePhase = 'flop';
            game.placeBet(10);
            expect(game.gamePhase).toBe('turn');
            expect(game.communityCards).toHaveLength(4);
        });

        test('should progress from turn to snipe phase after betting', () => {
            game.gamePhase = 'turn';
            game.placeBet(10);
            expect(game.gamePhase).toBe('snipe');
        });
    });

    describe('Betting', () => {
        test('should place valid bet', () => {
            const initialChips = game.playerChips;
            const betAmount = 20;
            game.placeBet(betAmount);
            expect(game.playerChips).toBe(initialChips - betAmount);
            expect(game.currentBet).toBe(betAmount);
        });

        test('should not allow bet larger than chips', () => {
            const initialChips = game.playerChips;
            const betAmount = initialChips + 10;
            game.placeBet(betAmount);
            expect(game.playerChips).toBe(initialChips);
            expect(game.currentBet).toBe(0);
        });

        test('should not allow negative bet', () => {
            const initialChips = game.playerChips;
            game.placeBet(-10);
            expect(game.playerChips).toBe(initialChips);
            expect(game.currentBet).toBe(0);
        });
    });

    describe('Snipe Phase', () => {
        beforeEach(() => {
            game.gamePhase = 'snipe';
        });

        test('should handle successful snipe', () => {
            // Mock a hand that matches the snipe
            const mockHand = { name: 'Four of a Kind', value: 7 };
            jest.spyOn(HandEvaluator, 'evaluateHand').mockReturnValue(mockHand);

            const initialChips = game.playerChips;
            game.snipedHand = { type: 'four-of-a-kind', value: 7 };
            game.processSnipe();

            expect(game.playerChips).toBe(initialChips - game.currentBet);
        });

        test('should handle unsuccessful snipe', () => {
            // Mock a hand that doesn't match the snipe
            const mockHand = { name: 'High Card', value: 10 };
            jest.spyOn(HandEvaluator, 'evaluateHand').mockReturnValue(mockHand);

            const initialChips = game.playerChips;
            game.snipedHand = { type: 'four-of-a-kind', value: 7 };
            game.processSnipe();

            expect(game.playerChips).toBe(initialChips);
        });
    });

    describe('New Hand', () => {
        test('should reset game state for new hand', () => {
            // Set up some game state
            game.playerChips = 40;
            game.currentBet = 20;
            game.gamePhase = 'snipe';
            game.snipedHand = { type: 'four-of-a-kind', value: 7 };

            game.startNewHand();

            expect(game.playerChips).toBe(40); // Chips should remain
            expect(game.currentBet).toBe(0);
            expect(game.gamePhase).toBe('preflop');
            expect(game.snipedHand).toBeNull();
            expect(game.playerCards).toHaveLength(2);
            expect(game.communityCards).toHaveLength(0);
        });
    });

    // Future multiplayer tests
    describe('Multiplayer Implementation (Future)', () => {
        test('should handle multiple players joining game', () => {
            // This test will be implemented when multiplayer is added
            expect(true).toBe(true);
        });

        test('should handle turn-based gameplay', () => {
            // This test will be implemented when multiplayer is added
            expect(true).toBe(true);
        });

        test('should handle player disconnection', () => {
            // This test will be implemented when multiplayer is added
            expect(true).toBe(true);
        });

        test('should handle game state synchronization', () => {
            // This test will be implemented when multiplayer is added
            expect(true).toBe(true);
        });
    });
});
