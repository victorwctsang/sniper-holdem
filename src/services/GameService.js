import { Deck } from '../models/Deck.js';
import { HandEvaluator } from '../utils/HandEvaluator.js';
import { UIService } from './UIService.js';

export class GameService {
    constructor() {
        console.log('Initializing game...');
        this.deck = new Deck();
        this.playerCards = [];
        this.communityCards = [];
        this.playerChips = 60;
        this.currentBet = 0;
        this.gamePhase = 'preflop';
        this.snipedHand = null;
        this.initializeGame();
        this.setupControls();
        console.log('Game initialization complete');
    }

    initializeGame() {
        this.deck.shuffle();
        this.dealPlayerCards();
        this.updateUI();
    }

    dealPlayerCards() {
        this.playerCards = [this.deck.draw(), this.deck.draw()];
    }

    dealCommunityCards(count) {
        for (let i = 0; i < count; i++) {
            this.communityCards.push(this.deck.draw());
        }
    }

    updateUI() {
        UIService.updateCards(this.playerCards, this.communityCards);
        UIService.updatePlayerInfo(this.playerChips, this.currentBet);
        UIService.updateControlsVisibility(this.gamePhase);
        this.updatePhaseTitle();
    }

    updatePhaseTitle() {
        const phaseTitle = document.querySelector('.game-phase-title');
        const phaseNames = {
            'preflop': 'Pre-Flop',
            'flop': 'Flop',
            'turn': 'Turn',
            'snipe': 'Snipe Phase'
        };
        phaseTitle.textContent = phaseNames[this.gamePhase] || this.gamePhase;
        console.log('Phase title updated to:', phaseNames[this.gamePhase]);
    }

    setupControls() {
        console.log('Setting up game controls...');
        const readyBtn = document.getElementById('ready-btn');
        const betInput = document.getElementById('bet-input');
        const betBtn = document.getElementById('bet-btn');
        const checkBtn = document.getElementById('check-btn');
        const foldBtn = document.getElementById('fold-btn');
        const snipeBtn = document.getElementById('snipe-btn');
        const noSnipeBtn = document.getElementById('no-snipe-btn');
        const snipeConfirmBtn = document.getElementById('snipe-confirm-btn');

        readyBtn.addEventListener('click', () => {
            console.log('Ready button clicked');
            this.playerReady();
        });

        betBtn.addEventListener('click', () => {
            const betAmount = parseInt(betInput.value);
            console.log(`Bet button clicked with amount: ${betAmount}`);
            if (betAmount > 0 && betAmount <= this.playerChips) {
                this.placeBet(betAmount);
            } else {
                alert(`Invalid bet amount! Please enter a valid number between 1 and ${this.playerChips}`);
                console.log('Invalid bet amount:', betAmount);
            }
        });

        checkBtn.addEventListener('click', () => {
            console.log('Check button clicked');
            this.check();
        });

        foldBtn.addEventListener('click', () => {
            console.log('Fold button clicked');
            this.fold();
        });

        snipeBtn.addEventListener('click', () => {
            console.log('Snipe button clicked');
            this.showSnipePanel();
        });

        noSnipeBtn.addEventListener('click', () => this.handleNoSnipe());
        snipeConfirmBtn.addEventListener('click', () => this.handleSnipeConfirm());

        // Set up bet input max value observer
        console.log('Setting up MutationObserver for player chips...');
        let lastChipsValue = this.playerChips;
        const observer = new MutationObserver((mutations) => {
            const currentChips = parseInt(document.getElementById('player-chips').textContent);
            if (currentChips !== lastChipsValue) {
                console.log(`Player chips changed from ${lastChipsValue} to ${currentChips}`);
                lastChipsValue = currentChips;
                betInput.max = currentChips;
            }
        });
        observer.observe(document.getElementById('player-chips'), {
            childList: true,
            characterData: true,
            subtree: true
        });
    }

    showSnipePanel() {
        const snipePanel = document.getElementById('snipe-panel');
        snipePanel.classList.add('active');
    }

    handleSnipeConfirm() {
        const handTypeSelect = document.getElementById('hand-type');
        const cardValueSelect = document.querySelector('.card-value');

        if (!handTypeSelect.value) {
            alert('Please select a hand type');
            return;
        }

        this.snipedHand = {
            type: handTypeSelect.value,
            value: parseInt(cardValueSelect.value)
        };

        document.getElementById('snipe-panel').classList.remove('active');
        this.processSnipe();
    }

    handleNoSnipe() {
        document.getElementById('snipe-panel').classList.remove('active');
        this.snipedHand = null;
        this.processSnipe();
    }

    processSnipe() {
        if (this.snipedHand) {
            const handResult = HandEvaluator.evaluateHand(this.playerCards, this.communityCards);
            const handType = handResult.name.toLowerCase().replace(/\s+/g, '-');

            if (handType === this.snipedHand.type && handResult.value === this.snipedHand.value) {
                alert('Your hand has been sniped! You are out of this round.');
                this.playerChips -= this.currentBet; // Lose your bet
            } else {
                alert('Your hand was not sniped. Waiting for other players...');
                // In a multiplayer game, we would wait for other players' actions here
                // For now, we'll just continue to the next hand
            }
        }
        this.startNewHand();
    }

    playerReady() {
        if (this.gamePhase === 'preflop') {
            this.gamePhase = 'flop';
            this.dealCommunityCards(2);
            this.updateUI();
        }
    }

    placeBet(amount) {
        if (amount > 0 && amount <= this.playerChips) {
            this.playerChips -= amount;
            this.currentBet += amount;
            this.progressGame();
        }
    }

    check() {
        this.progressGame();
    }

    fold() {
        alert('You are out of the game!');
        this.startNewHand();
    }

    startNewHand() {
        this.deck = new Deck();
        this.deck.shuffle();
        this.playerCards = [this.deck.draw(), this.deck.draw()];
        this.communityCards = [];
        this.currentBet = 0;
        this.gamePhase = 'preflop';
        this.snipedHand = null;
        this.initializeGame();
    }

    progressGame() {
        switch (this.gamePhase) {
            case 'flop':
                this.gamePhase = 'turn';
                this.dealCommunityCards(2);
                break;
            case 'turn':
                this.gamePhase = 'snipe';
                break;
            case 'snipe':
                // Snipe phase is handled by the snipe panel
                break;
        }
        this.updateUI();
    }
}
