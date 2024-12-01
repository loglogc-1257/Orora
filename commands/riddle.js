const axios = require('axios');
const { sendMessage } = require('../handles/sendMessage');

module.exports = {
  name: 'riddle',
  description: 'Get a logic and answer',
  usage: 'riddle',
  author: 'Aljur Pogoy',

  async execute(senderId, args, pageAccessToken) {

    try {
      const apiUrl = 'https://ccproject10-df3227f754.onlitegix.com/api/randomriddle';
const response = await axios.get(apiUrl);
const riddle = response.data.riddle;
const ans = response.data.answer;
//const username = response.data.username;
//const displayname = response.data.displayname;

       const mes = `Riddle: ${riddle}\nAnswer: ${ans}`;
  await sendMessage(senderId, { text: mes }, pageAccessToken);
    } catch {
      sendMessage(senderId, { text: 'There was an error generating the content. Please try again later.' }, pageAccessToken);
    }
  }
};
