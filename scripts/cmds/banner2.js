const axios = require("axios");
const fs = require("fs-extra");

module.exports = {
	config: {
		name: "banner2",
		version: "1.0",
		author: "cliff",
		countDown: 10,
		role: 0,
		shortDescription: "Create Genshin Impact banner",
		longDescription: "",
		category: "image",
		guide: {
			en: "{p}{n}  Name | Character ID",
		}
	},

	onStart: async function ({ message, args, event, api }) {
		const [name, idCharacter] = args;

		if (!name || !idCharacter) {
			return message.reply(`Please enter in the format:\n/bannerGenshin Name | Character ID`);
		}

		try {
			const response = await axios({
				url: "http://goatbot.tk/api/anime/banner-genshin",
				method: "GET",
				headers: {
					"apikey": ""
				},
				params: {
					"name": name,
					"idCharacter": idCharacter
				},
				responseType: 'arraybuffer'
			});

			fs.writeFileSync(__dirname + "/bannerGenshin.png", Buffer.from(response.data));
			message.reply({
				body: "Here's the Genshin Impact banner for you!",
				attachment: fs.createReadStream(__dirname + "/bannerGenshin.png")
			});
		}
		catch (error) {
			console.log(error);
			message.reply("An error occurred while generating the Genshin Impact banner. Please try again later.");
		}
	}
};