const axios = require('axios');
const fs = require('fs');
module.exports = {
 config: {
  name: "pet",
  version: "1.1",
  author: "MILAN",
  countDown: 10,
  role: 0,
  shortDescription: {
    vi: "Làm thú cưng cho ai đó.",
    en: "Pet someone."
  },
  longDescription: {
    vi: "Làm thú cưng cho ai đó.",
    en: "Mak pet to someone."
  },
  category: "fun",
  guide: {
    vi: "{pn} [ chỗ trống | trả lời | đề cập | uid ]",
    en: "{pn} [ blank | reply | mention | uid ]"
  }
 },

 onStart: async function({ event, api, args , message }) {
    const { threadID, messageID, senderID, body } = event;
    let id;
    if (args.join().indexOf('@') !== -1) {
      id = Object.keys(event.mentions);
    } else {
      id = args[0] || senderID;
    }
    if (event.type == "message_reply") {
      id = event.messageReply.senderID;
    }

    const response = await axios.get(`https://milanbhandari.imageapi.repl.co/pet?uid=${id}`, { responseType: 'stream' });
    const tempFilePath = './temp.png';
    const writer = fs.createWriteStream(tempFilePath);
    response.data.pipe(writer);

    writer.on('finish', async () => {
      const attachment = fs.createReadStream(tempFilePath);
      await api.sendMessage({ body: "My Pet", attachment: attachment }, threadID, messageID);

      fs.unlinkSync(tempFilePath);
    });
  }
};