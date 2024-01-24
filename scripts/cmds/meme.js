
const axios = require('axios');

module.exports = {
  config: {
    name: 'meme',
    aliases: ['funnymeme', 'memepic'],
    version: '1.0',
    author: 'Samir Thakuri',
    role: 0,
    category: 'funny',
    shortDescription: {
      en: 'Sends a random meme image.'
    },
    longDescription: {
      en: 'Sends a random meme image fetched from the API.'
    },
    guide: {
      en: '{pn} [search term]'
    }
  },
  onStart: async function ({ api, event, args }) {
    try {
      let url = 'https://api.imgflip.com/get_memes';

      if (args.length > 0) {
        const searchTerm = args.join(' ');
        url = `https://api.imgflip.com/caption_image?template_id=181913649&text0=${searchTerm}`;
      }

      const response = await axios.get(url);

      if (response.status !== 200 || !response.data || !response.data.success) {
        throw new Error('Invalid or missing response from the API');
      }

      let imageURL;

      if (args.length > 0) {
        imageURL = response.data.data.url;
      } else {
        const memes = response.data.data.memes;
        const meme = memes[Math.floor(Math.random() * memes.length)];
        imageURL = meme.url;
      }

      const stream = await global.utils.getStreamFromURL(imageURL);

      if (!stream) {
        throw new Error('Failed to fetch image from URL');
      }

      const messageID = await api.sendMessage({
        body: 'Here is a meme:',
        attachment: stream
      }, event.threadID);

      if (!messageID) {
        throw new Error('Failed to send message with attachment');
      }

      console.log(`Sent meme image with message ID ${messageID}`);
    } catch (error) {
      console.error(`Failed to send meme image: ${error.message}`);
      api.sendMessage('Sorry, something went wrong while trying to send a meme image. Please try again later.', event.threadID);
    }
  }
};