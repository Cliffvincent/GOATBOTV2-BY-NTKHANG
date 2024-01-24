const axios = require('axios');
const jimp = require("jimp");
const fs = require("fs");
var api = ""; //your api key
module.exports = {
	config: {
		name: "banner",
		version: "1.0.5",
		author: "Samir Thakuri",
		countDown: 5,
		role: 0,
		shortDescription: "Create Banner",
		longDescription: "",
		category: "edit",
		guide: {
			vi: "{p}{n} <name> | <slogan> | <characterid>",
			en: "{p}{n} <name> | <slogan> | <characterid>"
		}
	},

	onStart: async function ({ message, args, event, api }) {
		const info = args.join(" ");
		if (!info){
			return message.reply(`Generating Banner!`);
		}else {
		const msg = info.split("|");
		const name = msg[0];
		const slogan = msg[1];
		const charid = msg[2];
			const img = (`https://goatbot.tk/api/anime/banner-genshin?apikey=nMWvMoATfP6L42BW0GFgm47LhGEI10v6&name=${name}&slogan=${slogan}+&idCharacter=${charid}`)
			const form = {
				body: ` Here's Your Banner❤️ `
			};
				form.attachment = []
				form.attachment[0] = await global.utils.getStreamFromURL(img);
			message.reply(form);
				}
}};