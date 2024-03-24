const { get } = require('axios');
const fs = require('fs');

module.exports = {
		config: {
				name: "render",
				version: "1.0.0",
				role: 0,
				author: "deku",
				shortDescription: "Generate image on Render 3D",
				countDown: 0,
				category: "Image",
				guide: {
						en: '[prompt]'
				}
		},

		onStart: async function({ api, event, args }) {
				function sendMessage(msg) {
						api.sendMessage(msg, event.threadID, event.messageID);
				}

				if (!args[0]) return sendMessage('Missing prompt!');

				const prompt = args.join(" ");
				if (!prompt) return sendMessage('Missing prompt!');

				try {
						const response = await get(`https://ai-tools.replit.app/render?prompt=${encodeURIComponent(prompt)}`, {
								responseType: 'arraybuffer'
						});
						const imageData = response.data;

						const filePath = __dirname + '/cache/render3d.png';
						fs.writeFileSync(filePath, Buffer.from(imageData, "utf8"));

						return sendMessage({ attachment: fs.createReadStream(filePath, () => fs.unlinkSync(filePath)) });
				} catch (error) {
						console.error("Error generating image on Render 3D:", error);
						return sendMessage(error.message);
				}
		}
};
