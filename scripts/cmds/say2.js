const axios = require("axios");

module.exports = {
	config: {
		name: "say2",
		version: "1.1",
		author: "Otinxsandip",
		countDown: 5,
		role: 0,
		longDescription: "voice",
		category: "ai",
		guide: {
			en: "{pn} text or reply to text with models here are supported models \nFiliz\nLupe\nEwa\nJacek\nAstrid\nJan\nSalli\nCristiano\nInes\nCarmen\nMaxim\nTatyana\nGeraint\nMaja\nPenelope\nMiguel\nGwyneth\nIvy\nJoey\nMatthew\nKimberly\nKendra\nJustin\nJoanna\nSally\njoey\nEmma"
		}
	},
	onStart: async function ({ message, api, args, event }) {
		const text = event.type === 'message_reply' ? event.messageReply.body : args.join(' ');

		if (!text) {
			return message.reply('Please type text or reply to text.');
		}

		const [lado, model] = args.join(" ").split('|').map((text) => text.trim());
		const puti = model || "18";
		const link = `https://sandipapi.onrender.com/speak?text=${text}&model=${puti}`;

		try {
			const response = await axios.get(link);
			const speak_url = response.data.speak_url;

			message.reply({
				body: 'Here is your TTS',
				attachment: await global.utils.getStreamFromURL(speak_url)
			});
		} catch (error) {
			console.error('Error:', error.message);
			return message.reply('An error occurred while processing the request.');
		}
	}
};