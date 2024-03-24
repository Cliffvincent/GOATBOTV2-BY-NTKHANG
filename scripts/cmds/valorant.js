const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports = {
  config: {
    name: "valorant",
    version: "1.0",
    author: "Hvcker/Zed",
    countDown: 5,
    role: 0,
    shortDescription: "Send Random Valorant Clips",
    longDescription: "Send Random Valorant Clips",
    category: "box chat",
    guide: "{pn} valorant"
  },

  onStart: async function ({ api, event }) {
  try {
    api.sendMessage('Hello Players Please Wait..', event.threadID);

    const response = await axios.get('https://valo-api.yodi-iyods.repl.co/video/?apikey=valorant');
    const videoInfo = response.data;

    const videoUrl = videoInfo.url;

  
    const videoStreamResponse = await axios.get(videoUrl, { responseType: 'stream' });
    const videoData = videoStreamResponse.data;

    
    const tempFilePath = 'temp_video.mp4';
    const writeStream = fs.createWriteStream(tempFilePath);
    videoData.pipe(writeStream);

    writeStream.on('finish', () => {
      
      const message = {
        body: 'Here is your random Valorant video:',
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