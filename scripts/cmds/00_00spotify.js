const axios = require('axios');
const fs = require('fs');
const { GoatWrapper } = require('fca-liane-utils');

module.exports = {
		config: {
				name: "spotify",
				version: "1.0.0",
				role: 0,
				hasPermission: 0,
				credits: "cliff",
				countDown: 9,
				author: "cliff",
				shortDescription: "Search and play music from Spotify",
				commandCategory: "spotify",
				category: "audio",
				hasPrefix: false,
				usage: "[song name]",
				cooldowns: 5,
				usePrefix: false,
				usages: "[song name]",
				cooldown: 5
		},

		onStart: async function ({ api, event, args }) {
				const listensearch = encodeURIComponent(args.join(" "));
				const apiUrl = `http://158.101.198.227:8609/spotifydl?title=${listensearch}`;

				if (!listensearch) return api.sendMessage("Please provide the name of the song you want to search.", event.threadID, event.messageID);

				try {
						api.sendMessage("🎵 | Searching music on Spotify. Please wait...", event.threadID, event.messageID);

						const response = await axios.get(apiUrl);
						const { downloadUrl } = response.data;

						if (downloadUrl.status === 200) {
								const filePath = `${__dirname}/cache/${Date.now()}.mp3`;
								const writeStream = fs.createWriteStream(filePath);

								const audioResponse = await axios.get(downloadUrl.result, { responseType: 'stream' });

								audioResponse.data.pipe(writeStream);

								writeStream.on('finish', () => {
										api.sendMessage({
												body: `🎧 Here's your music from Spotify. Enjoy listening!\n\nDownload: ${downloadUrl.result}\n\n💿 Now Playing...`,
												attachment: fs.createReadStream(filePath),
										}, event.threadID, () => fs.unlinkSync(filePath), event.messageID);
								});
						} else {
								api.sendMessage("❓ | Sorry, couldn't find the requested music on Spotify.", event.threadID);
						}
				} catch (error) {
						console.error(error);
						api.sendMessage("🚧 | An error occurred while processing your request.", event.threadID);
				}
		}
};

const wrapper = new GoatWrapper(module.exports);
wrapper.applyNoPrefix({ allowPrefix: true });