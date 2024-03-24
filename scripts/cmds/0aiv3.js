const axios = require('axios');

module.exports = {
    config: {
      name: "ai3",
      author: "August Quinn/kira", // hindi ito collab, ako kasi nag convert :>
      version: "69",
      cooldowns: 5,
      role: 0,
      shortDescription: {
        en: "august AI ask anything"
      },
      longDescription: {
        en: "August AI ask anything"
      },
      category: "ai",
      guide: {
        en: "{p}{n} [text]"
      }
    },

onStart: async function({ api, args, event }) {
  try {
    const text = args.join(' ');

    if (!text) {
      api.sendMessage('Please provide some text for testing.', event.threadID, event.messageID);
      return;
    }

    const apiUrl = 'https://chatgpt.august-api.repl.co/response';
    const response = await axios.post(apiUrl, { prompt: text });

    if (response.data && response.data.answer) {
      const answer = response.data.answer.trim();
      api.sendMessage(`${answer}`, event.threadID, event.messageID);
    } else {
      api.sendMessage('An error occurred while testing. Please try again later.', event.threadID, event.messageID);
    }
  } catch (error) {
    console.error('Error in AI command:', error);
    api.sendMessage('An error occurred while testing. Please try again later.', event.threadID, event.messageID);
    }
  }
};