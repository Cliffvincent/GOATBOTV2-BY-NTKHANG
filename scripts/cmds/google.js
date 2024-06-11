const { GoatWrapper } = require('fca-liane-utils');

let fontEnabled = true;

function formatFont(text) {
  const fontMapping = {
    a: "𝖺", b: "𝖻", c: "𝖼", d: "𝖽", e: "𝖾", f: "𝖿", g: "𝗀", h: "𝗁", i: "𝗂", j: "𝗃", k: "𝗄", l: "𝗅", m: "𝗆",
    n: "𝗇", o: "𝗈", p: "𝗉", q: "𝗊", r: "𝗋", s: "𝗌", t: "𝗍", u: "𝗎", v: "𝗏", w: "𝗐", x: "𝗑", y: "𝗒", z: "𝗓",
    A: "𝖠", B: "𝖡", C: "𝖢", D: "𝖣", E: "𝖤", F: "𝖥", G: "𝖦", H: "𝖧", I: "𝖨", J: "𝖩", K: "𝖪", L: "𝖫", M: "𝖬",
    N: "𝖭", O: "𝖮", P: "𝖯", Q: "𝖰", R: "𝖱", S: "𝖲", T: "𝖳", U: "𝖴", V: "𝖵", W: "𝖶", X: "𝖷", Y: "𝖸", Z: "𝖹"
  };

  let formattedText = "";
  for (const char of text) {
    if (fontEnabled && char in fontMapping) {
      formattedText += fontMapping[char];
    } else {
      formattedText += char;
    }
  }

  return formattedText;
}

module.exports = {
  config: {
    name: "google",
    aliases: [],
    version: "1.0",
    author: "cliff",
    countDown: 5,
    role: 0,
    category: "𝗔𝗜"
  },
  onStart: async function({ api, event, message, args }) {
    const axios = require('axios');

    let user = args.join(' ');

    try {
      if (!user) {
        return api.sendMessage(formatFont('Please provide a question first!'), event.threadID, event.messageID);
      }

      const cliff = await new Promise(resolve => {
        api.sendMessage(formatFont('🔍 Searching Please Wait....'), event.threadID, (err, info1) => {
          resolve(info1);
        }, event.messageID);
      });

      const response = await axios.get(`http://158.101.198.227:8609/google?prompt=${encodeURIComponent(user)}`);
      const responseData = response.data.response;
      const baby = `(𝗨𝗟𝗠 𝗠𝗢𝗗𝗘𝗟-Trained by Google)\n▱▱▱▱▱▱▱▱▱▱▱▱▱▱▱\n${responseData}`;
      api.editMessage(formatFont(baby), cliff.messageID);
    } catch (err) {
      console.error(err);
      return api.sendMessage('An error occurred while processing your request.', event.threadID, event.messageID);
    }
  }
};


const wrapper = new GoatWrapper(module.exports);
wrapper.applyNoPrefix({ allowPrefix: true });