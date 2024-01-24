const axios = require('axios');

const typewriterMapping = {
  a: "𝚊", b: "𝚋", c: "𝚌", d: "𝚍", e: "𝚎", f: "𝚏", g: "𝚐", h: "𝚑", i: "𝚒",
  j: "𝚓", k: "𝚔", l: "𝚕", m: "𝚖", n: "𝚗", o: "𝚘", p: "𝚙", q: "𝚚", r: "𝚛",
  s: "𝚜", t: "𝚝", u: "𝚞", v: "𝚟", w: "𝚠", x: "𝚡", y: "𝚢", z: "𝚣",
  A: "𝙰", B: "𝙱", C: "𝙲", D: "𝙳", E: "𝙴", F: "𝙵", G: "𝙶", H: "𝙷", I: "𝙸",
  J: "𝙹", K: "𝙺", L: "𝙻", M: "𝙼", N: "𝙽", O: "𝙾", P: "𝙿", Q: "𝚀", R: "𝚁",
  S: "𝚂", T: "𝚃", U: "𝚄", V: "𝚅", W: "𝚆", X: "𝚇", Y: "𝚈", Z: "𝚉",
  " ": " "
};

module.exports = {
    config: {
      name: "ai2",
      author: "Haru",
      version: "69",
      cooldowns: 5,
      role: 0,
      shortDescription: {
        en: "Interact with an artificial intelligence designed to offer profound answers to your inquiries"
      },
      longDescription: {
        en: "Interact with an artificial intelligence designed to offer profound answers to your inquiries"
      },
      category: "ai",
      guide: {
        en: "{p}{n} [query]"
      }
    },

onStart: async function ({ api, event, args }) {
  try {
    const question = encodeURIComponent(args.join(' '));

    if (!question) {
      api.sendMessage(`𝙸𝚝 𝚊𝚙𝚙𝚎𝚊𝚛𝚜 𝚢𝚘𝚞 𝚏𝚘𝚛𝚐𝚘𝚝 𝚝𝚘 𝚊𝚜𝚔 𝚊 𝚚𝚞𝚎𝚜𝚝𝚒𝚘𝚗. 𝙿𝚕𝚎𝚊𝚜𝚎 𝚙𝚛𝚘𝚟𝚒𝚍𝚎 𝚊 𝚚𝚞𝚎𝚛𝚢 𝚝𝚘 𝚛𝚎𝚌𝚎𝚒𝚟𝚎 𝚊𝚗 𝚒𝚗𝚜𝚒𝚐𝚑𝚝𝚏𝚞𝚕 𝚛𝚎𝚜𝚙𝚘𝚗𝚜𝚎.`, event.threadID, event.messageID);
      return;
    }

    api.sendMessage('⏳ | 𝙸 𝚊𝚖 𝚌𝚞𝚛𝚛𝚎𝚗𝚝𝚕𝚢 𝚙𝚛𝚘𝚌𝚎𝚜𝚜𝚒𝚗𝚐 𝚢𝚘𝚞𝚛 𝚚𝚞𝚎𝚛𝚢. 𝙿𝚕𝚎𝚊𝚜𝚎 𝚠𝚊𝚒𝚝..', event.threadID, event.messageID);

    const response = await axios.post('https://aichat.august-api.repl.co/ai', {
      textInput: question,
      allMessages: [{ user: question }],
      stream: '',
      clickedContinue: false,
    });

    const answer = response.data.answer || '𝙸 𝚊𝚙𝚘𝚕𝚘𝚐𝚒𝚣𝚎, 𝙸 𝚌𝚘𝚞𝚕𝚍 𝚗𝚘𝚝 𝚏𝚒𝚗𝚍 𝚊𝚗 𝚊𝚗𝚜𝚠𝚎𝚛 𝚏𝚘𝚛 𝚢𝚘𝚞𝚛 𝚚𝚞𝚎𝚛𝚢.';

    const typewriterAnswer = answer.split('').map(char => typewriterMapping[char] || char).join('');

    api.sendMessage(`${typewriterAnswer}`, event.threadID, event.messageID);
  } catch (error) {
    console.error('𝙴𝚛𝚛𝚘𝚛 𝚏𝚎𝚝𝚌𝚑𝚒𝚗𝚐 𝚛𝚎𝚜𝚙𝚘𝚗𝚜𝚎:', error);
    api.sendMessage('𝙰𝚗 𝚞𝚗𝚎𝚡𝚙𝚎𝚌𝚝𝚎𝚍 𝚎𝚛𝚛𝚘𝚛 𝚘𝚌𝚌𝚞𝚛𝚛𝚎𝚍 𝚠𝚑𝚒𝚕𝚎 𝚙𝚛𝚘𝚌𝚎𝚜𝚜𝚒𝚗𝚐 𝚢𝚘𝚞𝚛 𝚛𝚎𝚚𝚞𝚎𝚜𝚝. 𝙿𝚕𝚎𝚊𝚜𝚎 𝚝𝚛𝚢 𝚊𝚐𝚊𝚒𝚗 𝚕𝚊𝚝𝚎𝚛.', event.threadID, event.messageID);
   }
 }
};