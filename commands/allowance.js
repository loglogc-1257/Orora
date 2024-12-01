const axios = require('axios');

// Define a simple in-memory database to store user balances
const userBalances = {}; 

module.exports = {
  name: 'daily',
  description: 'Claim your daily reward',
  author: 'Aljur Pogoy',
  async execute(senderId, args, pageAccessToken, sendMessage) {
    // Simulate a daily cooldown (replace with actual cooldown logic if needed)
    const lastClaim = userBalances[senderId]?.lastClaim || 0;
    const now = Date.now();
    const cooldown = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

    if (now - lastClaim >= cooldown) {
      // Give the user a reward (adjust amount as needed)
      const reward = 100;

      // Update the user's balance in the shared database
      userBalances[senderId] = {
        balance: (userBalances[senderId]?.balance || 0) + reward, // Add reward to existing balance
        lastClaim: now
      };

      sendMessage(senderId, { text: `You've claimed your daily reward of ${reward}! Your new balance is ${userBalances[senderId].balance}` }, pageAccessToken);
    } else {
      const timeRemaining = cooldown - (now - lastClaim);
      const hours = Math.floor(timeRemaining / (1000 * 60 * 60));
      const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
      sendMessage(senderId, { text: `You can claim your daily reward in ${hours} hours and ${minutes} minutes.` }, pageAccessToken);
    }
  }
};
          
