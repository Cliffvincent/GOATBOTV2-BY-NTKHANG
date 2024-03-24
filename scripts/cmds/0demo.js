const axios = require('axios');
const fs = require('fs');
const gtts = require('gtts');

function formatFont(text) {
  const fontMapping = {
    a: "𝖺", b: "𝖻", c: "𝖼", d: "𝖽", e: "𝖾", f: "𝖿", g: "𝗀", h: "𝗁", i: "𝗂", j: "𝗃", k: "𝗄", l: "𝗅", m: "𝗆",
    n: "𝗇", o: "𝗈", p: "𝗉", q: "𝗊", r: "𝗋", s: "𝗌", t: "𝗍", u: "𝗎", v: "𝗏", w: "𝗐", x: "𝗑", y: "𝗒", z: "𝗓",
    A: "𝖠", B: "𝖡", C: "𝖢", D: "𝖣", E: "𝖤", F: "𝖥", G: "𝖦", H: "𝖧", I: "𝖨", J: "𝖩", K: "𝖪", L: "𝖫", M: "𝖬",
    N: "𝖭", O: "𝖮", P: "𝖯", Q: "𝖰", R: "𝖱", S: "𝖲", T: "𝖳", U: "𝖴", V: "𝖵", W: "𝖶", X: "𝖷", Y: "𝖸", Z: "𝖹"
  };

  let formattedText = "";
  for (const char of text) {
    if (char in fontMapping) {
      formattedText += fontMapping[char];
    } else {
      formattedText += char;
    }
  }

  return formattedText;
}

async function convertImageToText(imageURL) {
  try {
    const response = await axios.get(`https://hazeyy-api-img2text.kyrinwu.repl.co/api/recognition/image2text?input=${encodeURIComponent(imageURL)}`);
    return response.data.extractedText;
  } catch (error) {
    console.error(error);
    return null;
  }
}

module.exports = {
config: {
  name: "demo",
  aliases: [],
  author: "Hazeyy/Zed",//convert By Zed
  version: "1.0",
  cooldowns: 5,
  role: 0,
  shortDescription: {
    en: "demo AI"
  },
  longDescription: {
    en: "demo AI"
  },
  category: "ai",
  guide: {
    en: "{p}{n} [query]"
  }
},

    onStart: async function ({ api, event }) {

  const { threadID, messageID, type, messageReply, body } = event;

  let question = '';
  let hasImage = false;

  if (type === 'message_reply') {
    if (messageReply?.attachments[0]?.type === 'photo') {
      hasImage = true;
      const attachment = messageReply.attachments[0];
      const imageURL = attachment.url;
      question = await convertImageToText(imageURL);

      if (!question) {
        api.sendMessage('❗ 𝖴𝗇𝖺𝖻𝗅𝖾 𝗍𝗈 𝖼𝗈𝗇𝗏𝖾𝗋𝗍 𝗍𝗁𝖾 𝗉𝗁𝗈𝗍𝗈, 𝗉𝗅𝖾𝖺𝗌𝖾 𝖾𝗇𝗌𝗎𝗋𝖾 𝗂𝗆𝖺𝗀𝖾𝗌 𝖺𝗋𝖾 𝖼𝗅𝖾𝖺𝗋 𝖻𝖾𝖿𝗈𝗋𝖾 𝗌𝖾𝗇𝖽𝗂𝗇𝗀.', threadID, messageID);
        return;
      }
    } else {
      question = messageReply?.body?.trim() || '';
    }
  } else { 
    question = body.slice(5).trim();
  }

  if (!question) {
    api.sendMessage("𝖧𝖾𝗅𝗅𝗈👋, 𝖨 𝖺𝗆 𝖬𝗈𝖽𝖾𝗅-𝗏3 𝖣𝖾𝗆𝗈 𝖦𝖯𝖳-4, 𝖣𝖾𝗌𝗂𝗀𝗇 𝖺𝗇𝖽 𝗋𝖾𝗆𝗈𝖽𝖾𝖽 𝖻𝗒 𝖧𝖺𝗓𝖾𝗒𝗒. \n\n𝖧𝗈𝗐 𝖼𝖺𝗇 𝗂 𝖺𝗌𝗌𝗂𝗌𝗍 𝗒𝗈𝗎 𝗍𝗈𝖽𝖺𝗒?", event.threadID);
    return;
  }

  try {
    api.sendTypingIndicator(event.threadID);

    api.sendMessage('🗨️ | 𝖣𝖾𝗆𝗈 𝖦𝖯𝖳-4 𝗂𝗌 𝗍𝗁𝗂𝗇𝗄𝗂𝗇𝗀...', event.threadID);

    const response = await axios.get(`https://hazeyy-gpt4-api.kyrinwu.repl.co/api/gpt4/v-3beta?content=${encodeURIComponent(question)}`);

    const reply = response.data.reply;

    if (reply.trim() !== "") {
      const formattedReply = formatFont(reply);

      const gttsService = new gtts(formattedReply, 'en');
      gttsService.save('gpt4_response.mp3', function () {
        api.sendMessage(`🤖 𝗚𝗣𝗧-4 ( 𝗗𝗲𝗺𝗼 )\n\n🗨️: ${formattedReply}\n\n𝖨 𝗁𝗈𝗉𝖾 𝗂𝗍 𝗁𝖾𝗅𝗉𝗌 ✨`, event.threadID);

        api.sendMessage(
          {
            attachment: fs.createReadStream('gpt4_response.mp3'),
            body: '🔊 𝗗𝗲𝗺𝗼 𝗚𝗣𝗧-4 ( 𝗩𝗼𝗶𝗰𝗲 )',
            mentions: [
              {
                tag: 'GPT-4 Response',
                id: api.getCurrentUserID(),
              },
            ],
          },
          event.threadID
        );
      });
    } else {
      api.sendMessage("🤖 𝗗𝗲𝗺𝗼 𝗚𝗣𝗧-4 𝗰𝗼𝘂𝗹𝗱𝗻'𝘁 𝗽𝗿𝗼𝘃𝗶𝗱𝗲 𝗮 𝗿𝗲𝘀𝗽𝗼𝗻𝘀𝗲 𝘁𝗼 𝘆𝗼𝘂𝗿 𝗾𝘂𝗲𝗿𝘆.", event.threadID);
    }
  } catch (error) {
    console.error(error);
    api.sendMessage("🔴 𝗔𝗻 𝗲𝗿𝗿𝗼𝗿 𝗼𝗰𝗰𝘂𝗿𝗲𝗱. 𝗣𝗹𝗲𝗮𝘀𝗲 𝘁𝗿𝘆 𝗮𝗴𝗮𝗶𝗻 𝗹𝗮𝘁𝗲𝗿.", event.threadID);
  }
},
  };