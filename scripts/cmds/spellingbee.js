const axios = require("axios");
const fs = require("fs");
const { resolve } = require("path");

module.exports = {
  config: {
    name: "spellingbee",
    aliases: ["sb", "spell"],
    version: "1.0",
    author: "JVSanecrab",
    countDown: 5,
    role: 0,
    shortDescription: {
      en: "Spelling Bee game",
    },
    longDescription: {
      en: "Test your spelling skills in this fun game.",
    },
    category: "games",
    guide: {
      en: "/spellingbee [length]: Play the Spelling Bee game.",
    },
    envConfig: {
      reward: 30, // Set your desired base reward amount
    },
  },

  langs: {
    en: {
      reply: "⏳: 10\nSpell [one word only]: ",
      correct: "🎉 Congratulations! You spelled it correctly. You've earned %1$.",
      wrong: "⚠️ Sorry, that's not the correct spelling. Try again!",
    },
  },

  onStart: async function ({ message, event, commandName, getLang }) {
    try {
      let length = event.body.split(" ")[1];

      if (length) {
        length = parseInt(length, 10);

        if (length < 3 || length > 15) {
          return message.reply("Please enter a length between 3 and 15.");
        }
      } else {
        length = getRandomLength();
      }

      const randomWord = await getRandomWord(length);
      const audioPath = await generateAudio(randomWord);
      const replyMessage = getLang("reply");
      const audioAttachment = fs.createReadStream(audioPath);
      const reward = calculateReward(length);

      message.reply(
        {
          body: replyMessage,
          attachment: audioAttachment,
        },
        (err, info) => {
          global.GoatBot.onReply.set(info.messageID, {
            commandName,
            messageID: info.messageID,
            author: event.senderID,
            correctWord: randomWord,
            audioPath,
            reward,
          });
          
          setTimeout(() => {
            const replyData = global.GoatBot.onReply.get(info.messageID);
            if (replyData) {
              const { messageID } = replyData;
              global.GoatBot.onReply.delete(messageID);
              message.unsend(messageID);
            }
          }, 10000); //10 sec deleteee
        }
      );
    } catch (error) {
      console.error("Error in Spelling Bee command:", error);
    }
  },

  onReply: async function ({ message, Reply, event, usersData, envCommands, getLang }) {
    const { author, correctWord, messageID, audioPath, reward } = Reply;

    if (event.senderID != author) {
      return;
    }

    const userAnswer = formatText(event.body);
    const normalizedCorrectWord = formatText(correctWord);

    if (userAnswer === normalizedCorrectWord) {
      global.GoatBot.onReply.delete(messageID);

      await usersData.addMoney(event.senderID, reward);

      message.reply(getLang("correct", reward), () => {
        fs.unlink(audioPath, (err) => {
          if (err) {
            console.error("Error deleting audio file:", err);
          }
        });

        // Unsend the message
        message.unsend(event.messageReply.messageID);
      });
    } else {
      message.reply(getLang("wrong"), () => {
        fs.unlink(audioPath, (err) => {
          if (err) {
            console.error("Error deleting audio file:", err);
          }
        });

        // Unsend the message
        message.unsend(event.messageReply.messageID);
      });
    }
  }
};

function getRandomLength() {
  return Math.floor(Math.random() * 13) + 3;
}

function calculateReward(length) {
  return 30 * (length - 2);
}

async function getRandomWord(length) {
  try {
    const response = await axios.get(`https://random-word-api.herokuapp.com/word?length=${length}`);
    return response.data[0];
  } catch (error) {
    console.error("Error fetching a random word:", error);
    throw error;
  }
}

async function generateAudio(word) {
  try {
    const language = "en"; // Language is English
    const path = resolve(__dirname, "cache", `${word}.mp3`);
    const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(word)}&tl=${language}&client=tw-ob`;
    const response = await axios({
      method: "GET",
      url,
      responseType: "stream",
    });

    const writer = response.data.pipe(fs.createWriteStream(path));
    await new Promise((resolve, reject) => {
      writer.on("finish", resolve);
      writer.on("error", reject);
    });

    return path;
  } catch (error) {
    console.error("Error generating audio:", error);
    throw error;
  }
}

function formatText(text) {
  return text.normalize("NFD")
    .toLowerCase()
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[đ|Đ]/g, (x) => x == "đ" ? "d" : "D");
}