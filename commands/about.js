
const aboutCommand = {
  name: 'about',
  description: 'Display information about the bot.',
  async execute(senderId, args, pageAccessToken, sendMessage) {
    const aboutMessage = `
      **Bot Name:** [Kazuto Kirigaya]
      **Version:** [1.1.1.1.1.0]
      **Description:** [Ai assistant that can help you]
      **Developed by:** [Aljur Pogoy & Jun jaam]
      **Contact:** [09129121191 or korisawaumuzaki@gmail.com ]
    `;
    sendMessage(senderId, { text: aboutMessage }, pageAccessToken);
  }
};

module.exports = aboutCommand;
