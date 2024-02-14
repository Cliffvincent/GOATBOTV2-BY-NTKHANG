const axios = require("axios");
const fs = require("fs-extra");

module.exports = {

	config: {
		name: 'anime3',
		version: '1.0',
		author: 'Kshitiz',
		countDown: 20,
		role: 0,
		shortDescription: 'Anime recommendations by genre',
		longDescription: '',
		category: 'media',
		guide: {
			en: '{p}anime {genre}:- shonen | seinen | isekai',
		}
	},

	onStart: async function ({ api, event, message }) {
		const messageBody = event.body.toLowerCase().trim();
		if (messageBody === 'anime') {
			await message.reply('Please specify genre.\n{p}anime {genre}:- shonen | seinen | isekai');
			return;
		}

		let genre;
		if (messageBody.includes('shonen')) {
			genre = 'shonen';
		} else if (messageBody.includes('seinen')) {
			genre = 'seinen';
		} else if (messageBody.includes('isekai')) {
			genre = 'isekai';
		} else {
			await message.reply('Please specify genre.\n{p}anime {genre}:- shonen | seinen | isekai');
			return;
		}

		try {
			const loadingMessage = await message.reply('𝗟𝗢𝗔𝗗𝗜𝗡𝗚 𝗥𝗔𝗡𝗗𝗢𝗠 𝗔𝗡𝗜𝗠𝗘 𝗥𝗘𝗖𝗢𝗠𝗠𝗘𝗡𝗗𝗔𝗧𝗜𝗢𝗡..');

			const apiUrl = `https://animereco-kshitiz.onrender.com/anime?genre=${genre}`;
			const response = await axios.get(apiUrl);

			if (response.data.anime && response.data.videoLink) {
				const animeName = response.data.anime;
				const videoUrl = response.data.videoLink;

				console.log(`${animeName}`);
				console.log(`${videoUrl}`);

				const cacheFilePath = __dirname + `/cache/anime_${Date.now()}.mp4`;
				await this.downloadVideo(videoUrl, cacheFilePath);

				if (fs.existsSync(cacheFilePath)) {
					await message.reply({
						body: `𝗥𝗘𝗖𝗢𝗠𝗠𝗘𝗡𝗗𝗘𝗗 𝗔𝗡𝗜𝗠𝗘 : ${animeName}`,
						attachment: fs.createReadStream(cacheFilePath),
					});

					fs.unlinkSync(cacheFilePath);
				} else {
					message.reply("Error downloading the video.");
				}
			} else {
				message.reply("API CHALENA MUJI(API ISSUE)");
			}

			await message.unsend(loadingMessage.messageID);
		} catch (err) {
			console.error(err);
			message.reply("An error occurred while processing the anime command.");
		}
	},

	downloadVideo: async function (url, cacheFilePath) {
		try {
			const response = await axios({
				method: "GET",
				url: url,
				responseType: "stream"
			});

			const writer = fs.createWriteStream(cacheFilePath);
			response.data.pipe(writer);

			return new Promise((resolve, reject) => {
				writer.on('finish', resolve);
				writer.on('error', reject);
			});
		} catch (err) {
			console.error(err);
		}
	},
};
// // // // //     // // // // //   //     //    // // // // //     // // //
//           //         //             // //    //           //             //
//           //         //            //   //   //           //             //
//           //         //           //     //  //           //             //
//           //         //          //       // //           //             //
// // // // //           //         //         // // // // //               //
//bored as fwk