const axios = require("axios");

module.exports = {
  config: {
    name: "sad",
    aliases: ["sad quote"],
    version: "1.0",
    author: "RICKCIEL X KSHITIZ",
    countDown: 5,
    role: 0,
    shortDescription: "GENERAL QUOTES",
    longDescription: {
      en: "Get random sad quotes.",
    },
    category: "fun",
    guide: {
      en: "{prefix}sad",
    },
  },

  onStart: async function ({ api, event }) {
    try {
      const response = await axios.get("https://api-1.chatbotmesss.repl.co/api/sadquotes1");
      const { quote, author } = response.data;
      const message = ` ${quote}`;
      return api.sendMessage(message, event.threadID);
    } catch (error) {
      console.error(error);
    }
  },
};
