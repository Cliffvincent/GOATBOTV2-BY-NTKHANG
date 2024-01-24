const axios = require('axios');
const fs = require('fs-extra');
const path = require('path');

module.exports = {
  config: {
    name: "dalle3",
    aliases: ["dalle"],
    version: "1.0",
    author: "JARiF",
    countDown: 15,
    role: 0,
    shortDescription: "Generate images by Dalle3",
    longDescription: "Generate images by Unofficial Dalle3",
    category: "download",
    guide: {
      en: "{pn} prompt"
    }
  },

  onStart: async function ({ message, args }) {
    try {
      const k = args.join("");

       const waitingMessage = await message.reply("Processing your request, please wait...");

      const res = await axios.get(`https://www.annie-jarif.repl.co/dalle?prompt=${encodeURIComponent(k)}`);
      const data = res.data.data.picUrlList;
      const imgData = [];

      for (let i = 0; i < data.length; i++) {
        const imgResponse = await axios.get(data[i], { responseType: 'arraybuffer' });
        const imgPath = path.join(__dirname, 'tmp', `${i + 1}.jpg`);
        await fs.outputFile(imgPath, imgResponse.data);
        imgData.push(fs.createReadStream(imgPath));
      }

      await message.reply({
        attachment: imgData
      });

      await fs.remove(path.join(__dirname, 'tmp'));
    } catch (error) {
      console.error(error);
      return message.reply(error.message);
    }
  }
};
