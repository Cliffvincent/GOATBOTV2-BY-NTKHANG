const { createReadStream, unlinkSync } = require("fs-extra");
const { resolve } = require("path");
const axios = require('axios');

module.exports = {
	config: {
		name: "anime",
		aliases: [],
		version: "1.0",
		author: "kivv",
		countDown: 5,
		role: 2,
		shortDescription: "18+",
		longDescription: "",
		category: "anime🌸",
		guide: "{pn}"
	},
	onLoad: async function () {
		const { resolve } = require("path");
		const { existsSync, readFileSync } = require("fs-extra");
		const { downloadFile } = global.utils;
		const path = resolve(__dirname, 'cache', 'alime.json');
		const url = "https://raw.githubusercontent.com/ProCoderMew/Module-Miraiv2/Mew/data/alime.json";

		try {
			if (!existsSync(path)) await downloadFile(url, path);
			const data = JSON.parse(readFileSync(path));
			if (data.length == 0) await downloadFile(url, path);
			return;
		} catch {
			await downloadFile(url, path);
		}
	},
	onStart: async function ({ event, api, args }) {
		const { threadID, senderID, messageID } = event;

		const out = (msg, callback = function () {}) => api.sendMessage(msg, threadID, callback, messageID);
		const { sfw, nsfw } = require("./cache/alime.json");
		var apiUrl;

		if (!sfw.hasOwnProperty(args[0]) && !nsfw.hasOwnProperty(args[0])) {
			var nsfwData = Object.keys(nsfw).join(", ");
			var sfwData = Object.keys(sfw).join(", ");
			return out("=== Sfw Tag ===\n" + sfwData + "\n\n=== Nsfw Tag (مش شغال)===\n" + nsfwData);
		} else {
			if (sfw.hasOwnProperty(args[0])) apiUrl = sfw[args[0]];
			else if (nsfw.hasOwnProperty(args[0])) apiUrl = nsfw[args[0]];

			try {
				const { data: apiData } = await axios.get(apiUrl);
				const url = apiData.data.response.url;
				const ext = url.split(".").slice(-1)[0];
				const path = resolve(__dirname, 'cache', `${args[0]}_${senderID}.${ext}`);

				await global.utils.downloadFile(url, path);

				return out({
					attachment: createReadStream(path)
				}, function () {
					return unlinkSync(path);
				});
			} catch (error) {
				console.log(error);
				return out("Sorry, there was an error with the API.");
			}
		}
	}
};