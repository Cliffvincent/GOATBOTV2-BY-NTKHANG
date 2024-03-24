const axios = require('axios');

module.exports = {
	config: {
		name: "apimarket",
		aliases: ["apimarket"],
		author: "Jonell Magallanes & kshitiz",
		version: "2.0",
		cooldowns: 5,
		role: 0,
		shortDescription: {
			en: ""
		},
		longDescription: {
			en: "Search API endpoints via market command"
		},
		category: "𝗠𝗔𝗥𝗞𝗘𝗧",
		guide: {
			en: "{p}{n}/{p} name "
		}
	},
	onStart: async function ({ api, event }) {
		const args = event.body.split(" ").slice(1);
		const query = args.join(" ");

		if (!query) {

			const availableApis = await getAvailableAPIs();
			const apiListMessage = `🛒 Available APIs:\n\n${availableApis.join("\n")}`;
			return api.sendMessage(apiListMessage, event.threadID);
		}

		const apiUrl = `https://api-market-by-jonell-cc.hutchin.repl.co/market/?search=${encodeURIComponent(query)}`;

		try {
			const response = await axios.get(apiUrl);
			const searchResults = response.data;

			if (searchResults.length === 0) {
				return api.sendMessage("No results found for your search.", event.threadID);
			}

			let message = '🛒 Market Api Search Results:\n\n';
			searchResults.forEach((result, index) => {
				message += `${index + 1}. Name:${result.name}\n\nDescription:${result.description}\n\nEndpoint: ${result.link}\n\nApiOwner:${result.ApiOwner}\n\n==============================\n\n`;
			});

			api.sendMessage(message, event.threadID);
		} catch (error) {
			console.error(error);
			api.sendMessage("An error occurred while trying to search the market.", event.threadID);
		}
	}
};


async function getAvailableAPIs() {
	try {
		const response = await axios.get('https://api-market-by-jonell-cc.hutchin.repl.co/market');
		const availableApis = response.data.map(api => api.name);
		return availableApis;
	} catch (error) {
		console.error(error);
		return [];
	}
}