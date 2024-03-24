const axios = require('axios');

module.exports = {
  config: {
    name: 'img2',
    aliases: [],
    version: '1.1',
    author: 'unknown 3xd',
    role: 0,
    category: 'utility',
    shortDescription: {
      en: 'Searches Google Images for a given query.'
    },
    longDescription: {
      en: 'Searches Google Images for a given query and returns a list of image results.'
    },
    guide: {
      en: '{pn}<query>'
    }
  },
  onStart: async function ({ api, event, args, message }) {
    
    const query = args.join(' ');
    if (!query) return message.reply(`Please provide a search query.`);

    const response = await axios.get(`https://www.googleapis.com/customsearch/v1`, {
      params: {
        q: query,
        searchType: 'image',
        key: '',
        cx: 'c5b8108dd2da64b29'
      }
    });

    const imageURLs = response.data.items.map(item => item.link);

    const streams = await Promise.all(imageURLs.map(url => global.utils.getStreamFromURL(url)));

  // api.sendMessage(`Results for "${query}":`, event.threadID);

    api.sendMessage({
      body: `Image Results for: ${query}`, 
      attachment: streams
    }, event.threadID, event.messageID);
  }
};