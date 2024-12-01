const axios = require('axios');

module.exports = {
  name: 'contact',
  description: 'Get the developer\'s contact information',
  author: 'Aljur Pogoy',
  async execute(senderId, args, pageAccessToken, sendMessage) {
    // Phone number and email address of the developer
    const phoneNumber = '09120121191'; // Replace with the actual phone number
    const emailAddress = 'Korisawaumuzaki@gmail.com'; // Replace with the actual email address

    sendMessage(senderId, {
      text: `You can reach the developer at:\n\nPhone: ${phoneNumber}\nEmail: ${emailAddress}`
    }, pageAccessToken);
  }
};
                
