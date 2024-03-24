const axios = require('axios');
const jimp = require("jimp");
const fs = require("fs");

module.exports = {
  config: {
    name: "gfx2",
    aliases: ["gfxs2"],
    version: "1.0",
    author: "Samir",
    countDown: 35,
    role: 0,
    shortDescription: "Make A gfx logo",
    longDescription: "Make A gfx logo",
    category: "gfx",
    guide: {
      en: "{p}{n} name",
    }
  },

  onStart: async function ({ message, args }) {
    const text = args.join(" ");
    if (!text) {
      return message.reply(`Please enter a text`);
    } else {
      const img = `https://tanjiro-api.onrender.com/gfx2?name=${encodeURIComponent(text)}&api_key=tanjiro`;		

                 const form = {
        body: `Here's Your GFX logo...`
      };
        form.attachment = []
        form.attachment[0] = await global.utils.getStreamFromURL(img);
      message.reply(form);
        }
}};