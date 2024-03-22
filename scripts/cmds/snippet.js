const axios = require('axios');

module.exports = {
  config: {
    name: "snippet",
    version: "1.0",
    author: "Samir Œ",
    countDown: 5,
    role: 0,
    shortDescription: {
      vi: "",
      en: "Create an image."
    },
    longDescription: {
      vi: "",
      en: "Create an image."
    },
    category: "𝗙𝗨𝗡",
    guide: {
      vi: "{pn} <text> | <backgroundColor>",
      en: "{pn} <text> | <backgroundColor>"
    }
  },

  onStart: async function ({ api, event, args, message }) {
    const input = args.join(" ");
    const [text, backgroundColor] = input.split("∆").map(part => part.trim());

    if (!text) {
      return message.reply("Please provide a prompt.");
    }

    message.reply("Initializing image, please wait...", async (err, info) => {
      let id = info.messageID;
      try {
        const API = `https://api-samir.onrender.com/carbon?code=${encodeURIComponent(text)}&themeNumber=${encodeURIComponent(backgroundColor || "5")}`;
        const imageStream = await global.utils.getStreamFromURL(API);
        message.unsend(id);
        message.reply({
          body: `  `,
          attachment: imageStream
        }, async (err, info) => {
        });
      } catch (error) {
        console.error(error);
        api.sendMessage(`Error: ${error}`, event.threadID);
      }
    });
  }
};
