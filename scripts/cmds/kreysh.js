const axios = require("axios");

module.exports = {
	config: {
		name: "kreysh",
		aliases: ["sim"],
		version: "1.0",
		author: "jun",
		countDown: 0,
		role: 0,
		shortDescription: {
			en: "ask sim",
		},
		longDescription: {
			en: "ask sim",
		},
		category: "chat",
		guide: {
			en: "{p}ask sim",
		},
	},
	onStart: async function ({ api, event, args }) {
		const ask = args.join(" ");
		try {
			const response = await axios.get(`https://sim.ainz-project.repl.co/sim?ask=${ask}`);
			const ans = response.data.respond;
			api.sendMessage(ans, event.threadID, event.messageID);
		} catch (error) {
			console.log(error);
			api.sendMessage("Sorry, something went wrong. Please try again later.", event.threadID);
		}
	},
};