const axios = require('axios');

module.exports = {
	config: {
		name: 'professor',
		version: '3.0',
		author: 'Api by JV Barcenas', // do not change
		credits: 'Api by JV Barcenas', // do not change
		role: 0,
		usePrefix: true,
		category: 'AI 🤖',
		commandCategory: 'Ai',
		descrption: 'Professor Ai, willing to teach you as he can.',
		usages: '[prompt]',
		shortDescription: {
			en: 'Professor Ai, willing to teach you as he can.',
		},
		longDescription: {
			en: 'Ask anything educational content to professor Ai',
		},
		guide: {
			en: '{pn} [prompt]',
		},
	},
	onStart: async function (context) {
		const { api, event } = context;

		try {
			const prompt = event.body.trim();

			if (prompt) {
				const loadingMessage = await api.sendMessage("Professor Ai is thinking. Please wait a moment...", event.threadID);
api.setMessageReaction("⏱️", event.messageID, () => {}, true);
				api.setMessageReaction("🤔", loadingMessage.messageID, () => {}, true);


				const response = await axios.get(`https://gptproffessor.miraixyxy.repl.co/professor?prompt=${encodeURIComponent(prompt)}`);

				if (response.data) {
					const messageText = `🧑‍🏫Professor: 

					${response.data.content}`;
					const answer = await api.sendMessage(messageText, event.threadID);
					api.setMessageReaction("✅", event.messageID, () => {}, true);api.setMessageReaction("😻", answer.messageID, () => {}, true);



					console.log('Sent answer as a reply to the user');
				} else {
					throw new Error('Invalid or missing response from API');
				}
				api.unsendMessage(loadingMessage.messageID);
			}

		} catch (error) {
			console.error(`Failed to get an answer: ${error.content}`);
			api.sendMessage(
				`${error.content}.\n\nYou can try typing your question again or resending it, as there might be a bug from the server that's causing the problem. It might resolve the issue.`,
				event.threadID
			);
		}
	},
	run: async function (context) {
		module.exports.onStart(context);
	}
};