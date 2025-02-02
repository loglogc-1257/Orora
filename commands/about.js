
const aboutCommand = {
  name: 'about',
  description: 'Display information about the bot.',
  async execute(senderId, args, pageAccessToken, sendMessage) {
    const aboutMessage = `
      **Bot Name:** [Stanley bot v4]
      **Version:** [1.1.1.1.1.0]
      **Description:** [Ai assistant that can help you]
      **Developed by:** [Stanley stawa ]
      **Contact:** [ https://www.facebook.com/profile.php?id=100078426361784]
    `;
    sendMessage(senderId, { text: aboutMessage }, pageAccessToken);
  }
};

module.exports = aboutCommand;
