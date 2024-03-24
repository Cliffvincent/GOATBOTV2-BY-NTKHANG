const cheerio = require('cheerio');
const axios = require('axios');

module.exports = {
  config: {
    name: "googleimg",
    author: "luffy",
    version: "2.0",
    shortDescription: "Search for images using Google Images",
    longDescription: "Search for images using Google Images and return a specified number of results.",
    category: "utility",
    guide: {
      vi: "",
      en: ""
    }
  },

  onStart: async function({ args, message, getLang }) {
    try {
      const query = args.join(' ');
      const encodedQuery = encodeURIComponent(query);
      const numResults = parseInt(args[0]) || 5; // Default to 5 if no number is provided
      const url = `https://www.google.com/search?q=${encodedQuery}&tbm=isch`;

      const { data } = await axios.get(url);
      const $ = cheerio.load(data);

      const results = [];
      $('img[src^="https://"]').each(function() {
        results.push($(this).attr('src'));
      });

      const attachments = await Promise.all(results.slice(0, numResults).map(url => global.utils.getStreamFromURL(url)));

      return message.reply({body: `Here are the top ${numResults} image results for "${query}":`, attachment: attachments});
    } catch (error) {
      console.error(error);
      return message.reply("Sorry, I couldn't find any results.");
    }
  }
    }