const axios = require('axios');
module.exports = {
	config: {
		name: "hentaivid",
		version: "1.0",
		author: "MILAN",
		countDown: 5,
		role: 1,
		shortDescription: "hentai videos",
		longDescription: "get hentai videos",
		category: "adult",
		guide: {
			en: "{pn} "
 }
 },

	onStart: async function ({ event, message, getLang, threadsData, api, args }) {
			const BASE_URL = `https://milanbhandari.imageapi.repl.co/hentai?apikey=xyzmilan`;
 await message.reply("Processing your video please wait..."); 
			try {
				let res = await axios.get(BASE_URL)
				let vid = res.data.url;
				const form = {
					body: ``
				};
		 if (vid)
					form.attachment = await global.utils.getStreamFromURL(vid);
				message.reply(form); 
			} catch (e) { message.reply(`Something went wrong. Please try again later`)
 console.log(e);
 }

		}
	};