const axios = require("axios");

module.exports = {
  name: 'say',
  description: 'Convert text to speech',
  author: 'Aljur Pogoy',
  async execute(senderId, args, pageAccessToken, sendMessage) {
    try {
      const text = args.join(" ");

      if (!text) {
        sendMessage(senderId, { text: 'Please provide text to convert to speech.' }, pageAccessToken);
        return;
      }

      sendMessage(senderId, { text: 'Generating speech... Please wait.' }, pageAccessToken);

      const audioUrl = await generateSpeech(text);

      if (audioUrl) {
        sendMessage(senderId, { attachment: { url: audioUrl } }, pageAccessToken);
      } else {
        sendMessage(senderId, { text: 'Sorry, an error occurred while generating speech.' }, pageAccessToken);
      }

    } catch (error) {
      console.error('Error generating speech:', error);
      sendMessage(senderId, { text: 'There was an error generating speech. Please try again later.' }, pageAccessToken);
    }
  }
};

async function generateSpeech(text) {
  try {
    const { data: response } = await axios.get("https://www.api.vyturex.com/beast", { 
      params: {
        query: text 
      },
      responseType: 'stream'
    });
    return response.data.audio; 
  } catch (e) {
    return null;
  }
}
