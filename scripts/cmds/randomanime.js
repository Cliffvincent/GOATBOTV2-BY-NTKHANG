module.exports = {
  config: {
    name: "animevideo2",
    aliases: ["randomanime"],
    version: "1.0",
    author: "kshitiz",
    countDown: 20,
    role: 0,
    shortDescription: "get anime video",
    longDescription: "get random anime video",
    category: "anime",
    guide: "{pn} animevdo2",
  },
  onStart: async function ({ api, event }) {
    const axios = require('axios');
    const request = require('request');
    const fs = require("fs");

    try {
      const response = await axios.get('https://jhunapi.mrbaylon4.repl.co/snauzk/?apikey=Marjhunapi');
      const ext = response.data.url.substring(response.data.url.lastIndexOf(".") + 1);

      const callback = function () {
        api.sendMessage({
          body: `YOUR ANIME VIDEO MY SENPAI💗`,
          attachment: fs.createReadStream(__dirname + `/cache/codm.${ext}`)
        }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/codm.${ext}`));
      };

      request(response.data.url).pipe(fs.createWriteStream(__dirname + `/cache/codm.${ext}`)).on("close", callback);
    } catch (err) {
      api.sendMessage("[ ANIME ]\nApi error status: 200\nContact the owner to fix immediately", event.threadID);
      api.setMessageReaction("❌", event.messageID, (err) => {}, true);
    }
  }
};