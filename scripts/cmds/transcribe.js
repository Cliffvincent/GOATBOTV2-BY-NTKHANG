const axios = require("axios");

const config = {
	name: "transcribe",
	aliases: ["ts"],
	version: "1.1",
	author: "Samir Œ",
	countDown: 10,
	role: 0,
	shortDescription: {
		en: "Converts speech into text."
	},
	longDescription: {
		en: "Converts speech into text using the Google Cloud Speech-to-Text API."
	},
	category: "AI",
	guide: {
		en: "{pn} reply to an audio/video"
	}
};

const onStart = async function({ event, api, message }) {
	try {
		if (!event.messageReply.attachments || event.messageReply.attachments.length === 0) {
			return message.reply('Please reply to an audio or video.');
		}

		const link = event.messageReply.attachments[0].url;
		const response = await axios.get(`https://api-samir.onrender.com/transcribe?url=${encodeURIComponent(link)}`);
		const text = response.data.transcript;

		if (text) {
			message.reply({
				body: text
			});
		} else {
			message.reply("Failed to transcribe the audio or video.");
		}
	} catch (error) {
		console.error(error);
		message.reply("An error occurred while processing the request.");
	}
};

module.exports = {
	config,
	onStart
};