const axios = require('axios');
const fs = require('fs');

function isValidEmoji(emoji) {
		return emoji.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]/);
}

module.exports = {
		config: {
				name: "emojimix2",
				version: "1.0.0",
				role: 0,
				author: "Developer",
				shortDescription: "Mix two emojis",
				countDown: 0,
				category: "Ai",
				guide: {
						en: '{p}emojimix [emoji1] [emoji2]'
				}
		},

		onStart: async ({ api, event, args }) => {
				try {
						const { threadID, messageID } = event;
						const time = new Date();
						const timestamp = time.toISOString().replace(/[:.]/g, "-");
						const pathPic = __dirname + '/cache/' + `${timestamp}_emojimix.png`;

						if (args.length < 2) {
								api.sendMessage("Please provide two emojis to mix.", threadID, messageID);
								return;
						};

						const emoji1 = args[0];
						const emoji2 = args[1];

						if (!isValidEmoji(emoji1) || !isValidEmoji(emoji2)) {
								api.sendMessage("Invalid emojis provided. Please provide valid emojis.", threadID, messageID);
								return;
						}

						const { data } = await axios.get(`https://tenor.googleapis.com/v2/featured?key=YOUR_API_KEY&contentfilter=high&media_filter=png_transparent&component=proactive&collection=emoji_kitchen_v5&q=${encodeURIComponent(emoji1)}_${encodeURIComponent(emoji2)}`);

						const picture = data.results[0].url;

						const getPicture = (await axios.get(picture, { responseType: 'arraybuffer' })).data;

						fs.writeFileSync(pathPic, Buffer.from(getPicture, 'utf-8'));

						api.sendMessage({ body: '', attachment: fs.createReadStream(pathPic) }, threadID, () => fs.unlinkSync(pathPic), messageID);
				} catch (error) {
						console.error("Error combining emojis:", error);
						api.sendMessage("Can't combine emojis.", threadID, messageID);
				}
		}
};
