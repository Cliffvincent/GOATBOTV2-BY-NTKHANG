const axios = require('axios');

module.exports = {
		config: {
				name: "gemini",
				version: "1.0.0",
				role: 0,
				author: "Developer",
				shortDescription: "Get a response from gemini AI",
				countDown: 0,
				category: "Ai",
				guide: {
						en: '{p}gemini [prompt]'
				}
		},

		onStart: async ({ api, event, args }) => {
				const prompt = args.join(" ");
				api.setMessageReaction("📝", event.messageID, () => {}, true);

				if (!prompt) {
						return api.sendMessage("Hello there, how can I assist you today?", event.threadID, event.messageID);
				}

				try {
						const response = await axios.get(`https://gemini-d1p.onrender.com/dipto?prompt=${prompt}`);
						const di = response.data.dipto; 
						api.setMessageReaction("✅", event.messageID, () => {}, true);

						api.sendMessage(`${di}`, event.threadID, event.messageID);
				} catch (error) {
						console.error('ERROR', error.response?.data || error.message);
						api.sendMessage('An error occurred while processing the command.', event.threadID);
				}
		}
};
