const { get } = require('axios');
const fs = require('fs');

const url = "https://ai-tools.replit.app";
const cachePath = __dirname + '/cache/sdxl.png';

module.exports = {
		config: {
				name: 'sdxl',
				version: '2.1.0',
				author: "Deku", // Do not change credits
				countDown: 5,
				role: 0,
				shortDescription: 'Generate image in sdxl',
				longDescription: {
						en: ''
				},
				category: 'image',
				guide: {
						en: '[prompt | style]'
				}
		},

		onStart: async function({ api, event, args }) {
				function sendMessage(msg) {
						api.sendMessage(msg, event.threadID, event.messageID);
				}

				const styleList = `•——[Style list]——•\n\n1. Cinematic\n2. Photographic\n3. Anime\n4. Manga\n5. Digital Art\n6. Pixel art\n7. Fantasy art\n8. Neonpunk\n9. 3D Model`;

				if (!args[0]) return sendMessage('Missing prompt and style\n\n' + styleList);

				const [prompt, style] = args.join(" ").split("|").map(item => item.trim());

				if (!prompt) return sendMessage('Missing prompt!');
				if (!style) return sendMessage('Missing style!\n\n' + styleList);

				try {
						const response = await get(`${url}/sdxl?prompt=${encodeURIComponent(prompt)}&styles=${encodeURIComponent(style)}`, {
								responseType: 'arraybuffer'
						});

						fs.writeFileSync(cachePath, Buffer.from(response.data, "utf8"));

						return sendMessage({ attachment: fs.createReadStream(cachePath, () => fs.unlinkSync(cachePath)) });
				} catch (error) {
						console.error('Error generating image:', error.message);
						return sendMessage(error.message);
				}
		}
};
