const axios = require('axios');

module.exports = {
  name: 'ytb',
  description: 'Search YouTube for videos',
  author: 'Deku (rest api)',
  async execute(senderId, args, pageAccessToken, sendMessage) {
    const keyWord = args.join(' ');
    if (!keyWord) {
      sendMessage(senderId, { text: 'Please provide a search term for YouTube.' }, pageAccessToken);
      return;
    }

    try {
      const url = `https://www.youtube.com/results?search_query=${encodeURIComponent(keyWord)}`;
      const res = await axios.get(url);
      const getJson = JSON.parse(res.data.split("ytInitialData = ")[1].split(";</script>")[0]);
      const videos = getJson.contents.twoColumnSearchResultsRenderer.primaryContents.sectionListRenderer.contents[0].itemSectionRenderer.contents;
      const results = [];

      for (const video of videos) {
        if (video.videoRenderer) {
          const title = video.videoRenderer.title.runs[0].text;
          const channel = video.videoRenderer.ownerText.runs[0].text;
          const link = `https://www.youtube.com/watch?v=${video.videoRenderer.videoId}`;
          results.push(`**${title}**\nBy: ${channel}\n${link}`);
        }
      }

      if (results.length === 0) {
        sendMessage(senderId, { text: 'No results found for your search.' }, pageAccessToken);
      } else {
        sendMessage(senderId, { text: results.join('\n\n') }, pageAccessToken);
      }
    } catch (error) {
      console.error('Error calling YouTube API:', error);
      sendMessage(senderId, { text: 'There was an error searching YouTube. Please try again later.' }, pageAccessToken);
    }
  }
};
