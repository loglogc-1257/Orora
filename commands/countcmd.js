const fs = require('fs');
const path = require('path');

module.exports = {
  name: 'countcmd',
  description: 'Show the number of available commands',
  author: 'Aljur Pogoy',
  async execute(senderId, args, pageAccessToken, sendMessage) {
    // Load commands from your bot's command directory
    const commandFiles = fs.readdirSync(path.join(__dirname, '..', 'commands')); // Adjust path if needed
    const commands = commandFiles.filter(file => file.endsWith('.js') && file !== 'commands.js'); // Remove .js extension

    // Count the number of commands
    const commandCount = commands.length;

    // Send the command count to the user
    sendMessage(senderId, { text: `The available commands is ${commandCount}` }, pageAccessToken);
  }
};
