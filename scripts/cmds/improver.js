const axios = require('axios');

module.exports = {
	config: {
		name: "improve",
		version: "1.0",
		author: "Samir Œ",
		shortDescription: "Improve a prompt",
		longDescription: "Get an improved version of a given prompt.",
		category: "AI",
		guide: "{prefix}improve <prompt>",
	},

	onStart: async function ({ message, args }) {
		const prompt = args.join(" ");

		if (!prompt) {
			return message.reply("Please provide a prompt to improve.");
		}

		try {
			const response = await axios.get(`https://api-samir.onrender.com/prompt/improver?text=${encodeURIComponent(prompt)}`);
			message.reply(response.data);
		} catch (error) {
			console.error(error.message);
			message.reply("An error occurred while improving the prompt.");
		}
	}
};