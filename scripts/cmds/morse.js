const axios = require("axios");

module.exports = {
	config: {
		name: "morse",
		version: "1.0",
		author: "Jun",
		countDown: 5,
		role: 0,
		shortDescription: {
			en: "Converts text to Morse code.",
		},
		longDescription: {
			en: "This command converts the given text to Morse code.",
		},
		category: "utility",
		guide: {
			en: "<text>",
		},
	},
	onStart: async function ({ api, event, args }) {
		let juswa = args.join(" ");
		const res = await axios.get(`https://api.popcat.xyz/texttomorse?text=${juswa}`);
		var morse = res.data.morse;
		return api.sendMessage(morse, event.threadID, event.messageID);
	},
};