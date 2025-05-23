import { UIService } from '../src/services/UIService.js';

// Mock DOM elements
document.body.innerHTML = `
    <div class="player-cards">
        <div class="card"></div>
        <div class="card"></div>
    </div>
    <div class="community-cards">
        <div class="card card-back"></div>
        <div class="card card-back"></div>
        <div class="card card-back"></div>
        <div class="card card-back"></div>
    </div>
    <div id="player-chips">60</div>
    <div id="current-bet">0</div>
    <button id="ready-btn"></button>
    <button id="bet-btn"></button>
    <button id="check-btn"></button>
    <button id="fold-btn"></button>
    <button id="snipe-btn"></button>
`;

describe('UIService', () => {
    beforeEach(() => {
        // Reset DOM elements before each test
        document.querySelectorAll('.card').forEach(card => {
            card.textContent = '';
            card.className = 'card';
        });
        document.getElementById('player-chips').textContent = '60';
        document.getElementById('current-bet').textContent = '0';
    });

    describe('updateCards', () => {
        test('should update player cards', () => {
            const playerCards = [{ value: 7 }, { value: 8 }];
            const communityCards = [];
            UIService.updateCards(playerCards, communityCards);

            const playerCardElements = document.querySelectorAll('.player-cards .card');
            expect(playerCardElements[0].textContent).toBe('7');
            expect(playerCardElements[1].textContent).toBe('8');
        });

        test('should update community cards', () => {
            const playerCards = [];
            const communityCards = [{ value: 2 }, { value: 3 }, { value: 4 }];
            UIService.updateCards(playerCards, communityCards);

            const communityCardElements = document.querySelectorAll('.community-cards .card');
            expect(communityCardElements[0].textContent).toBe('2');
            expect(communityCardElements[1].textContent).toBe('3');
            expect(communityCardElements[2].textContent).toBe('4');
        });

        test('should handle empty card arrays', () => {
            UIService.updateCards([], []);
            const cardElements = document.querySelectorAll('.card');
            cardElements.forEach(card => {
                expect(card.textContent).toBe('');
            });
        });
    });

    describe('updatePlayerInfo', () => {
        test('should update player chips and current bet', () => {
            UIService.updatePlayerInfo(40, 20);
            expect(document.getElementById('player-chips').textContent).toBe('40');
            expect(document.getElementById('current-bet').textContent).toBe('20');
        });

        test('should handle zero values', () => {
            UIService.updatePlayerInfo(0, 0);
            expect(document.getElementById('player-chips').textContent).toBe('0');
            expect(document.getElementById('current-bet').textContent).toBe('0');
        });
    });

    describe('updateControlsVisibility', () => {
        test('should show/hide controls based on game phase', () => {
            // Test preflop phase
            UIService.updateControlsVisibility('preflop');
            expect(document.getElementById('ready-btn').style.display).not.toBe('none');
            expect(document.getElementById('bet-btn').style.display).not.toBe('none');
            expect(document.getElementById('check-btn').style.display).toBe('none');
            expect(document.getElementById('fold-btn').style.display).not.toBe('none');
            expect(document.getElementById('snipe-btn').style.display).toBe('none');

            // Test flop phase
            UIService.updateControlsVisibility('flop');
            expect(document.getElementById('ready-btn').style.display).toBe('none');
            expect(document.getElementById('bet-btn').style.display).not.toBe('none');
            expect(document.getElementById('check-btn').style.display).not.toBe('none');
            expect(document.getElementById('fold-btn').style.display).not.toBe('none');
            expect(document.getElementById('snipe-btn').style.display).toBe('none');

            // Test snipe phase
            UIService.updateControlsVisibility('snipe');
            expect(document.getElementById('ready-btn').style.display).toBe('none');
            expect(document.getElementById('bet-btn').style.display).toBe('none');
            expect(document.getElementById('check-btn').style.display).toBe('none');
            expect(document.getElementById('fold-btn').style.display).toBe('none');
            expect(document.getElementById('snipe-btn').style.display).not.toBe('none');
        });
    });

    // Future multiplayer UI tests
    describe('Multiplayer UI (Future)', () => {
        test('should display other players\' cards', () => {
            // This test will be implemented when multiplayer is added
            expect(true).toBe(true);
        });

        test('should show player turn indicators', () => {
            // This test will be implemented when multiplayer is added
            expect(true).toBe(true);
        });

        test('should display player names and chips', () => {
            // This test will be implemented when multiplayer is added
            expect(true).toBe(true);
        });

        test('should show game chat interface', () => {
            // This test will be implemented when multiplayer is added
            expect(true).toBe(true);
        });
    });
});
