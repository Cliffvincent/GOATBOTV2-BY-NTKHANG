const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports = {
	config: {
		name: "codm",//api credit to its owner
		aliases: [],
		author: "kshitiz",
		version: "2.0",
		cooldowns: 5,
		role: 0,
		shortDescription: {
			en: ""
		},
		longDescription: {
			en: "get codm video"
		},
		category: "game",
		guide: {
			en: "{p}{n}"
		}
	},
	onStart: async function ({ api, event }) {
		try {

			api.sendMessage(`⏱️ | Loading CODM video...`, event.threadID, event.messageID);

			console.log('Making API request...');

			const response = await axios.get('https://codm-api.diciper09.repl.co/codm/?apikey=umaru852').catch(error => {
				console.error('Error making API request:', error.message);
				throw error;
			});

			console.log('Received API response:', response.data);


			if (response && response.data && response.data.code === 200) {
				const videoUrl = response.data.url;
				const author = response.data.author;


				const videoFileName = path.basename(videoUrl);
				const videoPath = path.join(__dirname, 'cache', videoFileName);

				const videoStream = fs.createWriteStream(videoPath);
				console.log('Downloading video...');

				const videoResponse = await axios({
					method: 'get',
					url: videoUrl,
					responseType: 'stream',
				}).catch(error => {
					console.error('Error downloading video:', error.message);
					throw error;
				});

				videoResponse.data.pipe(videoStream);


				await new Promise((resolve) => {
					videoStream.on('finish', resolve);
				});

				console.log('Video downloaded successfully.');


				console.log('Sending video ...');
				const videoAttachment = fs.createReadStream(videoPath);


				api.sendMessage({
					body: `Call Of Duty Mobile`,
					attachment: videoAttachment
				}, event.threadID, () => {
					fs.unlinkSync(videoPath); 
					console.log('Cleaned up: Removed downloaded video.');
				});
			} else {
				console.error('Error: Unable to fetch CODM video');
				api.sendMessage(`❌ | Error fetching CODM video. Please try again later.`, event.threadID);
			}
		} catch (error) {
			console.error('Error:', error.message);
			api.sendMessage(`❌ | An error occurred. Please try again later.`, event.threadID);
		}
	}
};
