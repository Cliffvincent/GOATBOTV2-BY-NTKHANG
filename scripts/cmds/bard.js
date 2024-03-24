const axios = require("axios");
const fs = require("fs");
const cookie = 'g.a000gggofsT-eH4KIvq359t2PSkOCpfqw50IE922AbLD-vn8M1oZ5clc36fJT8D_mWe8eXtQEwACgYKAZgSAQASFQHGX2Mix0E7IgxI48h5sQo6YgKwjBoVAUF8yKpG8zgsWay_nGUmv-fyG61J0076';

module.exports = {
	config: {
		name: "bard",
		version: "1.0",
		author: "rehat--",
		countDown: 5,
		role: 0,
		longDescription: { en: "Artificial Intelligence Google Gemini" },
		guide: { en: "{pn} <query>" },
		category: "ai",
	},
	clearHistory: function () {
		global.GoatBot.onReply.clear();
	},

	onStart: async function ({ message, event, args, commandName }) {
		const uid = event.senderID;
		const prompt = args.join(" ");

		if (!prompt) {
			message.reply("Please enter a query.");
			return;
		}

		if (prompt.toLowerCase() === "clear") {
			this.clearHistory();
			const clear = await axios.get(`https://project-gemini-daac55836bf7.herokuapp.com/api/gemini?query=clear&uid=${uid}&cookie=${cookie}`);
			message.reply(clear.data.message);
			return;
		}

		let apiUrl = `https://project-gemini-daac55836bf7.herokuapp.com/api/gemini?query=${encodeURIComponent(prompt)}&uid=${uid}&cookie=${cookie}`;

		if (event.type === "message_reply") {
			const imageUrl = event.messageReply.attachments[0]?.url;
			if (imageUrl) {
				apiUrl += `&attachment=${encodeURIComponent(imageUrl)}`;
			}
		}

		try {
			const response = await axios.get(apiUrl);
			const result = response.data;

			let content = result.message;
			let imageUrls = result.imageUrls;

			let replyOptions = {
				body: content,
			};

			if (Array.isArray(imageUrls) && imageUrls.length > 0) {
				const imageStreams = [];

				if (!fs.existsSync(`${__dirname}/cache`)) {
					fs.mkdirSync(`${__dirname}/cache`);
				}

				for (let i = 0; i < imageUrls.length; i++) {
					const imageUrl = imageUrls[i];
					const imagePath = `${__dirname}/cache/image` + (i + 1) + ".png";

					try {
						const imageResponse = await axios.get(imageUrl, {
							responseType: "arraybuffer",
						});
						fs.writeFileSync(imagePath, imageResponse.data);
						imageStreams.push(fs.createReadStream(imagePath));
					} catch (error) {
						console.error("Error occurred while downloading and saving the image:", error);
						message.reply('An error occurred.');
					}
				}

				replyOptions.attachment = imageStreams;
			}

			message.reply(replyOptions, (err, info) => {
				if (!err) {
					global.GoatBot.onReply.set(info.messageID, {
						commandName,
						messageID: info.messageID,
						author: event.senderID,
					});
				}
			});
		} catch (error) {
			message.reply('An error occurred.');
			console.error(error.message);
		}
	},

	onReply: async function ({ message, event, Reply, args }) {
		const prompt = args.join(" ");
		let { author, commandName, messageID } = Reply;
		if (event.senderID !== author) return;

		try {
			const apiUrl = `https://project-gemini-daac55836bf7.herokuapp.com/api/gemini?query=${encodeURIComponent(prompt)}&uid=${author}&cookie=${cookie}`;
			const response = await axios.get(apiUrl);

			let content = response.data.message;
			let replyOptions = {
				body: content,
			};

			const imageUrls = response.data.imageUrls;
			if (Array.isArray(imageUrls) && imageUrls.length > 0) {
				const imageStreams = [];

				if (!fs.existsSync(`${__dirname}/cache`)) {
					fs.mkdirSync(`${__dirname}/cache`);
				}
				for (let i = 0; i < imageUrls.length; i++) {
					const imageUrl = imageUrls[i];
					const imagePath = `${__dirname}/cache/image` + (i + 1) + ".png";

					try {
						const imageResponse = await axios.get(imageUrl, {
							responseType: "arraybuffer",
						});
						fs.writeFileSync(imagePath, imageResponse.data);
						imageStreams.push(fs.createReadStream(imagePath));
					} catch (error) {
						console.error("Error occurred while downloading and saving the image:", error);
						message.reply('An error occurred.');
					}
				}
				replyOptions.attachment = imageStreams;
			}
			message.reply(replyOptions, (err, info) => {
				if (!err) {
					global.GoatBot.onReply.set(info.messageID, {
						commandName,
						messageID: info.messageID,
						author: event.senderID,
					});
				}
			});
		} catch (error) {
			console.error(error.message);
			message.reply("An error occurred.");
		}
	},
};