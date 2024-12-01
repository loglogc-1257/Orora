const axios = require('axios');

// Define a simple in-memory database to store user balances
const userBalances = {}; 

module.exports = {
  name: 'balance',
  description: 'Check your current balance',
  author: 'Aljur Pogoy',
  async execute(senderId, args, pageAccessToken, sendMessage) {
    const balance = userBalances[senderId] || 0; // Get balance, default to 0 if not found
    sendMessage(senderId, { text: `Your current balance is: ${balance}` }, pageAccessToken);
  }
};
