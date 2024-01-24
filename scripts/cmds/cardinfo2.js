const sendWaiting = true; // enable or disable sending "images in progress, please wait...";
const textWaiting = "Image initialization, please wait a moment";
const fonts = "/cache/Play-Bold.ttf";
const downfonts = "https://drive.google.com/u/0/uc?id=1uni8AiYk7prdrC7hgAmezaGTMH5R8gW8&export=download";
const fontsLink = 20;
const fontsInfo = 28;
const colorName = "#00FFFF";

module.exports = {
 config: {
 name: "cardinfo2",
 version: "1.1",
 author: "kshitiz",
 countDown: 5,
 role: 0,
 shortDescription: {
 vi: "",
 en: "make a simple group card info"
 },
 longDescription: {
 vi: "",
 en: ""
 },
 category: "logo",
 guide: {
 en: "{pn} <Name> <Sex> <followers> <love> <DOB> <Location> <FB Link>"
 }
 },

 onStart: async function ({ api, event, args }) {
 const { loadImage, createCanvas } = require("canvas");
 const request = require('request');
 const fs = require("fs-extra");
 const axios = require("axios");
 const Canvas = require("canvas");
 let pathImg = __dirname + `/cache/1.png`;
 let pathAvata = __dirname + `/cache/2.png`;

 let uid;
 if (event.type === "message_reply") {
 uid = event.messageReply.senderID;
 } else {
 uid = event.senderID;
 }

 const res = await api.getUserInfo(uid);
 let getAvatarOne = (await axios.get(`https://graph.facebook.com/${uid}/picture?height=1500&width=1500&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, { responseType: 'arraybuffer' })).data;
 let bg = (await axios.get(encodeURI(`https://i.imgur.com/tW6nSDm.png`), { responseType: "arraybuffer" })).data;
 fs.writeFileSync(pathAvata, Buffer.from(getAvatarOne, 'utf-8'));
 const avataruser = await this.circle(pathAvata);
 fs.writeFileSync(pathImg, Buffer.from(bg, 'utf-8'));

 /*-----------------download----------------------*/
 if (!fs.existsSync(__dirname + `${fonts}`)) {
 let getfont = (await axios.get(`${downfonts}`, { responseType: "arraybuffer" })).data;
 fs.writeFileSync(__dirname + `${fonts}`, Buffer.from(getfont, 'utf-8'));
 }
 /*---------------------------------------------*/

 let baseImage = await loadImage(pathImg);
 let baseAvata = await loadImage(avataruser);
 let canvas = createCanvas(baseImage.width, baseImage.height);
 let ctx = canvas.getContext("2d");
 ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height);
 ctx.drawImage(baseAvata, 80, 73, 285, 285);

 if (!res.name || res.name === "no data") res.name = args[0] || "Not Found";
 if (!res.gender || res.gender === "no data") res.gender = args[1] || "Not found";
 if (!res.follow || res.follow === "no data") res.follow = args[2] || "Not Found";
 if (!res.relationship_status || res.relationship_status === "no data") res.relationship_status = args[3] || "Not Found";
 if (!res.birthday || res.birthday === "no data") res.birthday = args[4] || "Not Found";
 if (!res.location || res.location === "no data") res.location = args[5] || "Not Found";
 if (!res.link || res.link === "no data") res.link = args[6] || "Not Found";

 var name = res.name ? `${res.name}` : "No information found";
 var gender = res.gender ? `${res.gender}` : "No information found";
 var follow = res.follow ? `${res.follow}` : "No information found";
 var love = res.relationship_status ? `${res.relationship_status}` : "No information found";
 var birthday = res.birthday ? `${res.birthday}` : "No information found";
 var location = res.location ? `${res.location}` : "No information found";
 var link = res.link ? `${res.link}` : "No information found";
 Canvas.registerFont(__dirname + `${fonts}`, {
 family: "Play-Bold"
 });
 ctx.font = `${fontsInfo}px Play-Bold`;
 ctx.fillStyle = "#000000";
 ctx.textAlign = "start";
 fontSize = 20;
 ctx.fillText(`${res.name}`, 480, 172);
 ctx.fillText(`${gender}`, 550, 208);
 ctx.fillText(`${res.follow}`, 550, 244);
 ctx.fillText(`${love}`, 550, 281);
 ctx.fillText(`${birthday}`, 550, 320);
 ctx.fillText(`${location}`, 550, 357);
 ctx.fillText(`${uid}`, 550, 399);
 ctx.font = `${fontsLink}px Play-Bold`;
 ctx.fillStyle = "#0000FF";
 ctx.textAlign = "start";
 fontSize = 25;
 ctx.fillText(`${res.link}`, 175, 470);
 ctx.beginPath();
 const imageBuffer = canvas.toBuffer();
 fs.writeFileSync(pathImg, imageBuffer);
 fs.removeSync(pathAvata);

 return api.sendMessage(
 { attachment: fs.createReadStream(pathImg) },
 event.threadID,
 () => fs.unlinkSync(pathImg),
 event.messageID
 );
 },

 circle: async function (image) {
 const jimp = require("jimp");
 image = await jimp.read(image);
 image.circle();
 return await image.getBufferAsync("image/png");
 }
};