const axios = require('axios');

module.exports = {
  config: {
    name: "blackpanther",
    aliases: ["blackpanther"],
    version: "1.0",
    author: "Samir",
    countDown: 5,
    role: 0,
    shortDescription: "write something",
    longDescription: "",
    category: "write",
    guide:  {
      vi: "{pn} text | text",
        en: "{pn} text | text"
    }
  },

  onStart: async function ({ message, args, api , event }) {

const fs = require('fs-extra');
const request = require('request');
   const { threadID, messageID, senderID, body } = event;
   let text = args.join(" ")
  if (!text) return api.sendMessage('Please enter the correct format [text1 | text2 ]!', event.threadID, event.messageID);
  const length_0 = parseInt(text.length)
  const text1 = text.substr(0, text.indexOf(' | ')); 
  if (!text1) return api.sendMessage('Please enter the correct format [text1 | text2 ]!', event.threadID, event.messageID);
  const length = parseInt(text1.length)
  const text2 = text.split(" | ").pop()
  if (!text2) return api.sendMessage('Please enter the correct format [text1 | text2 ]!', event.threadID, event.messageID);
  const length_2 = parseInt(text2.length)

   var callback = () => api.sendMessage({body:``,attachment: fs.createReadStream(__dirname + "/assets/guide.png")}, event.threadID, () => fs.unlinkSync(__dirname + "/assets/guide.png"),event.messageID);
   return request(encodeURI(`https://api.memegen.link/images/wddth/${text1}/${text2}.png`)).pipe(fs.createWriteStream(__dirname+'/assets/guide.png')).on('close',() => callback());     
}};