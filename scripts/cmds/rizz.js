const axios = require('axios');
const fs = require('fs-extra');
const path = require('path');

module.exports = {
  config: {
    name: 'rizz',
    version: '1.5',
    author: 'DAINSLEIF',
    countDown: 8,
    role: 0,
    category: 'fun',
    shortDescription: {
      en: 'Tells a random rizz.'
    },
    longDescription: {
      en: 'Tells a random pickup line fetched from a pickup line API and sends it with an image.'
    },
    guide: {
      en: '{pn}'
    }
  },
  onStart: async function ({ api, event }) {
    try {
      const response = await axios.get('https://vinuxd.vercel.app/api/pickup');

      if (response.status !== 200 || !response.data || !response.data.pickup) {
        throw new Error('Invalid or missing response from pickup line API');
      }

      const pickupline = response.data.pickup;

      const res = await axios.get('https://koree-antonio-api.dreamcorps.repl.co/random-image', { responseType: 'arraybuffer' });
      const imgPath = path.join(__dirname, 'cache', `random-koree.jpg`);
      await fs.outputFile(imgPath, res.data);

      const message = `${pickupline}`;

      const attachment = await api.sendMessage({
        body: message,
        attachment: fs.createReadStream(imgPath),
      }, event.threadID);

      if (!attachment || !attachment.messageID) {
        throw new Error('Failed to send message with pickup line and image');
      }

      console.log(`Sent pickup line with image with message ID ${attachment.messageID}`);

      await fs.remove(imgPath);
    } catch (error) {
      console.error(`Failed to send pickup line with image: ${error.message}`);
      api.sendMessage('Sorry, something went wrong while trying to tell a pickup line with an image. Please try again later.', event.threadID);
    }
  }
};