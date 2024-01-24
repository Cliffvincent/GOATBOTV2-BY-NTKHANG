const axios = require('axios');
const request = require('request');
const fs = require('fs');

module.exports = {
  config: {
    name: 'randomedit',
    aliases: [],
    version: '1.0',
    author: 'jonell x kshitiz',
    countDown: 10,
    role: 0,
    shortDescription: 'send a random video edit from TikTok',
    longDescription: 'Send a random video edit from TikTok.',
    category: 'media',
    guide: '{pn} randomedit',
  },

  onStart: async function ({ api, event, args }) {
    
    api.sendMessage('⏱️ | Video is being sent, please wait...', event.threadID, event.messageID);

    try {
      const response = await axios.get('https://api-edit-alightmotion.jonellmagallanes400.repl.co/cc/?apikey=editor');

      const ext = response.data.url.substring(response.data.url.lastIndexOf('.') + 1);
      const filePath = __dirname + '/cache/edit.mp4';

      const callback = () => {
        api.sendMessage({
          body: 'Random Edit From Tiktok',
          attachment: fs.createReadStream(filePath),
        }, event.threadID, () => fs.unlinkSync(filePath));
      };

      request(response.data.url).pipe(fs.createWriteStream(filePath)).on('close', callback);
    } catch (err) {
      console.error(err);
      api.sendMessage('[EDIT]\nAPI error status: 200\nContact the owner to fix immediately🛠', event.threadID, event.messageID);
      api.setMessageReaction('❌', event.messageID, (error) => {}, true);
    }
  },
};
