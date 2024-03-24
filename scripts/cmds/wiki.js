const axios = require('axios');
const fs = require("fs-extra");

module.exports = {
  config: {
    name: "wiki",
    aliases: ["wiki"],
    version: "2.0",
    author: "MILAN",
    countDown: 5,
    role: 0,
    shortDescription: "search on wikipedia",
    longDescription: "",
    category: "study",
    guide: {
      vi: "{pn} text",
      en: "{pn} text"
    }
  },

  onStart: async function ({ api,event,args, message }) {
 const wiki = require("wikijs").default;
 const content = args.join(" ");
    if (!content)
      return message.reply(`Missing Input`);
 let url = 'https://en.wikipedia.org/w/api.php';
 if (args[0] == "en") {
 url = 'https://en.wikipedia.org/w/api.php'; 
 content = args.slice(1, args.length);
 }
 if (!content) return api.sendMessage(("Missing Input"), event.threadID, event.messageID);
 return wiki({ apiUrl: url }).page(content).catch(() => api.sendMessage(("Not Found", content), event.threadID, event.messageID)).then(page => (typeof page != 'undefined') ? Promise.resolve(page.summary()).then(val => api.sendMessage(val, event.threadID, event.messageID)) : '');

}
};