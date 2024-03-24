const axios = require('axios');
const fs = require('fs-extra');
const os = require('os');
const { createReadStream, unlinkSync } = fs;
const { resolve } = require('path');

module.exports = {
	config: {
		name: 'motivation2',
		aliases: [],
		author: 'kshitiz',
		version: '2.0',
		cooldowns: 5,
		role: 0,
		shortDescription: {
			en: 'Get a random inspirational quote.',
		},
		longDescription: {
			en: 'get a random inspirational quote with audio',
		},
		category: 'fun',
		guide: {
			en: '{p}motivation',
		},
	},
	onStart: async function ({ api, event }) {
		const apiKey = '0Hr3RnpBTgQvQ9np4ibDrQ==CkYJq9yAT5yk6vIn';
		const category = 'inspirational';

		try {

			const response = await axios.get(`https://api.api-ninjas.com/v1/quotes?category=${category}`, {
				headers: {
					'X-Api-Key': apiKey,
					'Content-Type': 'application/json',
				},
			});

			const quote = response.data[0].quote;


			const cacheFilePath = resolve(os.tmpdir(), 'randomQuote.txt');
			await fs.writeFile(cacheFilePath, quote);


			const languageToSay = 'en'; 
			const audioFilePath = resolve(os.tmpdir(), `${event.threadID}_${event.senderID}.mp3`);
			await global.utils.downloadFile(`https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(quote)}&tl=${languageToSay}&client=tw-ob`, audioFilePath);


			api.sendMessage({ attachment: createReadStream(audioFilePath), body: quote }, event.threadID, () => unlinkSync(audioFilePath));


			unlinkSync(cacheFilePath);
		} catch (error) {
			console.error('Error:', error.response ? error.response.data : error.message);
			api.sendMessage(`Error fetching the quote. Details: ${error.message}`, event.threadID);
		}
	},
};