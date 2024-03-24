const { get } = require('axios');

module.exports = {
	config: {
		name: "gojo",
		author: "deku",
		version: "2.0",
		cooldowns: 0,
		role: 0,
		shortDescription: {
			en: "Talk to GOJO AI the blindfolded sorcerer (with continuous conversation)"
		},
		category: "AI",
		guide: {
			en: "To use this command, type 'gojo' followed by your message. For example: 'gojo hi'"
		}
	},

	onStart: async function ({ api, event, args }) {
		const prompt = args.join(' ');
		const id = event.senderID;

		function sendMessage(msg) {
			api.sendMessage(msg, event.threadID, event.messageID);
		}

		const url = "http://eu4.diresnode.com:3301";

		if (!prompt) return sendMessage("Missing input!\n\nIf you want to reset the conversation with " + this.config.name + " you can use '" + this.config.name + " clear'");
		sendMessage("🔍…");

		try {
			const response = await get(`${url}/gojo_gpt?prompt=${encodeURIComponent(prompt)}&idd=${id}`);
			sendMessage(response.data.gojo);
		} catch (error) {
			sendMessage(error.message);
		}
	},
};
