const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports = {
  config: {
    name: "f84",
    aliases: [],
    version: "1.0",
    author: "kshitiz",
    countDown: 5,
    role: 0,
    shortDescription: "Random Farlight Video",
    longDescription: "Random Farlight Video",
    category: "media",
    guide: {
      en: "{pn}f84",
    }
  },

  onStart: async function ({ api, event, args }) {
    try {
      api.sendMessage('Rattle your dags, we got a fight coming.', event.threadID);

      const response = await axios.get('https://farlight.yodi-iyods.repl.co/farlight/?apikey=farlight');
      const videoInfo = response.data;

      const videoUrl = videoInfo.url;

      const videoStreamResponse = await axios.get(videoUrl, { responseType: 'stream' });
      const videoData = videoStreamResponse.data;

      const tempFilePath = '84.mp4';
      const writeStream = fs.createWriteStream(tempFilePath);
      videoData.pipe(writeStream);

      writeStream.on('finish', () => {
        const message = {
          body: 'Come on you eggs, let\'s go make a mess.',
          attachment: fs.createReadStream(tempFilePath),
        };

        api.sendMessage(message, event.threadID, () => {
          fs.unlink(tempFilePath, (err) => {
            if (err) {
              console.error('Error deleting temporary file:', err);
            }
          });
        });
      });
    } catch (error) {
      console.error('Error fetching or sending the video:', error);
      api.sendMessage('Error sending the video.', event.threadID, event.messageID);
    }
  },
};
