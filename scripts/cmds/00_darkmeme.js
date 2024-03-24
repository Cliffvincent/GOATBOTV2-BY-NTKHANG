const axios = require('axios'); 

module.exports = {
	config: {
		name: "darkmeme",
		aliases: ["dmeme"],
		author: "kshitiz & Rickciel",
		version: "2.0",
		cooldowns: 5,
		role: 0,
		shortDescription: {
			en: ""
		},
		longDescription: {
			en: "Get a dark meme, make sure you have a flashlight."
		},
		category: "fun",
		guide: {
			en: "{p}{n}dmeme"
		}
	},
	onStart: async function ({ api, event, args }) {
		try {
			const response = await axios.get('https://api31.chatbotmesss.repl.co/api/meme', {
				responseType: 'stream',
			});

			api.sendMessage({
				body: "Here's a dark meme for you 💀",
				attachment: response.data,
			}, event.threadID);
		} catch (error) {
			console.error(error);
			api.sendMessage("Error fetching memes.", event.threadID, event.messageID);
		}
	}
};