const { get } = require('axios');
const fs = require('fs');
const path = require('path');

const url = "https://ai-tools.replit.app";
const cacheDir = path.join(__dirname, 'cache');
const filePath = path.join(cacheDir, 'pixart.png');

module.exports = {
		config: {
				name: "pxart",
				version: "1.0.0",
				role: 0,
				author: "eugene",
				shortDescription: "Generate image in pixart",
				countDown: 0,
				category: "Ai",
				guide: {
						en: '[prompt | style]'
				}
		},

		onStart: async function({ api, event, args }) {
				function sendMessage(msg) {
						api.sendMessage(msg, event.threadID, event.messageID);
				}

				const styleList = `•——[Style list]——•\n\n1. Cinematic\n2. Photographic\n3. Anime\n4. Manga\n5. Digital Art\n6. Pixel art\n7. Fantasy art\n8. Neonpunk\n9. 3D Model`;

				if (!args[0] || !args[1]) {
						return sendMessage('Missing prompt and style\n\n' + styleList);
				}

				const [prompt, style] = args.join(" ").split("|").map(item => item.trim());

				if (!prompt) {
						return sendMessage('Missing prompt!');
				}
				if (!style) {
						return sendMessage('Missing style!\n\n' + styleList);
				}

				try {
						const response = await get(url + '/pixart', {
								params: {
										prompt: prompt,
										styles: style
								},
								responseType: 'arraybuffer'
						});

						fs.mkdirSync(cacheDir, { recursive: true });
						fs.writeFileSync(filePath, Buffer.from(response.data, "utf8"));

						return sendMessage({ attachment: fs.createReadStream(filePath) });
				} catch (error) {
						console.error('Error generating image in pixart:', error.message);
						return sendMessage('An error occurred while generating the image in pixart. Please try again later.');
				}
		}
};
