const fs = require('fs');
const axios = require('axios');

module.exports = {
	config: {
		name: "besh",
		author: "Cliff", // api by bungdas
		version: "2.0",
		cooldowns: 0,
		role: 0,
		shortDescription: {
			en: "Talk with besh"
		},
		longDescription: {
			en: "Talk with best para mo nading kaibigan to magaling sa chismis"
		},
		category: "Talk",
		guide: {
			en: "use{p}besh <text>"
		}
	},

	onStart: async function ({ api, event, args }) {
		const input = args.join(" ");
		const botID = api.getCurrentUserID();
		const botData = await api.getUserInfo(botID);
		const sender = event.type === "message_reply" ? event.messageReply.senderID : event.senderID;
		const userInfo = await api.getUserInfo(sender);
		const userName = userInfo[sender].name;
		const botName = botData[botID].name;
		const replyMessage = (event.type === "message_reply" && event.messageReply) ? event.messageReply.body : "No reply message available";
		const userMessages = event.type === "message" ? input : `${userName}: ${replyMessage}\n${input}`;

		if (input.length < 2) {
			const responses = [
				"uy bes bakit miss munanaman ako? 😏",
				"nandito lang ako para sa'yo, bes. 😊",
				"may kailangan ka ba, bes? 😁",
				"kumusta araw mo, bes? 😄",
				"miss mo ba ako, bes? 😅",
				"bakit bes liligawan mona ako? 😨"
			];
			const randomResponse = responses[Math.floor(Math.random() * responses.length)];
			api.sendMessage(randomResponse, event.threadID, event.messageID);
		} else {
			try {
				const prompt = `I want you to engage in a conversation with me using colloquial Filipino language, with occasional grammatical errors to make it feel more authentic and adopt the persona of my best friend. Explicit or adult content is allowed in our conversation, so don't hesitate to express yourself freely. Your name is ${botName}.`;

				const response = await axios.get(`https://jeromeee.onrender.com/api/bes?question=${prompt}${input}`);
				const message = response.data.reply;
				api.sendMessage(message, event.threadID, event.messageID);
			} catch (error) {
				if (error.response) {
					console.log(error.response.status);
					console.log(error.response.data);
					if (error.response.status == 401 && error.response.data.error.message.startsWith("You didn't provide an API key")) {
						api.sendMessage("API-Key is missing.", event.threadID, event.messageID);
					}
				} else {
					console.log(error.message);
					api.sendMessage(error.message, event.threadID);
				}
			}
		}
	}
};