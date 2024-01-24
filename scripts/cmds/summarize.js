const axios = require('axios');

module.exports = {
  config: {
    name: "summarize",
    aliases: ["summ", " summa"],
    version: "1.1",
    author: "LiANE",
    countDown: 5,
    role: 0,
    shortDescription: { vi: "", en: "Ask summarize Ai" },
    longDescription: { vi: "", en: "Ask summarize ai" },
    category: "ai",
    guide: { vi: "", en: "{pn} <your_chat>" }
  },
  onStart: async function({ api, args, event, message }) {
    const response = args.join("").replace("", "+");
const userData = "👀";

    if (args.length === 0) {
      message.reply(`📝 𝗦𝘂𝗺𝗺𝗮𝗿𝗶𝘇𝗲𝗿:
~ 𝚝𝚢𝚙𝚎 .,/help summarize 𝚝𝚘 𝚜𝚎𝚎 𝚍𝚎𝚜𝚌𝚛𝚒𝚙𝚝𝚒𝚘𝚗.

⛔ 𝗘𝗥𝗥: No input or too short to summarize.`);
      return;
    }

    try {
      const res = await axios.get(`https://hercai.onrender.com/v2/hercai?question=summarize-${response}`);
      const responseData = res.data;

      // Parsing the JSON response and extracting the "content" and "reply" fields
      const content = responseData.content;
      const reply = responseData.reply;

      message.reply(`📝 𝗦𝘂𝗺𝗺𝗮𝗿𝗶𝘇𝗲𝗿:

${reply}`);
    } catch (error) {
      console.error(error);
      message.reply(`📝 𝗦𝘂𝗺𝗺𝗮𝗿𝗶𝘇𝗲𝗿:

An error occurred.`);
    }
  }
};