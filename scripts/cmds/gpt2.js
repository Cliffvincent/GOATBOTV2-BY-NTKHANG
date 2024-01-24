const axios = require("axios");

module.exports = {
	config: {
		name: "gpt2",
		aliases: [],
		version: "1.0",
		author: "EDINST",
		countDown: 10,
		role: 0,
		shortDescription: {
			en: ""
		},
		longDescription: {
			en: ""
		},
		category: "𝗔𝗜",
		guide: {
			en: ""
		}
	},
	langs: {
		en: {
			gg: ""
		}
	},

	onStart: async function({ api, event, args, message }) {
		try {
			const msg = args.join(" "); 

			const response = await axios.post("https://catgpt.guru/api/chat", {
				messages: [
					{
						role: "user",
						content: msg
					}
				]
			});

			console.log(response.data);

			api.sendMessage(response.data, event.threadID, event.messageID);
		} catch (error) {
			console.error(error);
		}
	}
};