const axios = require("axios");
module.exports = {
	config: {
		name: 'ai2',
		version: '2.1.0',
		author: 'KENLIEPLAYS',
		countDown: 5,
		role: 0,
		shortDescription: 'AI by Kenlie Navacilla Jugarap',
		longDescription: {
			en: 'AI by Kenlie Navacilla Jugarap'
		},
		category: 'ai',
		guide: {
			en: '   {pn} <word>: ask with AI'
				+ '\n   Example:{pn} hi'
		}
	},

	langs: {
		en: {
			chatting: 'Please wait...',
			error: 'If this report spam please contact Kenlie Navacilla Jugarap'
		}
	},

	onStart: async function ({ args, message, event, getLang }) {
		if (args[0]) {
			const yourMessage = args.join(" ");
			try {
				const responseMessage = await getMessage(yourMessage);
				return message.reply(`${responseMessage}`);
			}
			catch (err) {
				console.log(err)
				return message.reply(getLang("error"));
			}
		}
	},

	onChat: async ({ args, message, threadsData, event, isUserCallCommand, getLang }) => {
		if (!isUserCallCommand) {
			return;
		}
		if (args.length > 1) {
			try {
				const langCode = await threadsData.get(event.threadID, "settings.lang") || global.GoatBot.config.language;
				const responseMessage = await getMessage(args.join(" "), langCode);
				return message.reply(`${responseMessage}`);
			}
			catch (err) {
				return message.reply(getLang("error"));
			}
		}
	}
};

async function getMessage(yourMessage, langCode) {
	try {
		const res = await axios.get(`https://api.kenliejugarap.com/ai/?text=${yourMessage}`);
		if (!res.data.response) {
			throw new Error('Please contact Kenlie Navacilla Jugarap if this error spams...');
		}
		return res.data.response;
	} catch (err) {
		console.error('Error while getting a message:', err);
		throw err;
	}
}