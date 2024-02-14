const axios = require('axios');

module.exports = {
  config: {
    name: "imagine",
    version: "1.1",
    author: "OtinXSandip + milan",
    countDown: 10,
    role: 0,
    shortDescription: {
      en: 'Text to Image'
    },
    longDescription: {
      en: "Text to image"
    },
    category: "image",
    guide: {
      en: '{pn} your prompt | Type' +
        ' here are supported models:' +
        '\n' +
        ' 1: Analog-Diffusion-1.0' +
        '\n 2: Anything V3' +
        '\n 3: Anything V4.5' +
        '\n 4: AOM3A3' +
        '\n 5: Deliberate V2' +
        '\n 6: Dreamlike-Diffusion-1.0' +
        '\n 7: Dreamlike-Diffusion-2.0' +
        '\n 8: Dreamshaper 5Baked vae' +
        '\n 9: Dreamshaper 6Baked vae' +
        '\n 10: Elldreths-Vivid-Mix' +
        '\n 11: Lyriel_V15' +
        '\n 12: Lyriel_V16' +
        '\n 13: Mechamix_V10' +
        '\n 14: Meinamix_Meinav9' +
        '\n 15: Openjourney_V4' +
        '\n 16: Portrait+1.0' +
        '\n 17: Realistic_Vision_V1.4' +
        '\n 18: Realistic_Vision_V2.0' +
        '\n 19: revAnimated_v122' +
        '\n 20: sdv1_4' +
        '\n 21: V1' +
        '\n 22: shoninsBeautiful_v10' +
        '\n 23: Theallys-MIX-II-CHURNED' +
        '\n 24: Timeless-1.0'
    }
  },

  onStart: async function ({ api, event, args, message, usersData }) {
    const text = args.join(" ");
    if (!text) {
      return message.reply("Please provide a prompt.");
    }   
        

    let prompt, model;
    if (text.includes("|")) {
      const [promptText, modelText] = text.split("|").map((str) => str.trim());
      prompt = promptText;
      model = modelText;
    } else {
      prompt = text;
      model = 19;
    }
    message.reply("✅| Creating your Imagination...", async (err, info) => {
      let ui = info.messageID;
api.setMessageReaction("⏳", event.messageID, () => {}, true);
      try {
        const response = await axios.get(`https://shivadon.onrender.com/test?prompt=${encodeURIComponent(prompt)}&model=${model}`);
api.setMessageReaction("✅", event.messageID, () => {}, true);
        const img = response.data.combinedImageUrl;
        message.unsend(ui);
        message.reply({
          body: `Here's your imagination 🖼.\nPlease reply with the image number (1, 2, 3, 4) to get the corresponding image in high resolution.`,
          attachment: await global.utils.getStreamFromURL(img)
        }, async (err, info) => {
          let id = info.messageID;
          global.GoatBot.onReply.set(info.messageID, {
            commandName: this.config.name,
            messageID: info.messageID,
            author: event.senderID,
            imageUrls: response.data.imageUrls 
          });
        });
      } catch (error) {
        console.error(error);
        api.sendMessage(`Error: ${error}`, event.threadID);
      }
    });
  },


  onReply: async function ({ api, event, Reply, usersData, args, message }) {
    const reply = parseInt(args[0]);
    const { author, messageID, imageUrls } = Reply;
    if (event.senderID !== author) return;
    try {
      if (reply >= 1 && reply <= 4) {
        const img = imageUrls[`image${reply}`];
        message.reply({ attachment: await global.utils.getStreamFromURL(img) });
      } else {
        message.reply("Invalid image number. Please reply with a number between 1 and 4.");
        return;
      }
    } catch (error) {
      console.error(error);
      api.sendMessage(`Error: ${error}`, event.threadID);
    }
    message.unsend(Reply.messageID); 
  },
};