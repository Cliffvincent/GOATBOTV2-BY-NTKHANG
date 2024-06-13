const path = require("path");
const axios = require("axios");
const fs = require("fs");
const { GoatWrapper } = require('fca-liane-utils');

module.exports = {
	config: {
		name: "shoti",
		version: "9",
		credits: "Eugene Aguilar",
		shortDscription: "Generate random shoti 😝",
		commandCategory: "media",
		hasPermssion: 0,
		cooldowns: 9,
	 countDown: 9,
		category: "None",
		usages: "[shoti]",
		role: 0,
		hasPrefix: false,
		author: "Cliff",
		countDown: 5,
	},

	onStart: async function ({ api, message, event, args }) {
		try {
			api.setMessageReaction("🕥", event.messageID, (err) => {}, true);

			const response = await axios.post(`https://shotiapi.onrender.com/api/request/f`);

			const video = response.data.data.eurixmp4;
			const username = response.data.data.username;
			const nickname = response.data.data.nickname;
			const title = response.data.data.title;

			const videoPath = path.join(__dirname, "cache", "eabab.mp4");

			const videoResponse = await axios.get(video, { responseType: "arraybuffer" });

			fs.writeFileSync(videoPath, Buffer.from(videoResponse.data));

			api.setMessageReaction("✅", event.messageID, (err) => {}, true);

			await api.sendMessage(
				{
					body: `Here is your shoti video:\nProvided by: Eugene Aguilar\n\nUsername: ${username}\nNickname: ${nickname}\nTitle: ${title}`,
					attachment: fs.createReadStream(videoPath),
				},
				event.threadID,
				event.messageID
			);
			fs.unlinkSync(videoPath);
		} catch (error) {
			api.sendMessage(`error: ${error.message}`, event.threadID, event.messageID);
			console.log(error);
		}
	}
};

const wrapper = new GoatWrapper(module.exports);
wrapper.applyNoPrefix({ allowPrefix: true });