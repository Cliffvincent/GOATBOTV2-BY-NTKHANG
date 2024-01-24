const axios = require("axios");

module.exports = {
  config: {
    name: "lyrics",
    version: "1.0",
    author: "MILAN",
    countDown: 5,
    role: 0,
    shortDescription: {
      vi: "Nhận lời bài hát",
      en: "Get song lyrics"
    },
    longDescription: {
      vi: "Nhận lời bài hát với Hình ảnh của họ",
      en: "Get song lyrics with their Images"
    },
    category: "info",
    guide: {
      en: "{pn} <song name>"
    }
  },
  
  onStart: async function ({ api, event, args, message }) {
    try {
      const lyrics = args.join(' ');
      if (!lyrics) {
        return api.sendMessage("Please provide a song name!", event.threadID, event.messageID);
      }
      const { data } = await axios.get(`https://milanbhandari.imageapi.repl.co/lyrics`, {
        params: {
          query: lyrics 
        }
      });
      const messageData = {
        body: `❏Title: ${data.title || ''}\n\n❏Artist: ${data.artist || ''}\n\n❏Lyrics:\n\n ${data.lyrics || ''}`,
        attachment: await global.utils.getStreamFromURL(data.image)
      };
      return api.sendMessage(messageData, event.threadID);
    } catch (error) {
      console.error(error);
      return api.sendMessage("An error occurred while fetching lyrics!", event.threadID, event.messageID);
    }
  }
};