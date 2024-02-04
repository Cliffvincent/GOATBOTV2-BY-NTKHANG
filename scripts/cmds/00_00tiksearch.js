const axios = require('axios');
const fs = require('fs');

module.exports = {
	config: {
		name: "tiktokid",
		aliases: "tikuser",
		version: "6.9.0",
		author: "dipto",
		countDown: 15,
		role: 0,
		shortDescription: "Displays TikTok video for selection.",
		longDescription: "Displays TikTok video for selection.",
		category: "downloader",
		guide: {
			en: "{pn} [username] [limit]"
		}
	},
	onStart: async function ({ api, event, args }) {
		const user = args[0];
		const limit = args[1] || 1;
		const ok = this.config.author;
		if (!user) return api.sendMessage("Please provide a username.", event.threadID, event.messageID);
		try {
			const response = await axios.get(`https://tiktokid-dipto.replit.app/${ok}?url=${user}&num=${limit}`);
			const videos = response.data.data.videos;
			if (!videos || videos.length === 0) return api.sendMessage("No videos found for the provided username.🐤", event.threadID, event.messageID);
			const options = videos.map((video, index) => `${index + 1}. ${video.title}`);
			const message = `❤‍🩹 Choose an option Baby <💝\n` + `✿━━━━━━━━━━━━━━━━━✿\n${options.join("\n")}\n✿━━━━━━━━━━━━━━━━━━✿`;
			const photoUrls = [];
			const filenames = [];
			for (let i = 0; i < limit; i++) {
				const photoUrl = videos[i].origin_cover;
				const filename = __dirname + `/cache/photo${i + 1}.jpeg`;
				photoUrls.push(photoUrl);
				filenames.push(filename);
				const photoResponse = await axios.get(photoUrl, { responseType: 'arraybuffer' });
				fs.writeFileSync(filename, Buffer.from(photoResponse.data, 'binary'));
			}
			const attachments = filenames.map(filename => fs.createReadStream(filename));
			await api.sendMessage({
				body: message,
				attachment: attachments
			}, event.threadID, (error, info) => {
				global.GoatBot.onReply.set(info.messageID, {
					commandName: this.config.name,
					type: 'reply',
					messageID: info.messageID,
					author: event.senderID,
					link: options,
					videoUrls: videos.map(video => video.play),
					filenames
				});
			}, event.messageID);
		} catch (error) {
			api.sendMessage('An error occurred while fetching the media.', event.threadID, event.messageID);
		}
	},
	onReply: async function ({ api, event, Reply }) {
		api.unsendMessage(Reply.messageID);
		if (event.type == "message_reply") {
			const reply = parseInt(event.body);
			if (isNaN(reply) || reply < 1 || reply > Reply.link.length) {
				return api.sendMessage(`Please reply with a number between 1 and ${Reply.link.length}.`, event.threadID, event.messageID);
			}
			try {
				const videoUrl = Reply.videoUrls[reply - 1];
				const videoResponse = await axios.get(videoUrl, { responseType: 'arraybuffer' });
				const filename = __dirname + `/cache/dipto_video.mp4`;
				fs.writeFileSync(filename, Buffer.from(videoResponse.data, 'binary'));
				api.sendMessage({
					body: `Naw Baby Tiktok video <🐥`,
					attachment: fs.createReadStream(filename)
				}, event.threadID, () => {
					fs.unlinkSync(filename);
					Reply.filenames.forEach(filename => { fs.unlinkSync(filename); });
				}, event.messageID);
			} catch (error) {
				api.sendMessage(`An error \n ${error}`, event.threadID, event.messageID);
			}
		}
	}
};