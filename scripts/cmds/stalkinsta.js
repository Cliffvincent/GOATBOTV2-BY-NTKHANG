const axios = require("axios");

module.exports = {
	config: {
		name: "stalkinsta",
		aliases: ["instastalk"],
		version: "1.0",
		author: "AceGun",
		countDown: 5,
		role: 0,
		shortDescription: "Get Instagram user info",
		longDescription: {
			en: "Provides you the information of an Instagram user"
		},
		category: "info",
		guide: {
			en: "{pn} <username>"
		}
	},
	onStart: async function ({ api, event, args, message }) {
		try {
			const username = args.join(" ");
			const response = await axios.get(`https://api.popcat.xyz/instagram?user=${username}`);

			const message = {
				body: `Here's some information about @${username} on Instagram:\n\n` +
					`❏ Full Name: ${response.data.full_name}\n` +
					`❏ Username: ${response.data.username}\n` +
					`❏ Biography: ${response.data.biography}\n` +
					`❏ Followers: ${response.data.followers}\n` +
					`❏ Following: ${response.data.following}\n` +
					`❏ Posts: ${response.data.posts}\n` +
					`❏ Profile Picture:`,
				attachment: await global.utils.getStreamFromURL(response.data.profile_picture)
			};

			return api.sendMessage(message, event.threadID);
		} catch (error) {
			console.error(error);
			message.reply("An error occurred while fetching the user information.");
		}
	}
};