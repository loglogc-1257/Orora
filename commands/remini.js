const axios = require('axios');
const tinyurl = require('tinyurl');

module.exports = {
  name: 'remini',
  description: 'Enhance an image using Remini',
  author: 'jur',
  async execute(senderId, args, pageAccessToken, sendMessage) {
    const imageUrl = args.join(' ');
    if (!imageUrl) {
      sendMessage(senderId, { text: 'Please provide an image URL to enhance.' }, pageAccessToken);
      return;
    }

    try {
      const shortUrl = await tinyurl.shorten(imageUrl);
      const apiUrl = `https://vex-kshitiz.vercel.app/upscale?url=${encodeURIComponent(shortUrl)}`;
      const { data } = await axios.get(apiUrl, { responseType: 'json' });

      if (data.error_message) {
        sendMessage(senderId, { text: 'Error: ' + data.error_message.file_error_message }, pageAccessToken);
      } else {
        sendMessage(senderId, { text: 'Image enhanced! Check your inbox for the result.' }, pageAccessToken);
      }
    } catch (error) {
      console.error('Error calling Remini API:', error);
      sendMessage(senderId, { text: 'There was an error enhancing the image. Please try again later.' }, pageAccessToken);
    }
  }
};
                             
