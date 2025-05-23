# Sniper Hold'em

A poker game with a unique snipe mechanic where players can predict and snipe other players' hands.

## Features

- Single-player poker gameplay
- Unique snipe mechanic
- Hand evaluation system
- Modern UI with responsive design

## Future Multiplayer Implementation

The game is designed to be extended with multiplayer functionality. Future features will include:

- Real-time multiplayer gameplay
- Player turn management
- Game state synchronization
- Chat system
- Player profiles and statistics

## Development

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/sniper-holdem.git
cd sniper-holdem
```

2. Install dependencies:
```bash
npm install
```

### Running Tests

The project uses Jest for testing. To run the tests:

```bash
# Run all tests
npm test

# Run tests in watch mode (useful during development)
npm run test:watch
```

### Test Structure

The test suite is organized into several files:

- `tests/GameService.test.js`: Tests for the main game logic
- `tests/HandEvaluator.test.js`: Tests for poker hand evaluation
- `tests/Deck.test.js`: Tests for the card deck implementation
- `tests/UIService.test.js`: Tests for UI updates and interactions

Each test file includes:
- Unit tests for current functionality
- Placeholder tests for future multiplayer features
- Mock implementations for DOM elements and services

### Future Multiplayer Testing

The test suite includes placeholder tests for future multiplayer features:

- Player connection/disconnection handling
- Turn-based gameplay
- Game state synchronization
- Real-time updates
- Chat functionality

These tests will be implemented as the multiplayer features are developed.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Game Rules

Sniper Hold'em is a variant of poker with a unique sniping mechanic. The rules are:

1. The game uses four decks of cards numbered 1-10
2. Each player starts with 60 betting chips and needs to reach 75 to survive.
3. Players draw 2 private cards each
4. Four community cards are revealed in two rounds (2 + 2)
5. Players bet after each round of community cards.
  * The first player puts forward a starting bet.
  * Subsequent players can either call, raise, or fold.
  * Players cannot check.
6. Before the final reveal, players can "snipe" a specific hand type.
  * If a player's hand is sniped, that hand is eliminated from contention regardless of its strength
7. Among the remaining non-sniped hands, the highest ranking hand takes the pot.
8. If a player reaches 75 or more, they survive the game and are taken out of the running.
9. They return 75 chips to the dealer, and they must distribute the remainder among the remaining players.
10. The game ends when only one player remains without 75 chips (that player is eliminated).

### Hand Rankings (High to Low)
1. Four of a Kind
2. Full House
3. Straight
4. Three of a Kind
5. Two Pairs
6. One Pair
7. High Card

Each player may name one hand to snipe per round by stating its type and highest card (e.g. "eight-high straight" or "two pair sevens")

### Tiebreakers
If multiple players have the same hand rank:
1. Player with highest value in the hand wins
2. If still tied, player with highest personal card wins
3. If still tied, sum of personal card values decides

---

## Next Steps

### Multiplayer Implementation (4 weeks)

#### Phase 1: Basic Multiplayer Setup (1 week)
- Set up Firebase project and configuration
- Implement user authentication system
- Create game room creation/joining system
- Add basic real-time state synchronization

#### Phase 2: Game Logic Synchronization (1 week)
- Implement real-time card dealing
- Synchronize betting actions between players
- Handle player turns and phase transitions
- Manage game state across multiple clients

#### Phase 3: Snipe System (1 week)
- Implement real-time snipe actions
- Synchronize snipe results between players
- Handle multiple player snipes
- Manage snipe phase transitions

#### Phase 4: Game Flow & UI Updates (1 week)
- Add loading states and indicators
- Implement error handling and recovery
- Add reconnection logic
- Update UI for multiplayer context

### Technical Details

The multiplayer implementation will use:
- Firebase Realtime Database for game state
- Firebase Authentication for user management
- Game room system for matchmaking

### Security Considerations
- Server-side validation for all game actions
- Secure card dealing mechanism
- Anti-cheating measures
- Graceful disconnection handling

### Testing Strategy
- Unit tests for game logic
- Integration tests for Firebase
- Multiplayer testing scenarios
- Load testing for concurrent games
