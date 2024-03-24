const axios = require('axios');

module.exports = {
    config: {
      name: "karma",
      author: "August Quinn/kira",
      version: "69",
      cooldowns: 5,
      role: 0,
      shortDescription: {
        en: "Get a karma quote."
      },
      longDescription: {
        en: "Get a karma quote."
      },
      category: "fun",
      guide: {
        en: "{p}{n}"
      }
    },

onStart: async function ({ api, event }) {
  try {
    const response = await axios.get('https://karmaquotes.august-api.repl.co/quotes');
    const karmaQuotes = response.data;

    if (karmaQuotes.length === 0) {
      return api.sendMessage('No karma quotes available, please try again later.', event.threadID, event.messageID);
    }

    const randomIndex = Math.floor(Math.random() * karmaQuotes.length);
    const randomKarmaQuote = karmaQuotes[randomIndex];

    const message = `💬 𝗞𝗔𝗥𝗠𝗔 𝗤𝗨𝗢𝗧𝗘:\n\n ➩ ${randomKarmaQuote.quote}`;

    api.sendMessage(message, event.threadID, event.messageID);
  } catch (error) {
    console.error(error);
    api.sendMessage('An error occurred while fetching karma quotes. Please try again later.', event.threadID, event.messageID);
    }
  }
};
