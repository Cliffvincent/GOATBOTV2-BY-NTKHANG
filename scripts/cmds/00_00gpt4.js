const axios = require('axios');

module.exports = {
	config: {
		name: "gpt4",
		author: "cliff",
		version: "1.5",
		countDown: 5,
		role: 0,
		category: "GPT4",
		shortDescription: {
			en: "gpt4 Architecture "
		}
	},

	onStart: async function ({ api, event, args }) {
		try {
			const { messageID, messageReply } = event;
			let prompt = args.join(' ');

			if (messageReply) {
				const repliedMessage = messageReply.body;
				prompt = `${repliedMessage} ${prompt}`;
			}

			if (!prompt) {
				return api.sendMessage('Please provide a prompt to generate a text response.GPT4 {questions}\nExample: GPT4 What is the meaning of life?\n', event.threadID, messageID);
			}

			const gpt4_api = `https://ai-chat-gpt-4-lite.onrender.com/api/hercai?question=${encodeURIComponent(prompt)}`;

			const response = await axios.get(gpt4_api);

			if (response.data && response.data.reply) {
				const generatedText = response.data.reply;
				api.sendMessage({ body: generatedText, attachment: null }, event.threadID, messageID);
			} else {
				console.error('API response did not contain expected data:', response.data);
				api.sendMessage(`❌ An error occurred while generating the text response. Please try again later. Response data: ${JSON.stringify(response.data)}`, event.threadID, messageID);
			}
		} catch (error) {
			console.error('Error:', error);
			api.sendMessage(`❌ An error occurred while generating the text response. Please try again later. Error details: ${error.message}`, event.threadID, event.messageID);
		}
	}
};
