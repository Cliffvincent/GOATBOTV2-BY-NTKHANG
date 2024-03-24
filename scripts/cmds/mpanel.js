const axios = require('axios');
const jimp = require("jimp");
const fs = require("fs");
module.exports = {
  config: {
    name: "mpanel",
    version: "1.0",
    author: "AceGun",
    countDown: 5,
    role: 0,
    shortDescription: "manga panel",
    longDescription: "make your favourite anime character manga panel",
    category: "image",
    guide: {
      en: "{p}{n} Character name or code | text",
    }
  },



  onStart: async function ({ message, args, event, api }) {

    const info = args.join(" ");
    if (!info){
      return message.reply(`Please enter in the format:\n/Character Name or code | text `);

      }else {
      const msg = info.split("|");
      const id = msg[0];
    const name = msg[1];
    const juswa = msg[2];



       if (isNaN(id)) { // If input is not a number
          await message.reply("processing your cover senpai....");

         let id1;
    try {
        id1 = (await axios.get(`https://www.nguyenmanh.name.vn/api/searchAvt?key=${id}`)).data.result.ID; 
    } catch (error) {
      await message.reply("Character not found, please check the name and try again...😿");
      return;
    }

        const img = (`https://www.nguyenmanh.name.vn/api/avtWibu5?id=${id1}&tenchinh=${name}&tenphu=${juswa}&apikey=zrAM6vv6`)			
                 const form = {
        body: `your manga panel senpai😻`
      };
        form.attachment = []
        form.attachment[0] = await global.utils.getStreamFromURL(img);
      message.reply(form); 



       }else  { 
       await message.reply("processing your cover senpai....");

         const img = (`https://www.nguyenmanh.name.vn/api/avtWibu5?id=${id}&tenchinh=${name}&tenphu=${juswa}&apikey=zrAM6vv6`)			
                 const form = {
        body: `your cover senpai`
      };
        form.attachment = []
        form.attachment[0] = await global.utils.getStreamFromURL(img);
      message.reply(form); 
        }
      }
    }
   };