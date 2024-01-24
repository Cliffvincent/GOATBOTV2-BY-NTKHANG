const axios = require("axios");

module.exports = {
  config: {
    name: "pti",
    version: "1.0",
    author: "Jsus",
    shortDescription: "Gen Pics",
    longDescription: "Generate a picture based on a prompt using the DALL-E API",
    category: "image",
    guide: {
      en: "{prefix}pti <prompt>",
    },
  },

  langs: {
    en: {
      syntaxError: "⚠️ Please enter a prompt",
      error: "❗ An error has occurred, please try again later",
    },
  },

  onStart: async function ({ message, args, getLang }) {
    // Get the prompt from the user's input
    const prompt = args.join(" ");
    if (!prompt) return message.reply(getLang("syntaxError"));

    try {
      // Send a request to the DALL-E API to generate an image based on the prompt
      const response = await axios.post("https://api.openai.com/v1/images/generations", {
        prompt: prompt,
        size: [512, 512],
        response_format: "url",
        api_key: "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", // Set your API key
      }, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Send the generated image as a reply to the user
      message.reply({
        body: "",
        attachment: await global.utils.getStreamFromURL(response.data.data[0].url)
      });
    } catch (error) {
      console.error(error);
      message.reply(getLang("error"));
    }
  },
};