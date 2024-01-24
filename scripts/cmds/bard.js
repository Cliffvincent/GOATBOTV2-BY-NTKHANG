const axios = require("axios");
const fs = require("fs");

module.exports = {
	config: {
		name: "bard",
		version: "1.0",
		author: "rehat--",
		countDown: 5,
		role: 0,
		longDescription: { en: "Artificial Intelligence Google Bard" },
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
			const clear = await axios.get(`https://project-bard.onrender.com/api/bard?query=clear&uid=${uid}`);
			message.reply(clear.data.message);
			return;
		}

		if (event.type === "message_reply" && event.messageReply.attachments && event.messageReply.attachments[0].type === "photo") {
			const photo = encodeURIComponent(event.messageReply.attachments[0].url);
			const query = args.join(" ");
			const url = `https://turtle-apis.onrender.com/api/gemini/img?prompt=${encodeURIComponent(query)}&url=${photo}`;
			const response = await axios.get(url);
			message.reply(response.data.answer);
			return;
		}

		const apiUrl = `https://project-bard.onrender.com/api/bard?query=${encodeURIComponent(prompt)}&uid=${uid}`;
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
			const apiUrl = `https://project-bard.onrender.com/api/bard?query=${encodeURIComponent(prompt)}&uid=${author}`;
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