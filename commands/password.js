
const axios = require('axios');

module.exports = {
  name: 'password',
  description: 'Generate a strong password',
  author: 'Aljur Pogoy',
  async execute(senderId, args, pageAccessToken, sendMessage) {
    const length = args[1] ? parseInt(args[1]) : 12;

    if (isNaN(length) || length < 8) {
      sendMessage(
        senderId,
        { text: 'Password length must be at least 8 characters.' },
        pageAccessToken
      );
      return;
    }

    const password = generatePassword(length);

    sendMessage(
      senderId,
      { text: `Generated Password: ${password}` },
      pageAccessToken
    );
  },
};

function generatePassword(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+';
  let password = '';

  for (let i = 0; i < length; i++) {
    password += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return password;
}
