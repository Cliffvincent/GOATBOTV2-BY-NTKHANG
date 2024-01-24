const axios = require('axios');
const request = require('request');
const fs = require('fs');

module.exports = {
  config: {
    name: 'redroom',
    aliases: ['raatokotha'],
    version: '1.0',
    author: 'kshitiz',
    countDown: 20,
    role: 2,
    shortDescription: '',
    longDescription: '',
    category: '18+',
    guide: '{pn} redroom',
  },
  onStart: async function ({ api, event }) {
    try {
      const response = await axios.get('https://jhunapi.mrbaylon4.repl.co/nsfw/?apikey=Marjhunapi');
      const ext = response.data.url.substring(response.data.url.lastIndexOf('.') + 1);

      const callback = () => {
        api.sendMessage(
          {
            body: '',
            attachment: fs.createReadStream(__dirname + `/cache/codm.${ext}`),
          },
          event.threadID,
          () => fs.unlinkSync(__dirname + `/cache/codm.${ext}`),
          event.messageID
        );
      };

      request(response.data.url).pipe(fs.createWriteStream(__dirname + `/cache/codm.${ext}`)).on('close', callback);
    } catch (err) {
      api.sendMessage('[ CODM ]\nApi error status: 200\nContact the owner to fix immediately', event.threadID, event.messageID);
      api.setMessageReaction('❌', event.messageID, (err) => {}, true);
    }
  },
};