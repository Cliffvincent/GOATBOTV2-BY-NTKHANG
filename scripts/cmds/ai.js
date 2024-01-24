const axios = require('axios');
const tracker = {};

/*
A Turtle APIs Production created by Turtle Rehat.
Do not alter the credited information any attempt to do so may result in a permanent ban from Project86 APIs and Turtle APIs.
*/

module.exports = {
	config: {
		name: "bayot",
		version: "1.0",
		author: "rehat--",
		countDown: 5,
		role: 0,
		longDescription: "Chat GPT 4 Most Advance LLM",
		category: "ai",
		guide: { en: "{pn} <query>" },
	},
	clearHistory: function () {
		global.GoatBot.onReply.clear();
	},
	onStart: async function ({ message, event, args, usersData, api, commandName }) {
		const prompt = args.join(' ');
		const userID = event.senderID;
		const mid = event.messageID;

		if (!args[0]) return message.reply('Please enter a query.');

		if (args[0] == 'clear') {
			this.clearHistory();
			const c = await clean(userID);
			if (c) return message.reply('Conversation history cleared.');
		}

		api.setMessageReaction('⏳', mid, () => {}, true);
		gpt(prompt, userID, message, mid, api);
	},

	onReply: async function ({ Reply, message, event, args, api, usersData }) {
		const { author } = Reply;
		if (author !== event.senderID) return;

		const mid = event.messageID;
		const prompt = args.join(' ');
		const userID = event.senderID;

		if (args[0] == 'clear') {
			this.clearHistory();
			const c = await clean(userID);
			if (c) return message.reply('Conversation history cleared.');
		}

		api.setMessageReaction('⏳', mid, () => {}, true);
		gpt(prompt, userID, message, mid, api);
	}
};

async function clean(userID) {
	if (!tracker[userID]) return true;
	if (tracker[userID]) {
		delete tracker[userID];
		return true;
	}
}

async function gpt(text, userID, message, mid, api) {
	tracker[userID] = tracker[userID] || '';
	tracker[userID] += `${text}.\n`;

	try {
		const url = 'https://project86.cyclic.app/api/chat';

		const conversationHistory = encodeURIComponent(tracker[userID]);
		const getUrl = `${url}?query=${conversationHistory}`;

		const response = await axios.post(getUrl);

		const resultText = response.data.answer;
		tracker[userID] = `${tracker[userID]}${text}.\n${resultText}`;

		api.setMessageReaction('✅', mid, () => {}, true);
		message.reply(`${resultText}\n\n𝙔𝙤𝙪 𝙘𝙖𝙣 𝙧𝙚𝙥𝙡𝙮 𝙩𝙤 𝙘𝙤𝙣𝙩𝙞𝙣𝙪𝙚 𝙘𝙝𝙖𝙩𝙩𝙞𝙣𝙜.`, (error, info) => {
			global.GoatBot.onReply.set(info.messageID, {
				commandName: 'ai',
				author: userID,
			});
		});
	} catch (error) {
		api.setMessageReaction('❌', mid, () => {}, true);
		message.reply('An error occurred.');
	}
}