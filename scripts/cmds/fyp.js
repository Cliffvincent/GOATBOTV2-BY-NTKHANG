const axios = require("axios");
const fs = require("fs");
const path = require("path");

module.exports = {
	config: {
		name: "fyp",
		version: "1.0",
		author: "kshitiz",
		countDown: 15,
		role: 1,
		shortDescription: "random videos",
		longDescription: {
			en: "random videos from tiktok"
		},
		category: "𝗠𝗘𝗗𝗜𝗔",
		guide: {
			en: "{p}{n}"
		}
	},

	async onStart({ api, event }) {
		const getRandomQuery = () => {
			const queries = ["#neymaredits", "#badgirls", "animeedit", "rodeodancegirls", "#kinktok", "lyricseditvibe3", "messiedits", "ronaldoedits", "#memenepal", "deepthoughtss44", "mr.bishal_editz", "ruth_prashant", "ichijou_7", "peace_quote1"];
			const randomIndex = Math.floor(Math.random() * queries.length);
			return queries[randomIndex];
		};

		const searchAndSendVideo = async (threadID) => {
			const searchQuery = getRandomQuery();

			try {
				const apiUrl = `https://hiroshi.hiroshiapi.repl.co/tiktok/searchvideo?keywords=${encodeURIComponent(searchQuery)}`;
				const response = await axios.get(apiUrl);
				const videos = response.data.data.videos;

				if (!videos || videos.length === 0) {
					api.sendMessage(`No TikTok videos found for the query: ${searchQuery}`, threadID);
				} else {
					const videoData = videos[0];
					const videoUrl = videoData.play;
					const message = `Random Tiktok video🥱`;
					const filePath = path.join(__dirname, `/cache/tiktok_video_${threadID}.mp4`);
					const writer = fs.createWriteStream(filePath);

					const videoResponse = await axios({ method: 'get', url: videoUrl, responseType: 'stream' });
					videoResponse.data.pipe(writer);

					writer.on('finish', async () => {
						await api.sendMessage({
							body: message,
							attachment: fs.createReadStream(filePath)
						}, threadID);
						fs.unlinkSync(filePath);
					});
				}
			} catch (error) {
				console.error('Error:', error);
				api.sendMessage("An error occurred while processing the request.", threadID);
			}
		};

		try {
			const threadID = event.threadID;
			await searchAndSendVideo(threadID);
		} catch (error) {
			console.error('Error:', error);
		}
	}
};