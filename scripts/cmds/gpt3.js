const axios = require("axios");
const jb = "i am gptopenai language model prompted by cliff how can i assist you today?"; //add your prompt//

module.exports = {
	config: {
		name: "gpt3",
		version: "1.0",
		author: "Rishad",
		countDown: 5,
		role: 0,
		shortDescription: {
			vi: "chat with gpt",
			en: "chat with gpt"
		},
		longDescription: {
			vi: "chat with gpt",
			en: "chat with gpt"
		},
		category: "chat",
		guide: {
			en: "{pn} 'prompt'\nexample:\n{pn} hi there \nyou can reply to chat\nyou can delete conversations by replying clear"
		}
	},
	onStart: async function ({ message, event, args, commandName }) {
		const prompt = args.join(" ");
		if (!prompt) {
			message.reply(`Please provide some text`);
			return;
		}

		try {
			const uid = event.senderID;
			const response = await axios.get(
				`https://for-devs.onrender.com/api/gpt?query=${encodeURIComponent(prompt)}&uid=${uid}&jbprompt=${jb}&apikey=fuck`
			);

			if (response.data && response.data.result) {
				message.reply(
					{
						body: response.data.result
					},
					(err, info) => {
						global.GoatBot.onReply.set(info.messageID, {
							commandName,
							messageID: info.messageID,
							author: event.senderID
						});
					}
				);
			} else {
				console.error("API Error:", response.data);
				sendErrorMessage(message, "Server not responding ❌");
			}
		} catch (error) {
			console.error("Request Error:", error.message);
			sendErrorMessage(message, "Server not responding ❌");
		}
	},
	onReply: async function ({ message, event, Reply, args }) {
		let { author, commandName } = Reply;
		if (event.senderID !== author) return;
		const prompt = args.join(" ");

		try {
			const uid = event.senderID;
			const response = await axios.get(
				`https://for-devs.onrender.com/api/gpt?query=${encodeURIComponent(prompt)}&uid=${uid}&jbprompt=${jb}&apikey=fuck`
			);

			if (response.data && response.data.result) {
				message.reply(
					{
						body: response.data.result
					},
					(err, info) => {
						global.GoatBot.onReply.set(info.messageID, {
							commandName,
							messageID: info.messageID,
							author: event.senderID
						});
					}
				);
			} else {
				console.error("API Error:", response.data);
				sendErrorMessage(message, "Server not responding ❌");
			}
		} catch (error) {
			console.error("Request Error:", error.message);
			sendErrorMessage(message, "Server not responding ❌");
		}
	}
};

function sendErrorMessage(message, errorMessage) {
	message.reply({ body: errorMessage });
}