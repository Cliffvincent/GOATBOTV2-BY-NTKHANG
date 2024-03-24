const axios = require('axios');

module.exports = {
  config: {
    name: "moonwall",
    version: "1.0",
    author: "MILAN",
    countDown: 5,
    role: 0,
    shortDescription: {
      vi: "Tạo hình ảnh moonwall.",
      en: "Create moonwall image."
    },
    longDescription: {
      vi: "Tạo hình ảnh moonwall.",
      en: "Create moonwall image."
    },
    category: "image",
    guide: {
      vi: "{pn} < tên | ngày | tháng | năm >",
      en: "{pn} < name | day | month | year >"
    }
  },

  onStart: async function ({ api, event, args, message }) {
    const text = args.join(" ");
    if (!text) {
      return message.reply("Please provide a prompt.");
    }
    let name, day, month, year;
    if (text.includes("|")) {
      [name, day, month, year] = text.split("|").map((str) => str.trim());
    }
    message.reply("Initializing image, please wait...", async (err, info) => {
      let id = info.messageID;
      try {
        const API = `https://milanbhandari.imageapi.repl.co/moonwall?name=${encodeURIComponent(name)}&day=${encodeURIComponent(day)}&month=${encodeURIComponent(month)}&year=${encodeURIComponent(year)}`;
        const imageStream = await global.utils.getStreamFromURL(API);
        message.unsend(id);
        message.reply({
          body: `✅ Image Generated\n🔰Name: ${name}\n📆Day: ${day}\n🗓️Month: ${month}\n🎆Year: ${year}`,
          attachment: imageStream
        }, async (err, info) => {
        });
      } catch (error) {
        console.error(error);
        api.sendMessage(`Error: ${error}`, event.threadID);
      }
    });
  }
};