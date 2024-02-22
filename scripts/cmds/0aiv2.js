const { get } = require('axios');
const url = "https://ai-tools.replit.app";

module.exports = {
		config: {
				name: "ai",
				version: "1.0.0",
				role: 0,
				author: "Deku",
				shortDescription: "Talk to AI with continuous conversation.",
				aliases: ['yaz', 'Yaz', 'AI', 'Ai'],
				countDown: 0,
				category: "Ai",
				guide: {
						en: '{p}ai'
				}
		},

		onStart: async function({ api, event, args }) {
				function sendMessage(msg) {
						api.sendMessage(msg, event.threadID, event.messageID);
				}
				if (!args[0]) return sendMessage('Please provide a question first.');
				const prompt = args.join(" ");
				try {
						const response = await get(`${url}/gpt?prompt=${encodeURIComponent(prompt)}&uid=${event.senderID}`);
						const data = response.data;
						return sendMessage(data.gpt4);
				} catch (error) {
						console.error('Error talking to AI:', error.message);
						return sendMessage('An error occurred while talking to AI. Please try again later.');
				}
		}
};
