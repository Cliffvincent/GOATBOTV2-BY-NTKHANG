const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports = {
  config: {
    name: "motivationalvideo",
    aliases: ["mv"],
    version: "1.0",
    author: "August Quinn x kshitiz",
    countDown: 5,
    role: 0,
    shortDescription: "Get a random motivational video",
    longDescription: "Get a random motivational video",
    category: "fun",
  },

  onStart: async function ({ api, event, args }) {
    try {
      const processingMessage = await api.sendMessage(
        {
          body: '🔄 Initializing the video. Please be patient...',
        },
        event.threadID
      );

      const response = await axios.get('https://motivational.august-api.repl.co/video', { timeout: 120000 }); // Increased timeout
      const videoData = response.data;

      if (!videoData.url) {
        return api.sendMessage('An error occurred while fetching the motivational video. Please try again later.', event.threadID, event.messageID);
      }

      const mp4Url = videoData.url.replace(/\.([a-z0-9]+)(?:[\?#]|$)/i, '.mp4$1');

      const videoResponse = await axios.get(mp4Url, { responseType: 'arraybuffer', timeout: 120000 }); // Increased timeout

      const videoPath = path.join(__dirname, 'cache', 'video.mp4');
      fs.writeFileSync(videoPath, Buffer.from(videoResponse.data, 'binary'));

      await api.sendMessage(
        {
          attachment: fs.createReadStream(videoPath),
          body: `🎥 𝗠𝗢𝗧𝗜𝗩𝗔𝗧𝗜𝗢𝗡𝗔𝗟 𝗩𝗜𝗗𝗘𝗢\n\n  – “${videoData.title}”`,
        },
        event.threadID
      );

      fs.unlink(videoPath, (err) => {
        if (err) {
          console.error(`Error deleting file: ${err}`);
        } else {
          console.log(`Clear File Successfully for Motivational video: ${videoPath}`);
        }
      });
    } catch (error) {
      console.error('Error processing Motivational Video command:', error);

      if (axios.isAxiosError(error) && error.code === 'ECONNABORTED') {
        api.sendMessage('The request timed out. Please try again later.', event.threadID);
      } else {
        api.sendMessage(
          'Timeout! An error occurred while processing the Motivational Video. Please try again later.',
          event.threadID
        );
      }
    }
  },
};