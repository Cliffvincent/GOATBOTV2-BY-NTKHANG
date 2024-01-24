const axios = require('axios');

module.exports = {
	config: {
		name: "llma2",
		author: "cliff",
		countDown: 5,
		role: 0,
		category: "member",
		shortDescription: {
			en: ""
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
				return api.sendMessage('Please provide a prompt to generate a text response.\n\nllama {prompt}\nExample: llama What is kardashev scale?\n', event.threadID, event.messageID);
			}

			const cyni_api = `https://cyni-api-collection.onrender.com/api/llama-70B?question=${encodeURIComponent(prompt)}`;

			const response = await axios.get(cyni_api);

			if (response.data && response.data.llama70B) {
				const generatedText = response.data.llama70B;
				api.sendMessage({ body: generatedText, attachment: null }, event.threadID, messageID);
			} else {
				console.error('API response did not contain expected data:', response.data);
				api.sendMessage(`❌ An error occurred while generating the text response. Please try again later. Response data: ${JSON.stringify(response.data)}`, event.threadID, messageID);
			}
		} catch (error) {
			console.error('Error:', error);
			api.sendMessage(`❌ An error occurred while generating the text response. Please try again later. Error details: ${error.message}`, event.threadID, messageID);
		}
	}
};