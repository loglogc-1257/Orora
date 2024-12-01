const axios = require("axios");

module.exports = {
  name: 'slot',
  description: 'Play a slot machine game',
  author: 'Aljur Pogoy',
  async execute(senderId, args, pageAccessToken, sendMessage) {
    try {
      const betAmount = parseInt(args[0]);

      if (isNaN(betAmount) || betAmount <= 0) {
        sendMessage(senderId, { text: 'Please enter a valid bet amount.' }, pageAccessToken);
        return;
      }

      sendMessage(senderId, { text: 'Spinning the slots... 🎰' }, pageAccessToken);

      // Simulate slot machine results
      const symbols = ['🍒', '🍇', '🍊', '🍋', '🍉'];
      const result1 = symbols[Math.floor(Math.random() * symbols.length)];
      const result2 = symbols[Math.floor(Math.random() * symbols.length)];
      const result3 = symbols[Math.floor(Math.random() * symbols.length)];

      // Determine winnings
      let winnings = 0;
      if (result1 === result2 && result2 === result3) {
        winnings = betAmount * 10; // Jackpot!
        sendMessage(senderId, { text: `Jackpot! You won $${winnings} with three ${result1} symbols! 🎉` }, pageAccessToken);
      } else if (result1 === result2 || result1 === result3 || result2 === result3) {
        winnings = betAmount * 2; // Two matching symbols
        sendMessage(senderId, { text: `You won $${winnings} with two matching symbols! 🤑` }, pageAccessToken);
      } else {
        winnings = -betAmount; // Lost
        sendMessage(senderId, { text: `You lost $${betAmount}. Better luck next time! 😔` }, pageAccessToken);
      }

      // Display the result
      sendMessage(senderId, { text: `[ ${result1} | ${result2} | ${result3} ]` }, pageAccessToken);

    } catch (error) {
      console.error('Error playing slot game:', error);
      sendMessage(senderId, { text: 'There was an error playing the slot game. Please try again later.' }, pageAccessToken);
    }
  }
};
