const axios = require("axios");

module.exports = {
  config: {
    name: "joke2",
    aliases: [],
    version: "1.0",
    author: "KSHITIZ",
    countDown: 5,
    role: 0,
    shortDescription: "Get random jokes",
    longDescription: {
      en: "",
    },
    category: "fun",
    guide: {
      en: "{prefix}joke",
    },
  },

  onStart: async function ({ api, event }) {
    try {
      const response = await axios.get("https://api.popcat.xyz/joke");
      const { joke } = response.data;
      const message = ` ${joke}`;
      return api.sendMessage(message, event.threadID);
    } catch (error) {
      console.error(error);
    }
  },
};