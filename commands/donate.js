
async function handleDonateCommand(senderId, pageAccessToken, sendMessage) {
  const donateMessage = `
    Support My Development!

    If you'd like to fuel my development and keep me running, please consider buying me a coffee!

    buymeacoffee.com/aljurpogoy

    Your support means the world to me!
  `;

  sendMessage(senderId, { text: donateMessage }, pageAccessToken);
}

module.exports = {
  name: 'donate',
  description: 'Support my development!',
  author: 'Aljur Pogoy',
  async execute(senderId, args, pageAccessToken, sendMessage) {
    await handleDonateCommand(senderId, pageAccessToken, sendMessage);
  },
};
