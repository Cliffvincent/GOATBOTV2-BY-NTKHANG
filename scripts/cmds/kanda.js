const axios = require('axios');
module.exports = {
	config: {
		name: "Kanda",
		aliases: ["Kanda"],
		version: "1.0",
		author: "MILAN",
		countDown: 5,
		role: 2,
		shortDescription: "Kanda videos",
		longDescription: "get Kanda videos",
		category: "𝟭𝟴+",
		guide: "{pn}"

 },

	onStart: async function ({ message, args }) {
			const BASE_URL = `https://apis.samirbadaila24.repl.co/kanda/apikey=samir`;
 message.reply("Processing your video please wait...it will be ready soon😍❤"); 
			try {
				let res = await axios.get(BASE_URL)
				let kanda = res.data.url;
				const form = {
					body: `How about this🥵🥵🥵`
				};
		 if (kanda)
					form.attachment = await global.utils.getStreamFromURL(kanda);
				message.reply(form); 
			} catch (e) { message.reply(`Something went wrong. Please try again later`)
 console.log(e);
 }
		}
	};