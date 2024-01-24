const axios = require('axios');
const jimp = require("jimp");
const fs = require("fs");

module.exports = {
  config: {
    name: "condom",
    aliases: ["condom"],
    version: "1.0",
    author: "Samir",
    countDown: 5,
    role: 0,
    shortdescription: "Make fun of your friends",
    longDescription: "Make fun of your friends using crazy condom fails",
    category: "fun",
    guide: ""
  },

  onStart: async function ({ message, event, args }) {
    const mention = Object.keys(event.mentions);
    if (mention.length == 0) {
      message.reply("You must select tag a person");
      return;
    }

    let one;
    if (mention.length == 1) {
      one = mention[0];
    } else {
      one = mention[0];
    }

    try {
      const imagePath = await bal(one);
      await message.reply({
        body: "Ops Crazy Condom Fails😆",
        attachment: fs.createReadStream(imagePath)
      });
    } catch (error) {
      console.error("Error while running command:", error);
      await message.reply("an error occurred");
    }
  }
};
async function bal(one) {
  const avatarone = await jimp.read(`https://graph.facebook.com/${one}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`);
  const image = await jimp.read("https://i.imgur.com/cLEixM0.jpg");
  image.resize(512, 512).composite(avatarone.resize(263, 263), 256, 258);
  const imagePath = "condom.png";
  await image.writeAsync(imagePath);
  return imagePath;
}