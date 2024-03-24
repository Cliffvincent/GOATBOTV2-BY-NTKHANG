const axios = require('axios');
const jimp = require('jimp');
const fs = require('fs');

module.exports = {
  config: {
    name: 'fbcover',
    version: '1.0',
    author: 'munem.',
    countDown: 5,
    role: 0,
    shortDescription: 'Create Facebook banner',
    longDescription: '',
    category: 'image',
    guide: {
      en: '{p}{n} <name> | <subname> | <address> | <phone> | <email> | <color>',
    }
  },

  onStart: async function ({ message, args, event, api }) {
    const info = args.join(' ');
    if (!info){
      return message.reply(`Please enter in the format:\n/fbcover name | subname | address | phone | email | color`);
    } else {
      const msg = info.split('|');
      const name = msg[0];
      const subname = msg[1];
      const address = msg[2];
      const phone = msg[3];
      const email = msg[4];
      const color = msg[5] ? msg[5].trim() : '';

      await message.reply('Processing your cover, senpai....❤️');

      const img = `https://www.nguyenmanh.name.vn/api/fbcover1?name=${name}&uid=${event.senderID}&address=${address}&email=${email}&subname=${subname}&sdt=${phone}&color=${color}&apikey=sr7dxQss`;

      const form = {
        body: '「 Your cover senpai😻❤️ 」',
        attachment: []
      };

      form.attachment[0] = await global.utils.getStreamFromURL(img);
      message.reply(form);
    }
  }
};