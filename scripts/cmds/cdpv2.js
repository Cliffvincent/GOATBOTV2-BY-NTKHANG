const axios = require("axios");
const fs = require("fs-extra");

module.exports = {
 config: {
 name: "cdp2",
 aliases: [],
 version: "1.0",
 author: "milan-says",
 countDown: 5,
 role: 0,
 shortDescription: {
 en: "couple dp"
 },
 longDescription: {
 en: "couple dp"
 },
 category: "love",
 guide: {
 en: "{pn}"
 }
 },

 onStart: async function ({ api, event, args }) {
 try {
 const { data } = await axios.get(
 "https://milanbhandari.imageapi.repl.co/dp?apikey=xyzmilan"
 );
 const maleImg = await axios.get(data.male, { responseType: "arraybuffer" });
 fs.writeFileSync(__dirname + "/tmp/img1.png", Buffer.from(maleImg.data, "utf-8"));
 const femaleImg = await axios.get(data.female, { responseType: "arraybuffer" });
 fs.writeFileSync(__dirname + "/tmp/img2.png", Buffer.from(femaleImg.data, "utf-8"));

 const msg = "Here is your couple dp";
 const allImages = [
 fs.createReadStream(__dirname + "/tmp/img1.png"),
 fs.createReadStream(__dirname + "/tmp/img2.png")
 ];

 return api.sendMessage({
 body: msg,
 attachment: allImages
 }, event.threadID, event.messageID);
 } catch (error) {
 console.error(error);
 }
 }
};