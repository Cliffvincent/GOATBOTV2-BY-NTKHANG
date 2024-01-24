const axios = require('axios');
module.exports = {
	config: {
		name: "fixgrammar",
		aliases: ["fixgrammar"],
		version: "1.0",
		author: "lee",
		countDown: 5,
		role: 0,
		shortDescription: "is a command that helps improve grammar by suggesting corrections and providing recommendations.",
		longDescription: "is a command that helps improve grammar by suggesting corrections and providing recommendations.",
		category: "study",
		guide: {
			en: "{pn} [Sentences/Paragraph]"
		},
	},

	onStart: async function ({ message, args, api, event }) {
		const axios = require("axios");
		let { threadID, messageID } = event;
		const text = args.join(" ");
		if (!text) return api.sendMessage(`Use correctly`, threadID, messageID);

		try {
			const res = await axios.get(`https://grammarcorrection.mahirochan1.repl.co/grammar?text=${text}`);
			const { message } = res.data;
			api.sendMessage(`📜Corrected Paragraph: ${message}`, threadID, messageID);
		} catch (error) {
			console.error(error);
			api.sendMessage("An error occurred while making the API request.", threadID, messageID);
		}
	}
};