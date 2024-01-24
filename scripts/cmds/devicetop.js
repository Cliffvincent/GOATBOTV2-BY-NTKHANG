const axios = require('axios');

const top10device = async ({message, args}) => {

    const BASE_URL = `https://api.foxzihel2.repl.co/gsmarena/device/top`;
    try {
      let res = await axios.get(BASE_URL);
      let data = res.data;
      let response = "";
      data.forEach(category => {
        response += `>>${category.category}<<\n`;
        category.list.forEach((phone, index) => {
          response += `${index + 1}. >>${phone.name}<< (${phone.favorites} likes)\n`;
        });
        response += "\n";
      });
      message.reply(response);
    } catch (e) {
      message.reply('🥺 Not Found');
    }
  };

module.exports = {
  config: {
    name: "devicetop",
    aliases: ["topdevice"],
    version: "1.1",
    author: "Xemon",
    countDown: 5,
    role: 0,
    shortDescription: "Displays top 10 phones",
    longDescription: "",
    category: "phones",
    guide: "{pn}"
  },
onStart: top10device, 
 };