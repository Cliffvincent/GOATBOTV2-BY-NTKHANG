const axios = require("axios");
const fs = require("fs");
const path = require("path");
const request = require("request");

module.exports = {
  config: {
    name: "textpro",
    version: "2.0",
    author: "kshitiz",
    countDown: 5,
    role: 0,
    shortDescription: "",
    longDescription: {
      en: ""
    },
    category: "logo",
    guide: {
      en: "{pn}textpro [ID] [TEXT]"
    }
  },

  onStart: async function ({ api, event, args, message }) {
    const num = args[0]; 
    const text = args.slice(1).join(' ');

    if (num > 181) return api.sendMessage("[🥵] 181 is the limit.", event.threadID, event.messageID);
    if (isNaN(num)) return api.sendMessage("[🥵] Please provide a number, not a letter.", event.threadID, event.messageID);
    if (!text) return api.sendMessage("[!] Add text to proceed.", event.threadID, event.messageID);

    api.sendMessage("[🥵] PROCESSING PLEASE WAIT...", event.threadID, event.messageID);

    var callback = () => api.sendMessage({ body: "", attachment: fs.createReadStream(__dirname + "/cache/textpro.png") }, event.threadID, () => fs.unlinkSync(__dirname + "/cache/textpro.png"), event.messageID);

    request(encodeURI(`https://sakibin.sinha-apiv2.repl.co/api/textpro?number=${num}&text=${text}&apikey=SAKIBIN-FREE-SY6B4X`)).pipe(fs.createWriteStream(__dirname + '/cache/textpro.png')).on('close', () => callback());
  }
};
