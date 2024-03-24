const axios = require('axios');
const jimp = require("jimp");
const fs = require("fs")


module.exports = {
 config: {
 name: "fuck3",
 aliases: ["fuckv3"],
 version: "1.0",
 author: "Upen Basnet & remake by AceGun", //don't edit author name or G'ban
 countDown: 5,
 role: 2,
 shortDescription: "@mention",
 longDescription: "",
 category: "fun",
 guide: "{pn}"
 },



 onStart: async function ({ message, event, args }) {
 const mention = Object.keys(event.mentions);
 if (mention.length == 0) return message.reply("Please mention someone");
 else if (mention.length == 1) {
 const one = event.senderID, two = mention[0];
 bal(one, two).then(ptth => { message.reply({ body: "", attachment: fs.createReadStream(ptth) }) })
 } else {
 const one = mention[1], two = mention[0];
 bal(one, two).then(ptth => { message.reply({ body: "", attachment: fs.createReadStream(ptth) }) })
 }
 }


};

async function bal(one, two) {

 let avone = await jimp.read(`https://graph.facebook.com/${one}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`)
 avone.circle()
 let avtwo = await jimp.read(`https://graph.facebook.com/${two}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`)
 avtwo.circle()
 let pth = "abcd.png"
 let img = await jimp.read("https://i.imgur.com/fUv6kIF.jpg")

 img.resize(1080, 1350).composite(avone.resize(200, 200), 77, 164).composite(avtwo.resize(235, 235), 500, 170);

 await img.writeAsync(pth)
 return pth
}