const fs = require("fs-extra");
const { utils } = global;

module.exports = {
  config: {
    name: "resetprefix",
    version: "1.0",
    author: "Shikaki",
    countDown: 5,
    role: 2,
    shortDescription: "Reset the bot's prefix by using resetprefix",
    longDescription: "Reset the command prefix in your chat to the default value by using resetprefix",
    category: "config",
    guide: {
      en: "resetprefix",
    },
  },

  onStart: async function ({ message, args, threadsData }) {
    if (!args[0]) {
      return message.SyntaxError();
    }
  },
 
  onChat: async function ({ event, message, threadsData }) {
    if (event.body && event.body.toLowerCase() === "resetprefix") {
      // Reset the prefix using threadsData
      await threadsData.set(event.threadID, null, "data.prefix");
      return message.reply("✅ The prefix has been reset to its default value.");
    }
  }
};
