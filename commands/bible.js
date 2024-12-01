const axios = require('axios');

module.exports = {
  name: 'bible',
  description: 'Search for a verse in the Bible',
  author: 'Aljur Pogoy',
  async execute(senderId, args, pageAccessToken, sendMessage) {
    const reference = args.join(' ');
    if (reference === "") {
      sendMessage(senderId, { text: "Usage: /bible <reference>" }, pageAccessToken);
      return; // Ensure the function doesn't continue
    }
    // Inform the user that content is being generated
    sendMessage(senderId, { text: 'Searching for the verse... Please wait.' }, pageAccessToken);
    try {
      const apiUrl = 'https://kaiz-apis.gleeze.com/api/bible?reference=' + encodeURIComponent(reference);
      const response = await axios.get(apiUrl);
      const verse = response.data.verse[0].text;
      // Send the generated text to the user
      sendMessage(senderId, { text: "Bible Verse:\n\n" + verse }, pageAccessToken);
    } catch (error) {
      console.error('Error calling Bible API:', error);
      sendMessage(senderId, { text: 'There was an error finding the verse. Please try again later.' }, pageAccessToken);
    }
  }
};
        
