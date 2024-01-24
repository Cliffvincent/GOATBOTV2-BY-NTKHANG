const axios = require("axios");

module.exports = {
		config: {
				name: "mlbbstalk",
				aliases: ["mlstalk"],
				version: "1.0",
				author: "Jun",
				countDown: 5,
				role: 0,
				shortDescription: "stalk ml account",
				longDescription: "",
				category: "fun",
				guide: "{Id | server}"
		},
		onStart: async function ({ api, event, args }) {
				if (!args[0]) return api.sendMessage("Please add ID | SERVER, threadID, messageID");
				try {
						const text = args[0];
						const text1 = text.substr(0, text.indexOf(' | '));
						const length = parseInt(text1.length);
						const text2 = text.split(" | ").pop();
						const length_2 = parseInt(text2.length);
						const res = await axios.get(`https://betabotz-api.herokuapp.com/api/stalk/ml?id=${text1}&server=${text2}&apikey=BetaBotz`);
						const plaintext = res.data.result.userName;
						return api.sendMessage(`${plaintext}`, event.threadID, event.messageID);
				} catch (error) {
						console.error(error);
						return api.sendMessage("An error occurred while executing the command.", event.threadID, event.messageID);
				}
		}
};