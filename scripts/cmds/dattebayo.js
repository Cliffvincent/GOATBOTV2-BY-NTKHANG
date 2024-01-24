const fs = require('fs');
module.exports = {
	config: {
		name: "dattebayo",
		version: "1.0",
		author: "Otineeeeeyyyyyy",
		countDown: 5,
		role: 0,
		shortDescription: "no prefix",
		longDescription: "no prefix",
		category: "no prefix",
	},
	onStart: async function(){},
	onChat: async function({ event, message, getLang }) {
		if (event.body && event.body.toLowerCase() === "dattebayo") {
			return message.reply({
				body: "『(θ‿θ)』",
				attachment: fs.createReadStream("dattebayo.m4a"),
			});
		}
	}
};