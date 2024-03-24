const axios = require('axios');
const fs = require('fs-extra');
const os = require('os');
const { createReadStream, unlinkSync } = fs;
const { resolve } = require('path');

let isMotivationEnabled = false;
let intervalId;

module.exports = {
	config: {
		name: 'motivation',
		aliases: [],
		author: 'kshitiz',
		version: '2.0',
		cooldowns: 5,
		role: 0,
		shortDescription: {
			en: 'Get a random motivational quote',
		},
		longDescription: {
			en: 'get a random inspirational quote every hour ',
		},
		category: 'fun',
		guide: {
			en: '{p}{n} on / off',
		},
	},
	onStart: async function ({ api, event, args }) {
		const command = args[0];

		if (command === 'on') {
			if (isMotivationEnabled) {
				api.sendMessage('Auto Motivation is already enabled.', event.threadID);
			} else {
				isMotivationEnabled = true;
				api.sendMessage('Motivation feature is now enabled.\nQuotes will be sent every hour', event.threadID);
				startSendingMotivationalQuotes(api, event.threadID);
			}
		} else if (command === 'off') {
			if (!isMotivationEnabled) {
				api.sendMessage('Auto Motivation is already disabled.', event.threadID);
			} else {
				isMotivationEnabled = false;
				clearInterval(intervalId);
				api.sendMessage('Auto Motivation  is now disabled.', event.threadID);
			}
		} else {
			api.sendMessage('Please type `{p}motivation on` to start, and `{p}motivation off` to stop.', event.threadID);
		}
	},
};

async function startSendingMotivationalQuotes(api, threadID) {
	intervalId = setInterval(async () => {
		try {
			await sendMotivationalQuote(api, threadID);
		} catch (error) {
			console.error('Error:', error);
		}
	}, 60 * 60 * 1000); // Send a motivation every 1 hour
}

async function sendMotivationalQuote(api, threadID) {
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

		const languageToSay = 'en';
		const audioFilePath = resolve(os.tmpdir(), `${threadID}_${new Date().getTime()}.mp3`);
		await global.utils.downloadFile(`https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(quote)}&tl=${languageToSay}&client=tw-ob`, audioFilePath);

		api.sendMessage({ attachment: createReadStream(audioFilePath), body: quote }, threadID, () => unlinkSync(audioFilePath));
	} catch (error) {
		console.error('Error:', error.response ? error.response.data : error.message);
		api.sendMessage(`Error fetching the quote. Details: ${error.message}`, threadID);
	}
}
