const axios = require('axios');

module.exports = {
  name: 'bankai',
  description: 'Use the Bankai API to get a video URL',
  author: 'Aljur Pogoy',
  async execute(senderId, args, pageAccessToken, sendMessage) {
    try {
      const apiUrl = 'https://bankaii-edit.vercel.app/kshitiz';
      const response = await axios.get(apiUrl);
      const videoUrl = response.data.videoUrl;

      if (videoUrl) {
        sendMessage(senderId, { text: `Here's your video URL:\n${videoUrl}` }, pageAccessToken);
      } else {
        sendMessage(senderId, { text: 'Error: Could not retrieve video URL from the API.' }, pageAccessToken);
      }
    } catch (error) {
      console.error('Error calling Bankai API:', error);
      sendMessage(senderId, { text: 'There was an error processing your request. Please try again later.' }, pageAccessToken);
    }
  }
};
