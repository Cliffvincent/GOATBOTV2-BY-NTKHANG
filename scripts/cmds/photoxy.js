const axios = require("axios");
const fs = require("fs");
const path = require("path");

module.exports = {
  config: {
    name: "photoxy",
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
      en: "{pn}photooxy [ID] [TEXT]"
    }
  },

  onStart: async function ({ api, event, args }) {
    const { threadID, messageID, senderID } = event;
    const num = parseInt(args[0]);
    const message = args.slice(1).join(' ');

    if (isNaN(num) || num <= 0 || num > 15) {
      return api.sendMessage("[🥵] Please provide a valid number between 1 and 15.", threadID, messageID);
    }

    if (!message) {
      return api.sendMessage("[🥵] Add text to proceed.", threadID, messageID);
    }

    api.sendMessage("[✅] PROCESSING PLEASE WAIT...", threadID, messageID);

    const downloadAndSend = async () => {
      try {
        const response = await axios.get(`https://sakibin.sinha-apiv2.repl.co/api/photooxy/${num}`, {
          params: {
            text: message,
            apikey: "SAKIBIN-FREE-SY6B4X"
          },
          responseType: "stream"
        });

        response.data.pipe(fs.createWriteStream(__dirname + '/cache/photooxy.png'));

        response.data.on('end', () => {
          api.sendMessage({ body: '', attachment: fs.createReadStream(__dirname + "/cache/photooxy.png") }, threadID, () => {
            fs.unlinkSync(__dirname + "/cache/photooxy.png");
          });
        });
      } catch (error) {
        console.error(error);
        api.sendMessage("[😵] An error occurred while processing the request.", threadID, messageID);
      }
    };

    downloadAndSend();
  }
};
