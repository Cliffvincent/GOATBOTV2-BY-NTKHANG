const axios = require('axios');

module.exports = {
	config: {
		name: "pastebininfo",
		version: "1.0",
		author: "Samir Œ",
		shortDescription: "Get Pastebin user information",
		longDescription: "Get information about a Pastebin user",
		category: "utility",
		guide: "{prefix}pastebininfo <username>"
	},

	onStart: async function ({ message, args }) {
		const username = args[0];

		if (!username) {
			return message.reply("Please provide a Pastebin username.");
		}

		try {
			const apiUrl = `https://api-samir.onrender.com/pastebin/userinfo?name=${encodeURIComponent(username)}`;
			const response = await axios.get(apiUrl);
			const userInfo = response.data;

			message.reply({
				body: `📋 **${userInfo.name}**\n\n👀 Viewing: ${userInfo.viewing}\n👁 Total Views: ${userInfo.totalViews}\n⭐ Rating: ${userInfo.rating}\n📅 Joined: ${userInfo.joined}\n📆 Creation Date: ${userInfo.creationDate}`,
				attachment: await global.utils.getStreamFromURL(userInfo.userIcon)
			});
		} catch (error) {
			console.error(error);
			message.reply("An error occurred while fetching Pastebin user information.");
		}
	}
};