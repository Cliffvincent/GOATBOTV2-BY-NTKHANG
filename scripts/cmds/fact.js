const axios = require('axios');

module.exports = {
	config: {
		name: "fact",
		alliases: ["facts"],
		version: "1.0",
		author: "Samir",
		countDown: 30,
		role: 0,
		shortDescription: "Get Random Fact",
		longDescription: "Get Random Fact",
		category: "Study",
		guide: "{pn}"
	},

	onStart: async function ({ api, event, args }) {
		const res = await axios.get(`https://api.popcat.xyz/fact`);
var fact = res.data.fact;
return api.sendMessage(`Did you know? \n${fact}`, event.threadID, event.messageID)
	}
};