const axios = require('axios');
  const request = require('request');
  const fs = require("fs");

module.exports = {
  config: {
    name: "khaby",
    aliases: ["khaby"],
    version: "1.0",
    author: "Sanddddddyyyyyyyy",
    countDown: 5,
    role: 0,
    shortDescription: "make khaby meme",
    longDescription: "",
    category: "write",
    guide:  {
      vi: "{pn} text | text",
      en: "{pn} text | text"
    }
  },

  onStart: async function ({ message, api, event, args, getText }) {

  const axios = require('axios');
  const request = require('request');
  const fs = require("fs");
   const { threadID, messageID, senderID, body } = event;
   let text = args.join(" ")
  if (!text) return api.sendMessage('Please enter the correct format like !khaby Coke | Pepsi.', event.threadID, event.messageID);
  const length_0 = parseInt(text.length)
  const text1 = text.substr(0, text.indexOf("|")); 
  if (!text1) return api.sendMessage('Please enter the correct format like !khaby Coke | Pepsi.', event.threadID, event.messageID);
  const length = parseInt(text1.length)
  const text2 = text.split("|").pop()
  if (!text2) return api.sendMessage('Please enter the correct format like !khaby Coke | Pepsi.', event.threadID, event.messageID);
  const length_2 = parseInt(text2.length)

   var callback = () => api.sendMessage({body:``,attachment: fs.createReadStream(__dirname + "/assets/any.png")}, event.threadID, () => fs.unlinkSync(__dirname + "/assets/any.png"),event.messageID);
   return request(encodeURI(`https://api.memegen.link/images/khaby-lame/${text1}/${text2}.png`)).pipe(fs.createWriteStream(__dirname+'/assets/any.png')).on('close',() => callback());  
} 
};