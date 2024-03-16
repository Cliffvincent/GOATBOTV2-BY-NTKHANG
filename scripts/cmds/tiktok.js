const axios = require('axios');

module.exports = {
	config: {
		name: "tiksr",
		version: "1.0",
		author: "Samir Œ",
		countDown: 5,
		role: 0,
		shortDescription: {
			en: "Send a random TikTok video"
		},
		longDescription: {
			en: "Search TikTok video based on a query"
		},
		category: "Entertainment",
		guide: {
			en: "{prefix}tiksr <query>"
		}
	},

	onStart: async function ({ api, event, args }) {
		const query = args.join(" ");

		if (!query) {
			return api.sendMessage("Please provide a query for TikTok videos.", event.threadID);
		}

		try {
			const apiUrl = `https://api-samir.onrender.com/search/tiktok`;
			const response = await axios.post(apiUrl, { query });
			const videos = response.data.videos;

			if (videos.length === 0) {
				return api.sendMessage("No TikTok videos found for the given query.", event.threadID);
			}


			const randomVideo = videos[Math.floor(Math.random() * videos.length)];


			return api.sendMessage({ attachment: await global.utils.getStreamFromURL(randomVideo) }, event.threadID);
		} catch (error) {
			console.error(error);
			return api.sendMessage("An error occurred while fetching TikTok videos.", event.threadID);
		}
	}
};