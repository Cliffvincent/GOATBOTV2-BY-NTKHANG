const fs = require("fs-extra");
const axios = require("axios");
const path = require("path");
const { getStreamFromURL, randomString } = global.utils;
const getFBInfo = require("@xaviabot/fb-downloader");

function loadAutoLinkStates() {
		try {
				const data = fs.readFileSync("autolink.json", "utf8");
				return JSON.parse(data);
		} catch (err) {
				console.error("Error loading autolink states:", err);
				return {};
		}
}

function saveAutoLinkStates(states) {
		try {
				fs.writeFileSync("autolink.json", JSON.stringify(states, null, 2));
		} catch (err) {
				console.error("Error saving autolink states:", err);
		}
}

let autoLinkStates = loadAutoLinkStates();

module.exports = {
		threadStates: {},
		config: {
				name: 'autolink',
				version: '5.0',
				author: 'cliff',
				countDown: 5,
				role: 0,
				shortDescription: 'Auto video downloader for Instagram, Facebook, TikTok',
				longDescription: '',
				category: 'media',
				guide: {
						en: '{p}{n}',
				}
		},
		onStart: async function ({ api, event }) {
				const threadID = event.threadID;

				if (!autoLinkStates[threadID]) {
						autoLinkStates[threadID] = 'on';
						saveAutoLinkStates(autoLinkStates);
				}

				if (!this.threadStates[threadID]) {
						this.threadStates[threadID] = {};
				}

				if (event.body.toLowerCase().includes('autolink off')) {
						autoLinkStates[threadID] = 'off';
						saveAutoLinkStates(autoLinkStates);
						api.sendMessage("AutoLink is now turned off for this chat.", event.threadID, event.messageID);
				} else if (event.body.toLowerCase().includes('autolink on')) {
						autoLinkStates[threadID] = 'on';
						saveAutoLinkStates(autoLinkStates);
						api.sendMessage("AutoLink is now turned on for this chat.", event.threadID, event.messageID);
				}
		},
		onChat: async function ({ api, event }) {
				const threadID = event.threadID;

				if (this.checkLink(event.body)) {
						const { url } = this.checkLink(event.body);
						console.log(`Attempting to download from URL: ${url}`);
						if (autoLinkStates[threadID] === 'on' || !autoLinkStates[threadID]) {
								this.downLoad(url, api, event);
						} else {
								api.sendMessage("AutoLink is off. Please enable it to download videos.", event.threadID, event.messageID);
						}
						api.setMessageReaction("🚀", event.messageID, (err) => {}, true);
				}
		},
		downLoad: function (url, api, event) {
				const time = Date.now();
				const path = path.join(__dirname, `/cache/${time}.mp4`);

				if (url.includes("instagram")) {
						this.downloadInstagram(url, api, event, path);
				} else if (url.includes("tiktok")) {
						this.downloadTikTok(url, api, event, path);
				}
		},
		downloadInstagram: async function (url, api, event, path) {
				try {
						const regex = /https:\/\/www\.instagram\.com\/reel\/[a-zA-Z0-9_-]+\/\?igsh=[a-zA-Z0-9_=-]+$/;
						if (regex.test(url)) {
								const res = await axios.get(`https://cprojectapisjonellv2.adaptable.app/api/fbdl?url=${encodeURIComponent(url)}`);
								const videoUrl = res.data.url.data[0].url;
								const response = await axios({
										method: "GET",
										url: videoUrl,
										responseType: "arraybuffer"
								});
								fs.writeFileSync(path, Buffer.from(response.data, "utf-8"));
								if (fs.statSync(path).size / 1024 / 1024 > 25) {
										return api.sendMessage("The file is too large, cannot be sent", event.threadID, () => fs.unlinkSync(path), event.messageID);
								}

								api.sendMessage({
										body: `𝖠𝗎𝗍𝗈 𝖣𝗈𝗐𝗇 Instagram\n\n𝗬𝗔𝗓𝗄𝗒 𝗕𝗢𝗧 𝟭.𝟬.𝟬𝘃`,
										attachment: fs.createReadStream(path)
								}, event.threadID, () => fs.unlinkSync(path), event.messageID);
						}
				} catch (err) {
						console.error("Error downloading Instagram video:", err);
				}
		},
		downloadFacebook: async function (url, api, event, path) {
				try {
						const facebookLinkRegex = /https:\/\/www\.facebook\.com\/\S+/;
						if (facebookLinkRegex.test(url)) {
								const result = await getFBInfo(url);
								let videoData = await axios.get(encodeURI(result.sd), { responseType: 'arraybuffer' });
								fs.writeFileSync(path, Buffer.from(videoData.data, "utf-8"));
								api.sendMessage({
										body: "𝖠𝗎𝗍𝗈 𝖣𝗈𝗐𝗇 𝖥𝖺𝖼𝖾𝖻𝗈𝗈𝗄 𝖵𝗂𝖽𝖾𝗈\n\n𝗬𝗔𝗓𝗄𝗒 𝗕𝗢𝗧 𝟭.𝟬.𝟬𝘃",
										attachment: fs.createReadStream(path)
								}, event.threadID, () => fs.unlinkSync(path), event.messageID);
						}
				} catch (err) {
						console.error("Error downloading Facebook video:", err);
				}
		},
		downloadTikTok: async function (url, api, event, path) {
				try {
						const regEx_tiktok = /https:\/\/(www\.|vt\.)?tiktok\.com\//;
						if (regEx_tiktok.test(url)) {
								api.setMessageReaction("📥", event.messageID, () => {}, true);
								const response = await axios.post(`https://www.tikwm.com/api/`, { url: url });
								const data = response.data.data;
								const videoStream = await axios({
										method: 'get',
										url: data.play,
										responseType: 'stream'
								});
								const videoFile = fs.createWriteStream(path);

								videoStream.data.pipe(videoFile);

								videoFile.on('finish', () => {
										videoFile.close(() => {
												console.log('Downloaded video file.');
												api.sendMessage({
														body: `𝖠𝗎𝗍𝗈 𝖣𝗈𝗐𝗇 𝖳𝗂𝗄𝖳𝗈𝗄 \n\n𝙲𝚘𝚗𝚝𝚎𝚗𝚝: ${data.title}\n\n𝙻𝚒𝚔𝚎𝚜: ${data.digg_count}\n\n𝙲𝚘𝚖𝚖𝚎𝚗𝚝𝚜: ${data.comment_count}\n\n𝗬𝗔𝗓𝗄𝗒 𝗕𝗢𝗧 𝟭.𝟬.𝟬𝘃`,
														attachment: fs.createReadStream(path)
												}, event.threadID, () => {
														fs.unlinkSync(path);
												});
										});
								});
						}
				} catch (error) {
						console.error("Error downloading TikTok video:", error);
						api.sendMessage(`Error when trying to download the TikTok video: ${error.message}`, event.threadID, event.messageID);
				}
		},
		checkLink: function (url) {
				if (url.includes("tiktok") || url.includes("instagram")) {
						return { url: url };
				}
				return false;
		}
};
