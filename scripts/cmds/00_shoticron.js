const cron = require('node-cron');
const axios = require("axios");
const request = require('request');
const fs = require("fs");

const activeThreads = {};

module.exports = {
	config: {
		name: "shoticron",
		author: "Cliff",//owner of api libPogi
		version: "1.0.0",
		role: 2,
		shortDescription: "TikTok send every 5 minutes",
		longDescription: "send TikTok video every 5 minutes",
		category: "CRON",
		guide: "{pn}"
	},
	onStart: async function({ api, event, input }) {
		const args = event.body.split(" ");
		const threadID = event.threadID;

		if (args[1] === "on") {
			if (!activeThreads[threadID]) {
				activeThreads[threadID] = true;
				api.sendMessage(`Automatic sending of videos is now enabled.`, event.threadID);
				cron.schedule('*/5 * * * *', async () => {
					try {
						if (activeThreads[threadID]) {
							let response = await axios.post(
								"https://your-shoti-api.vercel.app/api/v1/get",
								{
									apikey: "$shoti-1hg4gifgnlfdmeslom8",
								}
							);

							const data = response.data.data;

							const username = data.user.username;
							const nickname = data.user.nickname;
							const duration = data.duration;
							const tid = event.threadID;

							var file = fs.createWriteStream(__dirname + "/cache/shoti.mp4");
							var rqs = request(encodeURI(data.url));
							rqs.pipe(file);

							file.on('finish', () => {
								api.sendMessage(
									{
										body: `𝗥𝗔𝗡𝗗𝗢𝗠 𝗦𝗛𝗢𝗧𝗜 𝗘𝗩𝗘𝗥𝗬 𝗙𝗜𝗩𝗘 𝗠𝗜𝗡𝗨𝗧𝗘𝗦\n\n𝗨𝘀𝗲𝗿𝗻𝗮𝗺𝗲: ${username}\n𝗡𝗶𝗰𝗸𝗻𝗮𝗺𝗲: ${nickname}\n𝗗𝘂𝗿𝗮𝘁𝗶𝗼𝗻: ${duration}\n𝗚𝗿𝗼𝘂𝗽𝗜𝗗: ${tid}`,
										attachment: fs.createReadStream(__dirname + '/cache/shoti.mp4')
									},
									threadID,
									(error, info) => {
										if (!error) {
											fs.unlinkSync(__dirname + '/cache/shoti.mp4');
										}
									}
								);
							});
						}
					} catch (error) {
						console.error('Error:', error);
					}
				});
			} else {
				api.sendMessage("Automatic sending of videos is already ON in this thread.", threadID);
			}
		} else if (args[1] === "off") {
			if (activeThreads[threadID]) {
				activeThreads[threadID] = false;
				api.sendMessage(`Automatic sending of videos is now disabled.`, threadID);
			} else {
				api.sendMessage("Automatic sending of videos is already OFF in this thread.", threadID);
			}
		}
	}
};
