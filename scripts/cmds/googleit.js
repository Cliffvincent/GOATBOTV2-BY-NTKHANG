module.exports = {
	config: {
		name: 'googlesearch',
		aliases: ['googleit', 'searchh'],
		version: '1.0',
		author: 'Samir Œ',
		shortDescription: 'Perform a Google search.',
		longDescription: 'Performs a Google search and provides the top results.',
		category: 'Utility',
		guide: {
			en: '{pn} [search query]',
		},
	},
	onStart: async function ({ message, args }) {
		try {
			const searchQuery = args.join(' ');

			if (!searchQuery) {
				return message.reply('Please provide a search query.');
			}

			const googleSearchResult = await performGoogleSearch(searchQuery);

			message.reply(googleSearchResult);
		} catch (error) {
			console.error(error);
			message.reply('An error occurred during the Google search.');
		}
	},
};

async function performGoogleSearch(text) {
	try {
		const googleit = require('google-it');
		const googleSearch = await googleit({ query: text });
		let resText = `⚡️ Google Search Results ⚡️\n\n🔍 Search Term: ${text}\n\n`;

		for (let num = 0; num < Math.min(5, googleSearch.length); num++) {
			resText += `📍 Result ${num + 1}:\n\n📚 Title: ${
				googleSearch[num].title
			}\n\n🔍 Description: ${
				googleSearch[num].snippet
			}\n\n🌐 Link: [${googleSearch[num].link}](${googleSearch[num].link})\n\n`;
		}

		console.log(resText);
		return resText;
	} catch (error) {
		console.error('Error during Google search:', error);
	}
}