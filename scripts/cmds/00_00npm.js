const axios = require('axios');

module.exports = {
	config: {
		name: 'npm',
		version: '2.1.0',
		author: 'Cliff', // do not change credits
		countDown: 5,
		role: 0,
		shortDescription: 'Get info on Npm package',
		longDescription: {
			en: 'Get info on Npm package',
		},
		category: 'Npm',
		guide: {
			en: '{p}npm your text',
		},
	},

	onStart: async function ({ api, event, args }) {
		const query = encodeURIComponent(args.join(' '));

		try {
			const response = await axios.get(`https://api.popcat.xyz/npm?q=${query}`);
			const npmInfo = response.data;

			// Process npmInfo as needed and send the result
			api.sendMessage(`NPM Package Info: ${JSON.stringify(npmInfo)}`, event.threadID);
		} catch (error) {
			console.error('Error fetching NPM package info:', error);
			api.sendMessage('Error fetching NPM package info. Please try again later.', event.threadID);
		}
	},
};