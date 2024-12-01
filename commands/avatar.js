const axios = require('axios');

module.exports = {
  name: 'avatar',
  description: 'Generate an avatar',
  author: 'Aljur Pogoy',
  async execute(senderId, args, pageAccessToken, sendMessage) {
    if (!args[0]) {
      sendMessage(senderId, { text: "Usage: /avatar <character code or character name> | <background letters> | <signature> | <English color name or background color code (hex color)>" }, pageAccessToken);
      return;
    }
    sendMessage(senderId, { text: 'Generating avatar... Please wait.' }, pageAccessToken);
    try {
      const [character, background, signature, color] = args.join(" ").split("|").map(item => item.trim());
      const apiUrl = `https://goatbot.tk/taoanhdep/avataranime?apikey=ntkhangGoatBot&id=${character}&chu_Nen=${background}&chu_Ky=${signature}&colorBg=${color}`;
      const response = await axios.get(apiUrl, { responseType: 'stream' });
      sendMessage(senderId, { attachment: response.data }, pageAccessToken);
    } catch (error) {
      console.error('Error generating avatar:', error);
      sendMessage(senderId, { text: 'There was an error generating the avatar. Please try again later.' }, pageAccessToken);
    }
  }
};
