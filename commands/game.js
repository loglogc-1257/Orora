const axios = require('axios'); // Assuming you're using axios for API calls

// Rock Paper Scissors game
async function playRockPaperScissors(senderId, args, pageAccessToken, sendMessage) {
  const choices = ['rock', 'paper', 'scissors'];
  const botChoice = choices[Math.floor(Math.random() * choices.length)];

  const userChoice = args.join(' ').toLowerCase();
  if (!choices.includes(userChoice)) {
    sendMessage(senderId, { text: 'Invalid choice. Please choose rock, paper, or scissors.' }, pageAccessToken);
    return;
  }

  let result;
  if (userChoice === botChoice) {
    result = "It's a tie! 🤝";
  } else if (
    (userChoice === 'rock' && botChoice === 'scissors') ||
    (userChoice === 'paper' && botChoice === 'rock') ||
    (userChoice === 'scissors' && botChoice === 'paper')
  ) {
    result = `You win! 🎉 You chose ${userChoice}, and I chose ${botChoice}.`;
  } else {
    result = `I win! 🤖 I chose ${botChoice}, and you chose ${userChoice}.`;
  }

  sendMessage(senderId, { text: result }, pageAccessToken);
}

// Guessing Game
async function playGuessingGame(senderId, args, pageAccessToken, sendMessage) {
  const secretNumber = Math.floor(Math.random() * 100) + 1;
  let attempts = 0;
  let maxAttempts = 5;

  sendMessage(senderId, { text: 'I\'m thinking of a number between 1 and 100. Can you guess it?' }, pageAccessToken);

  const handleGuess = async (guess) => {
    attempts++;
    if (guess < secretNumber) {
      sendMessage(senderId, { text: 'Too low! Try again.' }, pageAccessToken);
    } else if (guess > secretNumber) {
      sendMessage(senderId, { text: 'Too high! Try again.' }, pageAccessToken);
    } else {
      sendMessage(senderId, { text: `You got it in ${attempts} attempts! 🎉 The number was ${secretNumber}.` }, pageAccessToken);
      return;
    }

    if (attempts >= maxAttempts) {
      sendMessage(senderId, { text: `You ran out of attempts! The number was ${secretNumber}.` }, pageAccessToken);
      return;
    }

    sendMessage(senderId, { text: `You have ${maxAttempts - attempts} attempts left. Guess again:` }, pageAccessToken);
  };

  const handleInput = async (message) => {
    const guess = parseInt(message.text, 10);
    if (isNaN(guess)) {
      sendMessage(senderId, { text: 'Please enter a valid number.' }, pageAccessToken);
    } else {
      await handleGuess(guess);
    }
  };

  // Wait for user input
  sendMessage(senderId, { text: 'Guess a number:' }, pageAccessToken);
  // Implement a way to listen for user input and call handleInput
  // (This will depend on your bot's framework)
}

// Command structure for game.js
module.exports = {
  name: 'game',
  description: 'Play a fun game!',
  async execute(senderId, args, pageAccessToken, sendMessage) {
    const gameType = args.shift()?.toLowerCase(); // Get the game type

    switch (gameType) {
      case 'rps':
        playRockPaperScissors(senderId, args, pageAccessToken, sendMessage);
        break;
      case 'guess':
        playGuessingGame(senderId, args, pageAccessToken, sendMessage);
        break;
      // Add more game types here...
      default:
        sendMessage(senderId, { text: 'Invalid game type. Use `game rps` for Rock Paper Scissors or `game guess` for Guessing Game.' }, pageAccessToken);
    }
  },
};

     
