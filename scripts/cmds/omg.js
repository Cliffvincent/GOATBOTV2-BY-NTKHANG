const fs = require('fs');
module.exports = {
	config: {
		name: "omg",
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
		if (event.body && event.body.toLowerCase() === "omg") {
			return message.reply({
				body: "omgggggggggg🤐🤐😦😦😦😧😧😦😧😦😧😦😧😦😦😧😦😧😧😧",
				attachment: fs.createReadStream("omg.mp4"),
			});
		}
	}
};