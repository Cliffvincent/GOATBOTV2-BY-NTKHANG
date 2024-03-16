 const axios = require('axios');
const tracker = {};

const config = {
	name: "claude",
	version: "1.0",
	author: "Samir Œ",
	countDown: 5,
	role: 0,
	longDescription: "Claude3 AI",
	category: "𝗔𝗜",
	guide: { en: "{pn} <query>" },
};

const apiKey = ""; // add your  API key

const onStart = async function ({ message, event, args, usersData }) {
	const prompt = args.join(' ');
	const userName = await usersData.getName(event.senderID);
	const userID = event.senderID;

	if (!args[0]) return message.reply('Please enter a query.');

	if (args[0] === 'clear') {
		clearHistory();
		const c = await clean(userID);
		if (c) return message.reply('Conversation history cleared.');
	}

	await claudeAI(prompt, userID, message, userName, config.name.toLowerCase());
};

const onReply = async function ({ Reply, message, event, args, getLang, usersData }) {
	const { author } = Reply;
	if (author !== event.senderID) return;
	const prompt = args.join(' ');
	const userID = event.senderID;
	const userName = await usersData.getName(event.senderID);
	await claudeAI(prompt, userID, message, userName, config.name.toLowerCase());
};

const clearHistory = function () {
	global.GoatBot.onReply.clear();
};

async function clean(userID) {
	if (tracker[userID]) {
		delete tracker[userID];
		return true;
	}
	return false;
}

async function claudeAI(text, userID, message, userName, commandName) {
	if (!tracker[userID]) {
		tracker[userID] = `${userName}.\n`;
	}
	tracker[userID] += `${text}.\n`;

	try {
		const query = `- Current prompt: ${text}\n\n - Conversation:\n${tracker[userID]}\n`;
		const apiUrl = `https://api-samir.onrender.com/Claude3?prompt=${encodeURIComponent(query)}&apiKey=${apiKey}`;
		const response = await axios.get(apiUrl, {
			headers: {
				'Content-Type': 'application/json',
			},
		});

		const resultContent = response.data.content.text;
		tracker[userID] += `${resultContent}`;
		await message.reply(resultContent, (error, info) => {
			global.GoatBot.onReply.set(info.messageID, {
				commandName: commandName, author: userID
			});
		});
	} catch (error) {
		console.error(error);
		message.reply("An error occurred.");
	}
}

//Inspired from Rehat Mistral cmd 

module.exports = {
	config,
	onStart,
	onReply,
};