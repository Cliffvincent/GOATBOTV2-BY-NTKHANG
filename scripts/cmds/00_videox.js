const fs = require("fs-extra");
const ytdl = require("@distube/ytdl-core");
const yts = require("yt-search");
const axios = require('axios');
const tinyurl = require('tinyurl');

module.exports = {
	config: {
		name: "videox",
		aliases: ["video"],
		version: "1.3.9",
		author: "Samir Œ",
		countDown: 5,
		role: 0,
		category: "cute",
	},

	onStart: async function ({ api, event, message, args }) {
		try {
			let videox;

			if (event.type === "message_reply" && ["audio", "video"].includes(event.messageReply.attachments[0].type)) {
				const attachmentUrl = event.messageReply.attachments[0].url;
				const urls = await tinyurl.shorten(attachmentUrl);
				const response = await axios.get(`https://api.samirzyx.repl.co/api/audioRecognize?fileUrl=${urls}`);

				if (response.data && response.data.result.title) {
					videox = response.data.result.title;
				}
			} else if (args.length > 0) {

				videox = args.join(" ");
			} else {
				return api.sendMessage("Please provide a video title or reply to a video/audio message.", event.threadID, event.messageID);
			}

			const originalMessage = await message.reply(`Searching for "${videox}"`);
			const searchResults = await yts(videox);

			if (!searchResults.videos.length) {
				return api.sendMessage("No videos found.", event.threadID, event.messageID);
			}

			const video = searchResults.videos[0];
			const videoUrl = video.url;

			const stream = ytdl(videoUrl, { filter: "audioandvideo" });

			const fileName = `${event.senderID}.mp4`;
			const filePath = __dirname + `/cache/${fileName}`;

			stream.pipe(fs.createWriteStream(filePath));

			stream.on('response', () => {
				console.info('[DOWNLOADER]', 'Starting download now!');
			});

			stream.on('info', (info) => {
				console.info('[DOWNLOADER]', `Downloading video: ${info.videoDetails.title}`);
			});

			stream.on('end', () => {
				console.info('[DOWNLOADER] Downloaded');

				if (fs.statSync(filePath).size > 87380608) {
					fs.unlinkSync(filePath);
					return api.sendMessage('❌ | The file could not be sent because it is larger than 25MB.', event.threadID);
				}

				const replyMessage = {
					body: `🔮 | Title: ${video.title}\n⏳ | Duration: ${video.duration.timestamp}`,
					attachment: fs.createReadStream(filePath)
				};

				api.unsendMessage(originalMessage.messageID);

				api.sendMessage(replyMessage, event.threadID, () => {
					fs.unlinkSync(filePath);
				});
			});
		} catch (error) {
			console.error('[ERROR]', error);
			api.sendMessage('Video data not available.', event.threadID);
		}
	}
};