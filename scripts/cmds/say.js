const { createReadStream, unlinkSync, createWriteStream } = require("fs-extra");
const { resolve } = require("path");
const axios = require("axios");

module.exports = {
  config: {
    name: "say",
    aliases: ["bol"],
    version: "1.1",
    author: "otineeeeyyyyyyyy",
    countDown: 5,
    role: 0,
    shortDescription: {
      en: "text to speech with language",
    },
    longDescription: {
      en: "text to speech language",
    },
    category: "fun",
    guide: {
      en: "/say [language] [text]: Convert text to speech. Default language is English.\nExample usages:\n/say hi\n/say ja こんにちは"
    },
  },

  onStart: async function ({ api, event, args, getLang }) {
    try {
      const content = event.type === "message_reply" ? event.messageReply.body : args.join(" ");
      const supportedLanguages = ["ru", "en", "ko", "ja", "tl", "vi", "in", "ne"];
      const defaultLanguage = "en"; // Set the default language to "en"
      const languageToSay = supportedLanguages.some((item) => content.indexOf(item) === 0) ? content.slice(0, content.indexOf(" ")) : defaultLanguage;
      const msg = languageToSay !== defaultLanguage ? content.slice(3, content.length) : content;
      const path = resolve(__dirname, "cache", `${event.threadID}_${event.senderID}.mp3`);

      const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(msg)}&tl=${languageToSay}&client=tw-ob`;
      const response = await axios({
        method: "GET",
        url,
        responseType: "stream",
      });

      const writer = response.data.pipe(createWriteStream(path));
      await new Promise((resolve, reject) => {
        writer.on("finish", resolve);
        writer.on("error", reject);
      });

      api.sendMessage(
        { attachment: createReadStream(path) },
        event.threadID,
        () => unlinkSync(path)
      );
    } catch (error) {
      console.error("Error occurred during TTS:", error);
      // Handle error response here, e.g., send an error message to the user
    }
  },
};