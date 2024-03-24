const fetch = require('node-fetch');

module.exports = {
	config: {
		name: "imgbb",
		version: "1.0",
		author: "Samir Œ",
		countDown: 5,
		role: 0,
		shortDescription: "Upload an image to imgbb",
		longDescription: "Upload an image to imgbb",
		category: "utility",
		guide: "{pn} <attached image>"
	},

	onStart: async function ({ message, event }) {
		try {
			const attachments = event.messageReply.attachments;
			if (!attachments || attachments.length === 0) {
				return message.reply("Please reply to a message with an attached image to upload.");
			}

			const imageUrl = attachments[0].url;

			const uploadUrl = 'https://api-samir.onrender.com/upload';
			const data = { file: imageUrl };

			const response = await fetch(uploadUrl, {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(data)
			});

			const result = await response.json();

			if (result && result.image && result.image.url) {
				const cleanImageUrl = result.image.url.split('-')[0]; 

				message.reply({body: `${cleanImageUrl}.jpg`})
			} else {
				message.reply("Failed to upload the image to imgbb.");
			}
		} catch (error) {
			console.error('Error:', error);
			message.reply(`Error: ${error}`);
		}
	}
};