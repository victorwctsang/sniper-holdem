export class UIService {
    static updateCards(playerCards, communityCards) {
        // Update player cards
        const playerCardElements = document.querySelectorAll('.player-cards .card');
        playerCards.forEach((card, index) => {
            playerCardElements[index].textContent = card.toString();
            playerCardElements[index].classList.remove('card-back');
        });

        // Update community cards
        const communityCardElements = document.querySelectorAll('.community-cards .card');
        communityCardElements.forEach((element, index) => {
            if (index < communityCards.length) {
                element.textContent = communityCards[index].toString();
                element.classList.remove('card-back');
            } else {
                element.textContent = '';
                element.classList.add('card-back');
            }
        });
    }

    static updatePlayerInfo(chips, currentBet) {
        document.getElementById('player-chips').textContent = chips;
        document.getElementById('current-bet').textContent = currentBet;
    }

    static updateControlsVisibility(gamePhase) {
        const readyBtn = document.getElementById('ready-btn');
        const bettingInputs = document.querySelector('.betting-inputs');
        const snipeBtn = document.getElementById('snipe-btn');

        if (gamePhase === 'preflop') {
            readyBtn.style.display = 'block';
            bettingInputs.style.display = 'none';
            snipeBtn.style.display = 'none';
        } else if (gamePhase === 'turn') {
            readyBtn.style.display = 'none';
            bettingInputs.style.display = 'block';
            snipeBtn.style.display = 'none';
        } else if (gamePhase === 'river') {
            readyBtn.style.display = 'none';
            bettingInputs.style.display = 'block';
            snipeBtn.style.display = 'none';
        } else if (gamePhase === 'snipe') {
            readyBtn.style.display = 'none';
            bettingInputs.style.display = 'none';
            snipeBtn.style.display = 'block';
        } else {
            readyBtn.style.display = 'none';
            bettingInputs.style.display = 'flex';
            snipeBtn.style.display = 'none';
        }
    }
}
