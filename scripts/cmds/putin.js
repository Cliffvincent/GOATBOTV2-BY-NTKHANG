const DIG = require("discord-image-generation");
const fs = require("fs-extra");

module.exports = {
  config: {
    name: "putin",
    version: "1.1",
    author: "KSHITIZ",
    countDown: 5,
    role: 0,
    shortDescription: "putin meeting",
    longDescription: "",
    category: "meme",
    guide: {
      vi: "",
      en: "{pn} [@tag]"
    }
  },

  onStart: async function ({ event, message, usersData }) {
    const uid = Object.keys(event.mentions)[0]
    if(!uid) return message.reply("Mention someone")
    const avatarURL = await usersData.getAvatarUrl(uid);
    const img = await new DIG.Poutine().getImage(avatarURL);
    const pathSave = `${__dirname}/tmp/${uid}_Poutine.png`;
    fs.writeFileSync(pathSave, Buffer.from(img));
    message.reply({
      attachment: fs.createReadStream(pathSave)
    }, () => fs.unlinkSync(pathSave));
  }
};