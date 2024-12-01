
const jokeCommand = {
  name: 'joke',
  description: 'Tell a joke.',
  async execute(message, args) {
    const jokes = [
      {
        setup: 'Why couldn\'t the bicycle stand up?',
        punchline: 'Because it was two-tired!',
      },
      {
        setup: 'What do you call a fake noodle?',
        punchline: 'An impasta!',
      },
      {
        setup: 'Why did the scarecrow win an award?',
        punchline: 'Because he was outstanding in his field!',
      },
      // Add more jokes here...
    ];

    const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];

    const jokeMessage = `
      **Joke**
      ${randomJoke.setup}
      ${randomJoke.punchline}
    `;

    message.channel.send(jokeMessage);
  }
};

module.exports = jokeCommand;
