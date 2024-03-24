const axios = require('axios');

module.exports = {
	config: {
		name: "offer",
		aliases: ["offer"],
		version: "1.0",
		author: "@tas33n",
		countDown: 5,
		role: 0,
		shortDescription: "get sim offer packs",
		longDescription: "",
		category: "useless",
		guide: "{pn} {{<operator name>}}"
	},

	onStart: async function ({ message, args }) {
		const ot = args.join(" ");
		if (!ot)
			return message.reply(`⚠️ | Please enter Operator name!\nRobi = rb\nBanglalink = bl\nAirtel = at\nGp = gp`);
		else {
			const BASE_URL = `https://api.misfitsdev.xyz/offer?ot=${ot}`;
			try {
				let res = await axios.get(BASE_URL)

				let res2 = res.data

				let form = ""

for(var item of res2.bmtelbd){

	form +=`\n${item.title}\nPrice:${item.price}\n\n`
}


				// const form = {
				// 	body: `===「 Todays Offer 」===`
				// 		+ `\n${res2}`

				// };
				// if (img)
				// 	form.attachment = await global.utils.getStreamFromURL(img);
				message.reply(`===「 Todays Offer 」===\n\n`
		+ `${form}`);
			} catch (e) { message.reply(`🥺 Not Found`) }

		}
	}
};