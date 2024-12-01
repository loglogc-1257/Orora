const axios = require("axios");

module.exports = {
  name: 'emojimix',
  description: 'Mix two emojis together',
  author: 'Aljur Pogoy',
  async execute(senderId, args, pageAccessToken, sendMessage) {
    try {
      const emoji1 = args[0];
      const emoji2 = args[1];

      if (!emoji1 || !emoji2) {
        sendMessage(senderId, { text: 'Please provide two emojis to mix.' }, pageAccessToken);
        return;
      }

      sendMessage(senderId, { text: 'Mixing emojis... Please wait.' }, pageAccessToken);

      const generate1 = await generateEmojimix(emoji1, emoji2);
      const generate2 = await generateEmojimix(emoji2, emoji1);

      if (generate1 || generate2) {
        sendMessage(senderId, { text: `Here are the mixed emojis:` }, pageAccessToken);
        if (generate1) {
          sendMessage(senderId, { attachment: { url: generate1.data } }, pageAccessToken);
        }
        if (generate2) {
          sendMessage(senderId, { attachment: { url: generate2.data } }, pageAccessToken);
        }
      } else {
        sendMessage(senderId, { text: 'Sorry, these emojis cannot be mixed.' }, pageAccessToken);
      }

    } catch (error) {
      console.error('Error mixing emojis:', error);
      sendMessage(senderId, { text: 'There was an error mixing the emojis. Please try again later.' }, pageAccessToken);
    }
  }
};

async function generateEmojimix(emoji1, emoji2) {
  try {
    const { data: response } = await axios.get("https://goatbotserver.onrender.com/taoanhdep/emojimix", {
      params: {
        emoji1,
        emoji2
      },
      responseType: 'stream'
    });
    return response.data; 
  } catch (e) {
    return null;
  }
  }
                                               
