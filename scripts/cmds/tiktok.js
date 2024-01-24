const axios = require("axios");
const fs = require("fs");
const path = require("path");

module.exports = {
  config: {
    name: "tiktok",
    version: "2.0",
    author: "kshitiz",
    countDown: 20,
    role: 0,
    shortDescription: "Search for TikTok videos",
    longDescription: {
      en: "Search for TikTok videos based on keywords."
    },
    category: "info",
    guide: {
      en: "{pn} <search text>"
    }
  },

  onStart: async function ({ api, event, args, message }) {
    const searchQuery = args.join(" ");

    if (!searchQuery) {
      api.sendMessage("Usage: {pn} <search text>", event.threadID);
      return;
    }

    let searchMessageID;

    api.sendMessage("Searching, please wait...", event.threadID, (err, messageInfo) => {
      searchMessageID = messageInfo.messageID;
    });

    try {
      const apiUrl = `https://hiroshi.hiroshiapi.repl.co/tiktok/searchvideo?keywords=${encodeURIComponent(searchQuery)}`;

      const response = await axios.get(apiUrl);
      const videos = response.data.data.videos;

      if (!videos || videos.length === 0) {
        api.sendMessage("No TikTok videos found for your query.", event.threadID);
      } else {
        const videoData = videos[0];
        const videoUrl = videoData.play;
        const message = `Posted by: ${videoData.author.unique_id}`;
        const filePath = path.join(__dirname, `/cache/tiktok_video.mp4`);
        const writer = fs.createWriteStream(filePath);

        const videoResponse = await axios({ method: 'get', url: videoUrl, responseType: 'stream' });
        videoResponse.data.pipe(writer);

        writer.on('finish', async () => {
          
          await api.sendMessage({
            body: message,
            attachment: fs.createReadStream(filePath)
          }, event.threadID, event.messageID);
          fs.unlinkSync(filePath);

          if (searchMessageID) {
            api.unsendMessage(searchMessageID);
          }
        });
      }
    } catch (error) {
      console.error('Error:', error);
      api.sendMessage("An error occurred while processing the request.", event.threadID);
      if (searchMessageID) {
        api.unsendMessage(searchMessageID);
      }
    }
  }
};