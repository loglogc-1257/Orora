const axios = require('axios');
const { sendMessage } = require('../handles/sendMessage');

module.exports = {
  name: 'photoleap',
  description: 'Generate HD picture through your prompt',
  usage: 'photoleap [prompt]',
  author: 'Aljur Pogoy',
  async execute(senderId, args, pageAccessToken) {
    const prompt = args.join(' ');
    if (!prompt) return sendMessage(senderId, { text: "Usage: photoleap dog with owner" }, pageAccessToken);

    try {
      const { data } = await axios.get(`https://joshweb.click/aigen?prompt=${encodeURIComponent(prompt)}`);
      sendMessage(senderId, { text: data.result }, pageAccessToken);
    } catch {
      sendMessage(senderId, { text: 'Error generating response. Try again later.' }, pageAccessToken);
    }
  }
};
