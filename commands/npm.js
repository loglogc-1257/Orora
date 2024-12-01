const { exec } = require('child_process');

module.exports = {
  name: 'npm',
  description: 'Executes npm commands in the bot\'s environment.',
  admin: true,
  async execute(senderId, args, pageAccessToken, sendMessage) {
    if (args.length === 0) {
      await sendMessage(senderId, { text: 'Please provide an npm command.' }, pageAccessToken);
      return;
    }

    const command = args.join(' ');

    try {
      // Execute the command
      exec(command, (error, stdout, stderr) => {
        if (error) {
          console.error(`Error executing npm command: ${error}`);
          sendMessage(senderId, { text: `Error: ${error.message}` }, pageAccessToken);
        } else {
          // Send console output to the user
          const output = stdout.trim() || stderr.trim();
          sendMessage(senderId, { text: output }, pageAccessToken);
        }
      });

    } catch (error) {
      console.error('Error executing npm command:', error);
      sendMessage(senderId, { text: `An error occurred: ${error.message}` }, pageAccessToken);
    }
  }
};
            
