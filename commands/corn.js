const axios = require("axios");
const fs = require('fs');
const moment = require('moment-timezone'); // Import moment for working with dates

module.exports = {
  name: 'corn',
  description: 'Get a corn video',
  author: 'Aljur Pogoy',
  async execute(senderId, args, pageAccessToken, sendMessage) {
    try {
      const query = args.join(" ").trim();
      if (!query) {
        sendMessage(senderId, { text: 'Please provide a query for the corn video.' }, pageAccessToken);
        return;
      }

      sendMessage(senderId, { text: 'Loading your video...' }, pageAccessToken);

      try {
        const cornResponse = await axios.get(`https://corns.vercel.app/kshitiz?q=${encodeURIComponent(query)}`);
        const links = cornResponse.data.links;
        if (!links || links.length === 0) {
          throw new Error("No corn video found for the provided query.");
        }

        const cornVideoLink = links[0];
        const cornDownloadResponse = await axios.get(`https://cornnn.vercel.app/kshitiz?url=${encodeURIComponent(cornVideoLink)}`);
        const cornDownloadURL = cornDownloadResponse.data.xnxxURL;

        const cornFilePath = await downloadCornVideo(cornDownloadURL);

        await api.sendMessage({
          body: `🌽 Corn video for query "${query}"`,
          attachment: fs.createReadStream(cornFilePath)
        }, event.threadID, event.messageID);

        fs.unlink(cornFilePath, (err) => {
          if (err) {
            console.error("Error deleting file:", err);
          } else {
            console.log("File deleted successfully:", cornFilePath);
          }
        });

      } catch (error) {
        console.error("Error occurred:", error);
        sendMessage(senderId, { text: `An error occurred: ${error.message}` }, pageAccessToken);
      } finally {
        sendMessage(senderId, { text: 'Video loading complete!' }, pageAccessToken);
      }

    } catch (error) {
      console.error('Error getting corn video:', error);
      sendMessage(senderId, { text: 'There was an error getting a corn video. Please try again later.' }, pageAccessToken);
    }
  }
};

async function downloadCornVideo(url) {
  const response = await axios({
    url,
    method: 'GET',
    responseType: 'stream'
  });

  const cornFilePath = `${__dirname}/cache/${Date.now()}_corn.mp4`;
  const writer = fs.createWriteStream(cornFilePath);
  response.data.pipe(writer);

  return new Promise((resolve, reject) => {
    writer.on('finish', () => resolve(cornFilePath));
    writer.on('error', reject);
  });
  }
          
