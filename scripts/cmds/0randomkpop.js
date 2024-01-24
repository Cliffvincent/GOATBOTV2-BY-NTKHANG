  const axios = require('axios');
  const request = require('request');
  const fs = require("fs");

module.exports = {
  config: {
    name: "kpop",
    version: "1.0",
    author: "Ralph/Zed",//Ni Convert Ni Zed nwhehwhahah
    countDown: 5,
    role: 0,
    shortDescription: "kpop",
    longDescription: "kpop",
    category: "media",
    guide: "{pn}kpop"
  },
  
  onStart: async function ({ api, event }) {

  api.sendMessage(`⏱️ | Video is sending please wait.`, event.threadID, event.messageID);
axios.get('https://jeka-api.luabot24.repl.co/random/?apikey=ralph').then(res => {
  let ext = res.data.url.substring(res.data.url.lastIndexOf(".") + 1);
  let callback = function () {
          api.sendMessage({
                                                body: ``,
            attachment: fs.createReadStream(__dirname + `/cache/random.${ext}`)
          }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/random.${ext}`), event.messageID);
        };
        request(res.data.url).pipe(fs.createWriteStream(__dirname + `/cache/random.${ext}`)).on("close", callback);
      }) .catch(err => {
                     api.sendMessage("api error status: 200", event.threadID, event.messageID);
    api.setMessageReaction("😢", event.messageID, (err) => {}, true);
                  })     
},
};