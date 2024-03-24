const axios = require('axios');

module.exports = {
  config: {
    name: "bibleverse",
    aliases: ["verse", "bible"],
    version: "1.0",
    author: "Samir",
    countDown: 5,
    role: 0,
    shortDescription: {
      en: "Sends a random Bible verse."
    },
    longDescription: {
      en: "This command uses the Bible API to send a random Bible verse."
    },
    category: "utility",
    guide: {
      en: "To use the command, type {pn} bibleverse. The bot will then send a random Bible verse."
    }
  },
  onStart: async function ({ api, event, args }) {
    try {
      const response = await axios.get("https://labs.bible.org/api/?passage=random&type=json");

      if (response.status === 200 && response.data.length > 0) {
        const verse = response.data[0];
        const message = `${verse.bookname} ${verse.chapter}:${verse.verse} - ${verse.text}`;
        api.sendMessage(message, event.threadID);
      } else {
        api.sendMessage("Sorry, an error occurred while getting the Bible verse.", event.threadID);
      }
    } catch (error) {
      api.sendMessage("Sorry, an error occurred while getting the Bible verse.", event.threadID);
    }
  }
};