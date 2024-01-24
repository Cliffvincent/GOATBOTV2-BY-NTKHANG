const fs = require('fs-extra');
const axios = require('axios');

module.exports = {
 config: {
 name: "clown",
 version: "1.0",
 author: "kshitiz",
 countDown: 5,
 role: 0,
 shortDescription: {
 vi: "",
 en: ""
 },
 longDescription: {
 vi: "",
 en: ""
 },
 category: "meme",
 guide: ""
 },

 onStart: async function ({ api, event, args }) {
 try {
 var linkUp = event.messageReply.attachments[0]?.url || args.join(" ");
 if (!linkUp) return api.sendMessage('Please reply to 1 image', event.threadID, event.messageID);

 const res = await axios.get(`https://api-1.huytran6868.repl.co/imgur?link=${encodeURIComponent(linkUp)}`);
 const link = res.data.uploaded.image;

 const imgResponse = await axios.get(`https://api.popcat.xyz/clown?image=${link}`, { responseType: "arraybuffer" });
 const imgBuffer = Buffer.from(imgResponse.data, "binary");

 fs.writeFileSync('./cache/all.png', imgBuffer);

 const stream = fs.createReadStream('./cache/all.png');

 api.sendMessage(
 {
 body: 'honk🤡',
 attachment: stream,
 },
 event.threadID,
 () => {
 fs.unlinkSync('./cache/all.png');
 }
 );
 } catch (e) {
 return api.sendMessage(e.message, event.threadID, event.messageID);
 }
 }
};