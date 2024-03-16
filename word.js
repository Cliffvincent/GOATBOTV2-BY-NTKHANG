const axios = require('axios');

module.exports = {
	config: {
		name: 'word',
		aliases: ['dic', 'what is'],
		version: '1.0',
		author: 'JV',
		role: 0,
		category: 'utility',
		shortDescription: {
			en: 'Explain the word by dictionary.'
		},
		longDescription: {
			en: 'Explain the word by dictionary.'
		},
		guide: {
			en: '{pn}'
		}
	},
	onStart: async function ({ api, event, args }) {
		try {
			const word = args.join(' ').toLowerCase();
			const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

			const wordResponse = await axios.get(url);

			if (wordResponse.status !== 200 || !wordResponse.data || !wordResponse.data[0]) {
				throw new Error('Invalid or missing response from WordApi');
			}

			const definition = wordResponse.data[0].meanings[0].definitions[0].definition;

			const message = `Here's the definition of ${word}: \n\n${definition}`;

			const resultMessageID = await api.sendMessage(message, event.threadID);

			if (!resultMessageID) {
				throw new Error('Failed to send result message');
			}

			console.log(`Sent result message with ID ${resultMessageID}`);
		} catch (error) {
			console.error(`Failed to look up word: ${error.message}`);
			api.sendMessage('Sorry, something went wrong while trying to look up the word. Please try again later.', event.threadID);
		}
	}
};