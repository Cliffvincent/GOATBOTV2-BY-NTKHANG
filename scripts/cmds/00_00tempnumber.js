const axios = require("axios");

module.exports = {
	config: {
		name: "tempnum",
		version: "1.0", 
		author: "Rishad",
		countDown: 5,
		role: 0,
		shortDescription: {
			en: "generate temporary phone numbers and retrieve inbox messages",
			vi: "generate temporary phone numbers and retrieve inbox messages",
		},
		longDescription: {
			en: "generate temporary phone numbers and retrieve inbox messages",
			vi: "generate temporary phone numbers and retrieve inbox messages",
		},
		category: "tool",
		guide: {
			en: "{pn} gen (1-10)\n{pn} inbox (number) | (1-10)",
			vi: "{pn} gen (1-10)\n{pn} inbox (number) | (1-10)",
		},
	},

	onStart: async function ({ api, args, event }) {
		const command = args[0];

		try {
			if (command === "gen") {
				let num = args[1];

				num = num || 1;

				if (isNaN(num) || num < 1 || num > 100) {
					return api.sendMessage("Please provide a valid number between 1 and 100 for generating temporary phone numbers.", event.threadID);
				}

				const response = await axios.get(`https://for-devs.onrender.com/api/tempnum/gen?num=${num}&apikey=fuck`);
				const tempNumbers = response.data;


				const formattedNumbers = tempNumbers.map((tempNum) => {
					return `Country: ${tempNum.country}\nNumber: ${tempNum.number}\nGenerated ${tempNum.time}`;
				});

				return api.sendMessage(`Generated temporary numbers:\n\n${formattedNumbers.join("\n\n")}`, event.threadID);

			} else if (command === "inbox") {
				let [phone, num] = args.slice(1).join(" ").split("|").map((str) => str.trim());

				if (!phone || isNaN(phone)) {
					return api.sendMessage("Please provide a valid phone number for retrieving inbox messages.", event.threadID);
				}

				num = num || 1;

				if (isNaN(num)) {
					return api.sendMessage("Please provide a valid number for retrieving inbox messages.", event.threadID);
				}

				const inboxResponse = await axios.get(`https://for-devs.onrender.com/api/tempnum/inbox?phone=${phone}&num=${num}&apikey=fuck`);
				const inboxMessages = inboxResponse.data;

				const formattedMessages = inboxMessages.map((message) => {
					return `${message.sms} - From: ${message.sender}`;
				});

				return api.sendMessage(`Inbox messages for ${phone}:\n\n${formattedMessages.join("\n\n")}\n\n`, event.threadID);

			} else {
				return api.sendMessage("Invalid command. Use {pn} gen (1-10) or {pn} inbox (number) | (1-10).", event.threadID);
			}
		} catch (error) {
			console.error(error);
			return api.sendMessage("An error occurred. Please try again later.", event.threadID);
		}
	}
};