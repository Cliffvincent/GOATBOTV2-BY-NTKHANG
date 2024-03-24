const axios = require('axios');
const request = require('request');
const fs = require('fs');

module.exports = {
	config: {
		name: 'milf',
		aliases: ['asexy'],
		version: '1.0',
		author: 'Shinpei',
		countDown: 5,
		role: 0,
		shortDescription: {
			en: 'get a random anime picture'
		},
		longDescription: {
			en: 'get a random anime picture'
		},
		category: 'Anime',
		guide: {
			en: '{p}imganime'
		}
	},
	onStart: async function ({ api, event }) {
		try {
			const response = await axios.get('https://anime.ocvat2810.repl.co/');
			const ext = response.data.data.substring(response.data.data.lastIndexOf('.') + 1);
			const callback = () => {
				api.sendMessage({
					body: '「 wanna play with me?🥵💦 」',
					attachment: fs.createReadStream(`${__dirname}/tmp/anime.${ext}`)
				}, event.threadID, () => fs.unlinkSync(`${__dirname}/tmp/anime.${ext}`));
			};
			request(response.data.data).pipe(fs.createWriteStream(`${__dirname}/tmp/anime.${ext}`)).on('close', callback);
		} catch (error) {
			console.error(error);
			api.sendMessage('Sorry, something went wrong while fetching the anime picture.', event.threadID);
		}
	}
};