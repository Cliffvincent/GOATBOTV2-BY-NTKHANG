const axios = require('axios');
const fs = require('fs');
const path = require('path');

const cooldowns = {};

module.exports = {
config: {
  name: 'redroom2',
  version: '1.0',
  author: 'Hazey/Zed',
  countDown: 20,
  role: 2,
  shortDescription: '',
  longDescription: '',
  category: '18+',
  guide: '{pn} redroom',
},

  onStart: async function ({ api, event }) {

  const userId = event.senderID;
  if (cooldowns[userId] && Date.now() - cooldowns[userId] < module.exports.config.cooldowns * 1000) {
    const remainingTime = Math.ceil((cooldowns[userId] + module.exports.config.cooldowns * 1000 - Date.now()) / 1000);
    api.sendMessage(`🕦 𝖧𝖾𝗒 𝖺𝗋𝖾 𝗒𝗈𝗎 𝗌𝗍𝗎𝗉𝗂𝖽? 𝖼𝖺𝗇\'𝗍 𝗒𝗈𝗎 𝗌𝖾𝖾? 𝖨\'𝗆 𝗈𝗇 𝖼𝗈𝗈𝗅𝖽𝗈𝗐𝗇 𝗂𝗇 [ ${remainingTime} ] 𝗌𝖾𝖼𝗈𝗇𝖽𝗌,  `, event.threadID);
    return;
  }

  const args = event.body.split(/\s+/);
  args.shift();

  api.setMessageReaction("💽", event.messageID, (err) => {}, true);

  let url = "https://hazeyy-redroom-v2-api.kyrinwu.repl.co";

  try {
    api.sendMessage("📀 | 𝘚𝘦𝘯𝘥𝘪𝘯𝘨 𝘷𝘪𝘥𝘦𝘰...", event.threadID);

    let { data } = await axios.get(url + "/files");
    let getFiles = await axios.get(url + "/" + data.file, { responseType: "arraybuffer" });

    const randomFileName = `${Math.floor(Math.random() * 99999999)}${data.type}`;
    const filePath = path.join(__dirname, 'cache', randomFileName);

    fs.writeFileSync(filePath, Buffer.from(getFiles.data, 'binary'));

    const message = {
      body: "🎥 𝖧𝖾𝗋𝖾\'𝗌 𝗒𝗈𝗎𝗋 𝗏𝗂𝖽𝖾𝗈 𝗐𝖺𝗍𝖼𝗁 𝗐𝖾𝗅𝗅.",
      attachment: fs.createReadStream(filePath),
    }

     api.sendMessage(message, event.threadID);

    cooldowns[userId] = Date.now();

    api.sendMessage("📬 | 𝖱𝖾𝗆𝗂𝗇𝖽𝖾𝗋: 𝖳𝗁𝖾 𝗏𝗂𝖽𝖾𝗈 𝗐𝗂𝗅𝗅 𝖻𝖾 𝗌𝖾𝗇𝗍 𝗂𝗇 𝖺 𝖿𝖾𝗐 𝗆𝗂𝗇𝗎𝗍𝖾𝗌, 𝖯𝗅𝖾𝖺𝗌𝖾 𝗐𝖺𝗂𝗍 𝖿𝗈𝗋 𝖺 𝗆𝗈𝗆𝖾𝗇𝗍.", event.threadID);

  } catch (error) {
    console.error('🔴 𝗘𝗿𝗿𝗼𝗿 𝗳𝗲𝘁𝗰𝗵𝗶𝗻𝗴 𝗼𝗿 𝘀𝗲𝗻𝗱𝗶𝗻𝗴 𝘁𝗵𝗲 𝘃𝗶𝗱𝗲𝗼', error);
    api.sendMessage('🔴 𝗘𝗿𝗿𝗼𝗿 𝘀𝗲𝗻𝗱𝗶𝗻𝗴 𝘃𝗶𝗱𝗲𝗼', event.threadID, event.messageID);
  }

},
  };