const axios = require('axios');
const jimp = require("jimp");
const fs = require("fs");

module.exports = {
  config: {
    name: "wanted",
    aliases: ["chorgang"],
    version: "1.0",
    author: "AceGun",
    countDown: 5,
    role: 0,
    shortdescription: "wanted frame for fun purpose",
    longDescription: "",
    category: "fun",
    guide: "{pn}wanted @tag @tag"
  },

  onStart: async function ({ message, event, args }) {
    const mention = Object.keys(event.mentions);
    if (mention.length < 2) {
      message.reply("Tag your two friends to invite them in wanted frame");
      return;
    }

    // Add the sender ID to the `mention` array
    mention.push(event.senderID);

    let [one, two, three] = mention;

    try {
      const imagePath = await bal(one, two, three);
      await message.reply({
        body: "These guys are wanted",
        attachment: fs.createReadStream(imagePath)
      });
    } catch (error) {
      console.error("Error while running command:", error);
      await message.reply("an error occurred");
    }
  }
};

async function bal(one, two, three) {
  const avatarOne = await jimp.read(`https://graph.facebook.com/${one}/picture?width=512&height=512&access_token=66262`);
  const avatarTwo = await jimp.read(`h8568379%7Cc1e620fa708a1d5696fb991c1bde56ttps://graph.facebook.com/${two}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`);
  const avatarThree = await jimp.read(`https://graph.facebook.com/${three}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`);

  const image = await jimp.read("https://i.ibb.co/7yPR6Xf/image.jpg");
  image.resize(2452, 1226).composite(avatarOne.resize(405, 405), 206, 345).composite(avatarTwo.resize(400, 400), 1830, 350).composite(avatarThree.resize(450, 450), 1010, 315);
  const imagePath = "Wanted.png";
  await image.writeAsync(imagePath);
  return imagePath;
}