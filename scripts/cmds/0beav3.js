const fs = require("fs");
const similarity = require("similarity");

module.exports = {
  config: {
    name: "beav3",
    version: "2.1",
    author: "Zed",
    usages: "sophia [text]",
    countDown: 3,
    role: 0,
    shortDescription: {
      en: "Bebetime With Sophia"
    },
    longDescription: {
      en: "Bebetime With Sophia"
    },
    category: "bea",
    guide: {
      en: "{p}sophia your ask"
    }
  },

  onStart: async function ({ api, event, args }) {
    const path = 'scripts/cmds/others/bea.json'; // Changed path here

    if (!fs.existsSync(path)) return api.sendMessage("Sophia Data Not Found", event.threadID, event.messageID);

    const data = JSON.parse(fs.readFileSync(path));
    const question = args.join(" ");

    if (!question) return api.sendMessage("╭┈ ❒ 𝘂𝘀𝗮𝗴𝗲 :\n╰┈➤ Type: bea [text]", event.threadID, event.messageID);

    let bestMatch = "";
    let highestScore = 0;

    for (const key in data) {
      const score = similarity(question, key);
      if (score > highestScore) {
        highestScore = score;
        bestMatch = key;
      }
    }

    if (highestScore < 0.5) return api.sendMessage("❔", event.threadID, event.messageID);

    const responses = data[bestMatch];
    const response = responses[Math.floor(Math.random() * responses.length)];

    api.sendMessage(response, event.threadID, event.messageID);
  }
};