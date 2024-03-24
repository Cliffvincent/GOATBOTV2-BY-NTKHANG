const { get } = require('axios');
const fs = require('fs');
const path = require('path');

module.exports = {
		config: {
				name: "emi",
				version: "1.0.0",
				role: 0,
				author: "Developer",
				shortDescription: "Generate image in emi",
				countDown: 0,
				category: "Ai",
				guide: {
						en: '{p}emi [prompt]'
				}
		},

		onStart: async function ({ api, event, args }) {
				function sendMessage(msg) {
						api.sendMessage(msg, event.threadID, event.messageID);
				}

				if (!args[0]) return sendMessage('Missing prompt!');

				const prompt = args.join(" ");
				if (!prompt) return sendMessage('Missing prompt!');
				try {
						const response = await get(`${url}/emi?prompt=${encodeURIComponent(prompt)}`, {
								responseType: 'arraybuffer'
						});
						const imageData = response.data;

						const filePath = path.join(__dirname, 'cache', 'emi.png');
						fs.writeFileSync(filePath, Buffer.from(imageData, "utf8"));

						return sendMessage({ attachment: fs.createReadStream(filePath) });
				} catch (error) {
						console.error("Error generating image in emi:", error);
						return sendMessage(error.message);
				}
		}
};
