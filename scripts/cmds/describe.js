const axios = require("axios");
module.exports = {
  config: {
    name: "describe",
    aliases: [ "imgtoprompt", "defineimg", "getprompt"],
    version: "1.0",
    author: "Samir Thakuri",
    countDown: 5,
    role: 0,
    shortDescription: "Prompt Generator.",
    longDescription: "Converts an image to a prompt.",
    category: "Utility",
    guide: "{pn} [Reply To Image]",
  },
  onStart: async function ({ event, message, args, api }) {
    try {
      const imageUrl = event.messageReply?.attachments[0]?.url;
      if (!imageUrl) {
        return message.reply(`Please reply to the image.`);
      } else {
        const creatingMessage = await message.reply("🔍 | Observing The Image Please Wait...");
        try {
          const response = await axios.get(
            `https://api.samirthakuri.repl.co/api/imageinfo?imageurl=${encodeURIComponent(imageUrl)}`
          );
          const prompt = response.data.description;
          if (prompt) {
            message.reply(`${prompt}`);
          } else {
            message.reply("Failed to get a prompt from the image.");
          }
        } catch (error) {
          console.error(error);
          message.reply("Encountered the internal server error.");
        }
        api.unsendMessage(creatingMessage.messageID);
      }
    } catch (error) {
      console.error(error);
      message.reply("An error occurred.");
    }
  },
};