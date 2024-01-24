let axios = require("axios"); 
module.exports = {
  config: {
    name: "imgur",
    aliases: [`imagegur`],
    version: "1.0",
    author: "otiney",
    countDown: 0,
    role: 0,
    shortDescription: "upload any images in imgur server..",
    longDescription: "upload any images in imgur server..",
    category: "utility",
    guide: "{pn} reply or add link of image"
  },

  onStart: async function ({ api, event }) {
    let linkanh = event.messageReply.attachments[0].url || args.join(" ");
    if(!linkanh) return api.sendMessage('Please reply or enter the link 1 image!!!', event.threadID, event.messageID)
    let res = await axios.get(`https://API-Web.miraiofficials123.repl.co/imgur?link=${encodeURIComponent(linkanh)}&apikey=18102004`);
    let img = res.data.data;
  return api.sendMessage(`${img}`, event.threadID, event.messageID)
  }
};