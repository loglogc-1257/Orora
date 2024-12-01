const axios = require('axios');

module.exports = {
  name: 'claude2',
  description: 'Ask a question to Claude',
  author: 'Aljur Pogoy',
  async execute(senderId, args, pageAccessToken, sendMessage) {
    const prompt = args.join(' ');
    if (prompt === "") {
      sendMessage(senderId, { text: "Usage: /claude <question>" }, pageAccessToken);
      return; // Ensure the function doesn't continue
    }
    // Inform the user that content is being generated
    sendMessage(senderId, { text: 'Generating content... Please wait.' }, pageAccessToken);
    try {
      const apiUrl = `https://kaiz-apis.gleeze.com/api/claude-sonnet-3.5?q=${encodeURIComponent(prompt)}&uid=${senderId}`;
      const response = await axios.get(apiUrl);
      const text = response.data.response;
      // Send the generated text to the user
      sendMessage(senderId, { text: "Claude BY CHATGPT:\n\n" + text }, pageAccessToken);
    } catch (error) {
      console.error('Error calling Claude API:', error);
      sendMessage(senderId, { text: 'There was an error generating the content. Please try again later.' }, pageAccessToken);
    }
  }
};
