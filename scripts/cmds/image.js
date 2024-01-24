const axios = require('axios');

module.exports = {
  config: {
    name: "image",
    author: "ChatGPT",
    version: "4.0",
    shortDescription: "Search for images using Unsplash API",
    longDescription: "Search for high-quality images using Unsplash API and return a specified number of results.",
    category: "utility",
    guide: {
      vi: "",
      en: ""
    }
  },

  onStart: async function({ args, message, getLang }) {
    try {
      const query = args.join(' ');
      const numResults = parseInt(args[0]) || 5; // Default to 5 if no number is provided
      const url = `https://api.unsplash.com/search/photos?page=1&per_page=${numResults}&query=${query}&client_id=oWmBq0kLICkR_5Sp7m5xcLTAdkNtEcRG7zrd55ZX6oQ`;

      const { data } = await axios.get(url);
      const results = data.results.map(result => result.urls.regular);

      const attachments = await Promise.all(results.map(url => global.utils.getStreamFromURL(url)));

      return message.reply({body: `Here are the top ${numResults} high-quality image results for "${query}" from Unsplash:`, attachment: attachments});
    } catch (error) {
      console.error(error);
      return message.reply("Sorry, I couldn't find any results.")
    }
  }
}