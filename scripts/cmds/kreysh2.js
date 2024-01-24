const axios = require('axios');

module.exports = {
	config: {
		name: 'kreysh2',
		aliases: ['bot/kreysh'],
		version: '1.1',
		author: 'Samir',
		countDown: 5,
		role: 0,
		shortDescription: 'kreysh',
		longDescription: 'Chat with kreysh',
		category: 'funny',
		guide: {
			body: '   {pn} {{[on | off]}}: enable/disable kreysh'
				+ '\n'
				+ '\n   {pn} {{<word>}}: Quick chat with kreysh'
				+ '\n   Example: {pn} {{hi}}'
		}
	},

	onStart: async function ({ args, threadsData, message, event }) {
		if (args[0] == 'on' || args[0] == 'off') {
			await threadsData.set(event.threadID, args[0] == "on", "settings.kreysh");
			return message.reply(`Already ${args[0] == "on" ? "on" : "off"} kreysh in your group`);
		}
		else if (args[0]) {
			const yourMessage = args.join(" ");
			try {
				const responseMessage = await getMessage(yourMessage);
				return message.reply(`${responseMessage}`);
			}
			catch (err) {
				return message.reply("kreysh is busy, please try again later");
			}
		}
	},

	onChat: async ({ args, message, threadsData, event, isUserCallCommand }) => {
		if (args.length > 1 && !isUserCallCommand && await threadsData.get(event.threadID, "settings.kreysh")) {
			try {
				const responseMessage = await getMessage(args.join(" "));
				return message.reply(`${responseMessage}\n🐣 kreysh answer you!`);
			}
			catch (err) {
				return message.reply("kreysh is busy, please try again later");
			}
		}
	}
};

async function getMessage(yourMessage) {
	const res = await axios.get(`https://api.simsimi.net/v2`, {
		params: {
			text: yourMessage,
			lc: global.GoatBot.config.language == 'vi' ? 'vn' : 'en',
			cf: false
		}
	});

	if (res.status > 200)
		throw new Error(res.data.success);

	return res.data.success;
}