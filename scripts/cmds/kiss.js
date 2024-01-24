
const DIG = require("discord-image-generation");
const fs = require("fs-extra");
const Discord = require ("discord.js")
const request = require ("node-superfetch");
module.exports = {
  config: {
    name: "kiss",
    version: "1.1",
    author: "sandy",
    countDown: 5,
    role: 0,
    shortDescription: "kiss",
    longDescription: "kiss",
    category: "love",
    guide: {
      en: "   {pn} @tag"
    }
  },

onStart: async function ({ event, message, usersData, args, getLang }) {
    const uid1 = event.senderID;
    const uid2 = Object.keys(event.mentions)[0];
    if (!uid2)
      return message.reply(getLang("noTag"));
    const avatarURL1 = await usersData.getAvatarUrl(uid1);
    const avatarURL2 = await usersData.getAvatarUrl(uid2);
  const img = await new DIG.Kiss().getImage(avatarURL1, avatarURL2);
    const pathSave = `${__dirname}/tmp/${uid1}_${uid2}Kiss.png`;
    fs.writeFileSync(pathSave, Buffer.from(img));
    const content = args.join(' ').replace(Object.keys(event.mentions)[0], "");
    message.reply({
      body: `${(content || "mwuahh😘😘")}`,
      attachment: fs.createReadStream(pathSave)
    }, () => fs.unlinkSync(pathSave));
  }
};