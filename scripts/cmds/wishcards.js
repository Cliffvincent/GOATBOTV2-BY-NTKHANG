module.exports = {
	config: {
		name: "wishcard",
		aliases: ["wc"],
		author: 'junjam × AceGun',
		countDown: 5,
		role: 0,
		category: "fun",
		shortDescription: {
			en: 'Make a wishcard',
		},
	},
	circle: async function (path) {
		const { loadImage, createCanvas } = require("canvas");
		let img = await loadImage(path);
		let canvas = createCanvas(img.width, img.height);
		let ctx = canvas.getContext("2d");
		ctx.beginPath();
		ctx.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2, 0, Math.PI * 2);
		ctx.closePath();
		ctx.clip();
		ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
		return canvas.toBuffer();
	},
	onStart: async function ({ api, event, args, usersData }) {
		const jimp = require("jimp");
		const { loadImage, createCanvas } = require("canvas");
		const request = require('request');
		const fs = require("fs-extra");
		const axios = require("axios");

		let { senderID, threadID, messageID } = event;
		let pathImg = __dirname + `/cache/${senderID}.png`;
		let pathAva = __dirname + `/cache/avtuser.png`;
		let text = args.join(" ")
		if (!text) return api.sendMessage('💢Please enter the correct format [text1 - text2] ', event.threadID, event.messageID);
		const text1 = text.substr(0, text.indexOf(' - '));
		if (!text1) return api.sendMessage('💢Please enter the correct format [text1 - text2] ', event.threadID, event.messageID);
		const text2 = text.split(" - ").pop()
		if (!text2) return api.sendMessage('💢Please enter the correct format [text1 - text2] ', event.threadID, event.messageID);

		let Avatar = (
			await axios.get(
				`https://graph.facebook.com/${event.senderID}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`,
				{ responseType: "arraybuffer" }
			)
		).data;let getWanted = (
			await axios.get(encodeURI(`https://i.ibb.co/cCpB1sQ/Ph-i-b-a-trung-thu.png`), {
				responseType: "arraybuffer",
			})
		).data;

		fs.writeFileSync(pathAva, Buffer.from(Avatar, "utf-8"));
		avatar = await this.circle(pathAva);
		fs.writeFileSync(pathImg, Buffer.from(getWanted, "utf-8"));

		let baseImage = await loadImage(pathImg);
		let baseAva = await loadImage(avatar);

		let canvas = createCanvas(baseImage.width, baseImage.height);
		let ctx = canvas.getContext("2d");

		ctx.drawImage(baseImage, 0, 0, 1920, 1080);
		ctx.drawImage(baseAva, 820, 315, 283, 283);

		ctx.font = "bold 70px Manrope";
		ctx.fillStyle = "#ffff";
		ctx.textAlign = "center";
		fontSize = 40;
		ctx.fillText(text1, 965, 715);

		ctx.font = "55px Manrope";
		ctx.fillStyle = "#ffff";
		ctx.textAlign = "center";
		fontSize = 20;
		ctx.fillText(text2, 965, 800);

		ctx.beginPath();
		const imageBuffer = canvas.toBuffer();
		fs.writeFileSync(pathImg, imageBuffer);
		fs.removeSync(pathAva);

		return api.sendMessage(
			{ attachment: fs.createReadStream(pathImg) },
			threadID,
			() => fs.unlinkSync(pathImg),
			messageID
		);
	},
};