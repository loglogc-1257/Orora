const axios = require('axios');

module.exports = {
  name: 'ai',
  description: 'Ask a question to chatgpt',
  author: 'Aljur Pogoy',
  async execute(senderId, args, pageAccessToken, sendMessage) {
    const prompt = args.join(' ');
    if (prompt === "") {
      sendMessage(senderId, { text: "Usage:  <question>" }, pageAccessToken);
      return; // Ensure the function doesn't continue
    }
    // Inform the user that content is being generated
    sendMessage(senderId, { text: 'Generating content... Please wait.' }, pageAccessToken);
    try {
      const apiUrl = 'http://markdevs-last-api.onrender.com/api/v2/gpt4';
      const response = await axios.post(apiUrl, { query: prompt });
      const text = response.data.gpt4;
      // Send the generated text to the user
      sendMessage(senderId, { text: "GPT4 BY CHATGPT:\n\n" + text }, pageAccessToken);
    } catch (error) {
      console.error('Error calling GPT-4 API:', error);
      sendMessage(senderId, { text: 'There was an error generating the content. Please try again later.' }, pageAccessToken);
    }
  }
};
    
