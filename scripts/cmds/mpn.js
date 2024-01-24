const axios = require("axios");
const fs = require("fs");
const os = require("os");
const path = require("path");

const sentVideos = [];

module.exports = {
	config: {
		name: "mpn",
		aliases: ["mpn"],
		version: "1.0",
		author: "kshitiz",
		countDown: 5,
		role: 0,
		shortDescription: "",
		longDescription: "Get a random video from the fb page",
		category: "𝗙𝗕𝗣𝗔𝗚𝗘",
		guide: "{p}{n}",
	},

	onStart: async function ({ api, event, args }) {
		try {
			const loadingMessage = await api.sendMessage("loading a random video frm mpn, please wait...", event.threadID);

			const pageId = "moodpostingsnepal"; // Replace with the ID or username of the Facebook page ("naos011" in this case)
			const accessToken = "EAAD6V7os0gcBOx6n4Mq5OnOnfHzZAOWGxNTDLuSaMchEHh38KWg0aKRjrE8ZBrOKZA2TesFOD0siTtDQkqOhrj0IIdXZATghF7Dj2uHvQU1H8ZBVpK19rNk6NBFZAx0Hu9e7NUT3hLUpkA0leyChiFeGLv5rpG4C95CPWjpwcMwDDEULQVPnlCfHkMzPg0llCF8QZDZD";

			const response = await axios.get(`https://graph.facebook.com/${pageId}/videos?access_token=${accessToken}`);
			const videos = response.data.data;

			if (videos.length > 0) {
				const unsentVideos = videos.filter(video => !sentVideos.includes(video.id));

				if (unsentVideos.length === 0) {
					await api.sendMessage("All videos from the page have been sent before.", event.threadID);
				} else {
					const randomVideo = unsentVideos[Math.floor(Math.random() * unsentVideos.length)];
					const videoLink = randomVideo.source;
					const videoId = randomVideo.id;

					const tempDir = path.join(os.tmpdir(), "fb_videos");
					if (!fs.existsSync(tempDir)) {
						fs.mkdirSync(tempDir);
					}

					const randomFileName = `video_${Date.now()}.mp4`;
					const filePath = path.join(tempDir, randomFileName);

					const videoResponse = await axios({
						method: "GET",
						url: videoLink,
						responseType: "stream",
					});

					videoResponse.data.pipe(fs.createWriteStream(filePath));

					videoResponse.data.on("end", async () => {
						if (fs.existsSync(filePath)) {
							await api.sendMessage(
								{
									body: "Random video from the page:",
									attachment: fs.createReadStream(filePath),
								},
								event.threadID
							);
							sentVideos.push(videoId);
						} else {
							console.error("File does not exist:", filePath);
							await api.sendMessage("An error occurred while fetching the video. Please try again later.", event.threadID);
						}


						api.unsendMessage(loadingMessage.messageID);
					});

					videoResponse.data.on("error", async (err) => {
						console.error("Error during video download:", err);
						await api.sendMessage("An error occurred while fetching the video. Please try again later.", event.threadID);


						api.unsendMessage(loadingMessage.messageID);
					});
				}
			} else {

				await api.sendMessage("No videos found.", event.threadID);


				api.unsendMessage(loadingMessage.messageID);
			}
		} catch (error) {
			console.error("Error retrieving videos:", error);

			await api.sendMessage("An error occurred while retrieving videos.", event.threadID);
		}
	},
};
