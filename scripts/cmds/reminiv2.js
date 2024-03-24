const axios = require('axios');
const fs = require('fs-extra');

module.exports = {
  config: {
    name: "remini2",
    aliases: [],
    author: "Hazeyy/kira", // hindi ito collab, ako kasi nag convert :>
    version: "69",
    cooldowns: 5,
    role: 0,
    shortDescription: {
      en: "remini filter"
    },
    longDescription: {
      en: "remini filter"
    },
    category: "img",
    guide: {
      en: "{p}{n} [reply to an img]"
    }
  },

  onStart: async function ({ api, event }) {
    const args = event.body.split(/\s+/);
    args.shift();

    const pathie = __dirname + `/cache/zombie.jpg`;
    const { threadID, messageID } = event;

    const photoUrl = event.messageReply.attachments[0] ? event.messageReply.attachments[0].url : args.join(" ");

    if (!photoUrl) {
      api.sendMessage("📸 𝖯𝗅𝖾𝖺𝗌𝖾 𝗋𝖾𝗉𝗅𝗎 𝗍𝗈 𝖺 𝗉𝗁𝗈𝗍𝗈 𝗍𝗈 𝗉𝗋𝗈𝖼𝖾𝖾𝖽 𝖾𝗇𝗁𝖺𝗇𝖼𝗂𝗇𝗀 𝗂𝗆𝖺𝗀𝖾𝗌.", threadID, messageID);
      return;
    }

    api.sendMessage("🕟 | 𝖤𝗇𝗁𝖺𝗇𝖼𝗂𝗇𝗀, 𝗉𝗅𝖾𝖺𝗌𝖾 𝗐𝖺𝗂𝗍 𝖿𝗈𝗋 𝖺 𝗆𝗈𝗆𝖾𝗇𝗍...", threadID, async () => {
      try {
        const response = await axios.get(`https://hazeyy-apis-combine.kyrinwu.repl.co/api/try/remini?url=${encodeURIComponent(photoUrl)}`);
        const processedImageURL = response.data.image_data;
        const img = (await axios.get(processedImageURL, { responseType: "arraybuffer" })).data;

        fs.writeFileSync(pathie, Buffer.from(img, 'binary'));

        api.sendMessage({
          body: "✨ 𝖤𝗇𝗁𝖺𝗇𝖼𝖾𝖉 𝖲𝗎𝖼𝖼𝖾𝗌𝖿𝗎𝗅𝗅𝗒",
          attachment: fs.createReadStream(pathie)
        }, threadID, () => fs.unlinkSync(pathie), messageID);
      } catch (error) {
        api.sendMessage(`🔴 𝖤𝗋𝗋𝗈𝗋 𝗉𝗋𝗈𝖼𝖾𝗌𝗌𝗂𝗇𝗀 𝗂𝗆𝖺𝗀𝖾: ${error}`, threadID, messageID);
      }
    });
  }
};