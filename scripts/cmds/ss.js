const axios = require('axios');
module.exports = {
  config: {
    name: "ss",
    aliases: ["screenshot"],
    version: "1.0",
    author: "MILAN",
    countDown: 5,
    role: 0,
    shortDescription: "get screenshot of website",
    longDescription: "get screenshot of website",
    category: "media",
    guide: "{pn} link"
  },

  onStart: async function ({ message, args }) {
    const url = args.join(" ");
    if (!url) {
      return message.reply(`⚠️ | Please enter an url!`);
    } else {
      try {
        const BASE_URL = `https://milanbhandari.imageapi.repl.co/screenshot?url=${encodeURIComponent(url)}`;
        const form = {
          body: ``
        };
        form.attachment = []
        form.attachment[0] = await global.utils.getStreamFromURL(BASE_URL);
        message.reply(form); 
      } catch (e) { 
        message.reply(`Error`);
      }
    }
  }
};