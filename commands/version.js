
module.exports = {
  name: 'version',
  description: 'Display bot version',
  author: 'Aljur Pogoy',
  async execute(senderId, args, pageAccessToken, sendMessage) {
    const version = '1.25.60';
    const versionMessage = `The Current Version of bot is ${version}`;

    sendMessage(senderId, { text: versionMessage }, pageAccessToken);
  },
};
