const axios = require('axios');

module.exports = {
  name: 'quote',
  description: 'Get a random quote from a specific category',
  author: 'Aljur Pogoy',
  async execute(senderId, args, pageAccessToken, sendMessage) {
    const category = args.join(' ');

    if (category === "") {
      sendMessage(senderId, { text: "Please provide a category. Here are the available categories: age, alone, amazing, anger, architecture, art, attitude, beauty, best, birthday, business, car, change, communications, computers, cool, courage, dad, dating, death, design, dreams, education, environmental, equality, experience, failure, faith, family, famous, fear, fitness" }, pageAccessToken);
      return; // Ensure the function doesn't continue
    }

    // Inform the user that content is being generated
    sendMessage(senderId, { text: 'Fetching a quote... Please wait.' }, pageAccessToken);

    try {
      const apiUrl = `https://api.api-ninjas.com/v1/quotes?category=${category}`;
      const response = await axios.get(apiUrl, {
        headers: {
          'X-Api-Key': 'A4drPDSMtprpmTnd1bEJ0w==5NZP88tykb5fXsVL'
        }
      });

      if (response.data.length === 0) {
        sendMessage(senderId, { text: "No quotes found for this category. Please choose another one." }, pageAccessToken);
        return;
      }

      const quote = response.data[0].quote;
      const author = response.data[0].author;
      const message = `${quote} - ${author}`;

      // Send the generated text to the user
      sendMessage(senderId, { text: message }, pageAccessToken);
    } catch (error) {
      console.error('Error calling Quote API:', error);
      sendMessage(senderId, { text: 'There was an error fetching the quote. Please try again later.' }, pageAccessToken);
    }
  }
};
