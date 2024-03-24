const axios = require("axios");

module.exports = {
  config: {
    name: "news",
    version: "1.0.0",
    author: "XyryllPanget",
    countDown: 5,
    role: 0,
    shortDescription: {
      vi: "Lấy tin tức mới nhất.",
      en: "Get the latest news.",
    },
    longDescription: {
      vi: "Lệnh này lấy các tin tức mới nhất từ API và trả về.",
      en: "This command fetches the latest news from an API and returns them.",
    },
    category: "Utility",
    guide: {
      vi: "Để sử dụng lệnh này, hãy gõ !news.",
      en: "To use this command, type !news.",
    },
  },

  langs: {
    vi: {},
    en: {},
  },

  onStart: async function ({ api, event }) {
    try {
      const response = await axios.get('https://sensui-useless-apis.codersensui.repl.co/api/tools/news');
      const newsdata = response.data;

      let message = '';
      for (const { title, source } of newsdata) {
        message += `Title: ${title}\nSource: ${source}\n\n`;
      }

      if (message === '') {
        message = 'No news articles found.';
      }
      api.sendMessage(message, event.threadID, event.messageID);
    } catch (error) {
      console.error('Something went wrong:', error);
      api.sendMessage('Something went wrong while fetching from the API. Please try again.', event.threadID, event.messageID);
    }
  }
};
