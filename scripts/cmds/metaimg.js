const axios = require('axios');
const fs = require('fs-extra');
const path = require('path');

module.exports = {
	config: {
		name: "metaimg",
		aliases: ["meta", "metaai"],
		version: "1.0",
		author: "JARiF",
		countDown: 15,
		role: 0,
		shortDescription: "Generate images by Meta AI",
		longDescription: "Generate images by Meta AI",
		category: "download",
		guide: {
			en: "{pn} prompt"
		}
	},

onStart: async function ({ api, event, message, args }) {
		try {
			const prompt = args.join(" ");

			const waitingMessage = await message.reply("Please wait...");

			const url = `https://project-meta.onrender.com/meta?prompt=${encodeURIComponent(prompt)}`;

			const response = await axios.get(url);
			const data = response.data;

			if (!data || data.length === 0) {
				throw new Error("Empty response or no images generated.");
			}

			const imgData = [];

			for (let i = 0; i < data.length; i++) {
				const imgUrl = data[i];
				const imgResponse = await axios.get(imgUrl, { responseType: 'arraybuffer' });
				const imgPath = path.join(__dirname, 'cache', `${i + 1}.jpg`);
				await fs.outputFile(imgPath, imgResponse.data);
				imgData.push(fs.createReadStream(imgPath));
			}

			await message.reply({
				body: `✅ | Generated`,
				attachment: imgData
			});

		} catch (error) {
			console.error(error);
			await message.reply(`Generation failed!\nError: ${error.message}`);
		}
	}
};