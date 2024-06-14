const { GoatWrapper } = require('fca-liane-utils');
const axios = require('axios');

module.exports = {
		config: {
				name: "gpt4o",
				version: "1.0",
				author: "Kenlie",
				countDown: 5,
				hasPermssion: 0,
				role: 0,
				credits: "Kenlie",
				description: 'Powered by OpenAI',
				usePrefix: false,
				hasPrefix: false,
				commandCategory: 'AI',
				usage: '{pn} [prompt]',
				cooldown: 0,
				shortDescription: {
						vi: "chat với gpt4o",
						en: "chat with gpt4o"
				},
				longDescription: {
						vi: "chat với gpt",
						en: "chat with gpt"
				},
				category: "chat",
				guide: {
						en: "{pn} 'prompt'\nExample:\n{pn} hi there\nyou can reply to chat"
				}
		},

		onStart: async function ({ api, message, event, args }) {
				let user = args.join(' ');

				try {
						if (!user) {
								return api.sendMessage('Please provide a question first!', event.threadID, event.messageID);
						}

						const cliff = await new Promise(resolve => {
								api.sendMessage('🔍 Searching Please Wait....', event.threadID, (err, info1) => {
										resolve(info1);
								}, event.messageID);
						});

						const response = await axios.get(`https://api.kenliejugarap.com/freegpt4o128k/?question=${encodeURIComponent(user)}`);

						const responseData = response.data.response;
						const cleanResponseData = responseData.replace(/\n\nIs this answer helpful to you\? Kindly click the link below\nhttps:\/\/click2donate.kenliejugarap.com\n\(Clicking the link and clicking any ads or button and wait for 30 seconds \(3 times\) everyday is a big donation and help to us to maintain the servers, last longer, and upgrade servers in the future\)/, '');
						const replyMessage = `𝗚𝗣𝗧-𝟰𝗼 (128k-context)\n▱▱▱▱▱▱▱▱▱▱▱▱▱▱▱\n${cleanResponseData}`;
						api.editMessage(replyMessage, cliff.messageID);
				} catch (err) {
						console.error(err);
						api.sendMessage('An error occurred while processing your request.', event.threadID, event.messageID);
				}
		}
};

const wrapper = new GoatWrapper(module.exports);
wrapper.applyNoPrefix({ allowPrefix: true });