const axios = require("axios");
const fs = require("fs");

module.exports = {
		config: {
				name: "gd",
				author: "jonell", // Jonell Magallanes | Jmlabaco", //convert and modified by JmLabaco API by Jonell Magallanes
				version: "1.5",
				countDown: 5,
				role: 0,
				category: "media",
				shortDescription: {
						en: "Geometry Dash"
				}
		},

		onStart: async function ({ api, event, args, client, __GLOBAL }) {
				try {
						api.sendMessage("⏱️ | Sending Geometry Dash Video. Please wait...", event.threadID, event.messageID);
						api.setMessageReaction("⏱️", event.messageID, () => {}, true);

						const response = await axios.get('https://cc-project-apis-jonell-magallanes.onrender.com/gd', {
								responseType: 'arraybuffer'
						});

						if (response.status === 200) {
								const filePath = __dirname + "/cache/randomedit.mp4";
								fs.writeFileSync(filePath, Buffer.from(response.data, 'binary'), "binary");
								api.setMessageReaction("✅", event.messageID, () => {}, true);
								api.sendMessage({
										body: `🎮| Geometry Dash \n\nID:${event.threadID}`,
										attachment: fs.createReadStream(filePath)
								}, event.threadID, () => fs.unlinkSync(filePath), event.messageID);
						} else {
								api.sendMessage("Failed to retrieve a video.", event.threadID, event.messageID);
								api.setMessageReaction("🔭", event.messageID, () => {}, true);
						}
				} catch (error) {
						console.error("Error fetching Geometry Dash video:", error);
						api.sendMessage("Error fetching video.", event.threadID, event.messageID);
						api.setMessageReaction("❌", event.messageID, () => {}, true);
				}
		}
};
