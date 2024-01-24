const axios = require('axios');

module.exports = {
  config: {
    name: 'rizz2',
    version: '2.0',
    author: 'kshitiz',
    countDown: 8,
    role: 0,
    category: 'fun',
    shortDescription: {
      en: 'Tells a random rizz.'
    },
    longDescription: {
      en: 'Tells a random rizz line fetched from a rizz line API.'
    },
    guide: {
      en: '{pn} rizz'
    }
  },
  onStart: async function ({ api, event }) {
    try {
      const response = await axios.get('https://vinuxd.vercel.app/api/pickup');

      if (response.status !== 200 || !response.data || !response.data.pickup) {
        throw new Error('Invalid or missing response from pickup line API');
      }

      const pickupline = response.data.pickup;

      const message = `${pickupline}`;

      const attachment = await api.sendMessage({
        body: message,
        mentions: [{
          tag: event.senderID,
          id: event.senderID,
          fromIndex: message.indexOf(message),
          toIndex: message.length
        }],
      }, event.threadID);

      if (!attachment || !attachment.messageID) {
        throw new Error('Failed to send message with rizz line');
      }

      console.log(`Sent pickup line as a reply with message ID ${attachment.messageID}`);
    } catch (error) {
      console.error(`Failed to send pickup line : ${error.message}`);
      api.sendMessage('Sorry, something went wrong while trying to tell a rizz line. Please try again later.', event.threadID);
    }
  }
};