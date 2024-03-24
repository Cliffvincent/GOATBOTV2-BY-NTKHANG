const axios = require("axios");
const { getStreamFromURL } = global.utils;

module.exports = {
		config: {
				name: "nijix",
				aliases: ["nijijourneyx"],
				version: "1.0",
				author: "SiAM | Turtle APIs",
				countDown: 5,
				role: 0,
				longDescription: "Text to Image",
				category: "ai",
				guide: {
						en: "{pn} prompt --ar [ratio] or reply an image\n\n Example: {pn} 1girl, cute face, masterpiece, best quality --ar 16:9\n[ default 1:1 ]"
				}
		},

		onStart: async function({ api, args, message, event }) {
				try {

						let prompt = "";
						let imageUrl = "";
						let aspectRatio = ""; 

						const aspectIndex = args.indexOf("--ar");
						if (aspectIndex !== -1 && args.length > aspectIndex + 1) {
								aspectRatio = args[aspectIndex + 1];
								args.splice(aspectIndex, 2); 
						}

						if (event.type === "message_reply" && event.messageReply.attachments && event.messageReply.attachments.length > 0 && ["photo", "sticker"].includes(event.messageReply.attachments[0].type)) {
								imageUrl = encodeURIComponent(event.messageReply.attachments[0].url);
						} else if (args.length === 0) {
								message.reply("Please provide a prompt or reply to an image.");
								return;
						}

						if (args.length > 0) {
								prompt = args.join(" ");
						}


						let apiUrl = `https://project-niji.onrender.com/api/generate?prompt=${encodeURIComponent(prompt)}.&aspectRatio=${aspectRatio}&apikey=rehat&key=siam`;
						if (imageUrl) {
								apiUrl += `&imageUrl=${imageUrl}`;
						}

						const processingMessage = await message.reply("⛵ Initiating request");
						message.reaction("⏳", event.messageID);

						const response = await axios.post(apiUrl);
						const img = response.data.url;

						const downloadLink = `Your Imagination Is Created 🌟\nDownload: ${img}`;
						await message.reply({
								body: downloadLink,
								attachment: await getStreamFromURL(img)
						});
						message.unsend(processingMessage.messageID);
						await message.reaction("✅", event.messageID);
				} catch (error) {
						console.error(error);
						message.reply("An error occurred.");
						message.reaction("❌", event.messageID);
				}
		}
};