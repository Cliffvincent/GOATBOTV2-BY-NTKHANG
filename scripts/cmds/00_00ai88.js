const axios = require('axios');
const fs = require('fs');

module.exports = {
		config: {
				name: "ai88",
				version: "1.0.0",
				role: 0,
				author: "Jonell Magallanes",
				shortDescription: "EDUCATIONAL",
				countDown: 0,
				category: "other",
				guide: {
						en: '[question]'
				}
		},

		onStart: async function ({ api, event, args }) {
				const content = encodeURIComponent(args.join(" "));
				const apiUrl = `https://aiapiviafastapiwithimagebyjonellmagallanes.replit.app/ai?content=${content}`;

				if (!content) return api.sendMessage("Please provide your question.\n\nExample: ai what is the solar system?", event.threadID, event.messageID);

				try {
						api.sendMessage("🔍 | AI is searching for your answer. Please wait...", event.threadID, event.messageID);

						const response = await axios.get(apiUrl);
						const { request_count, airesponse, image_url } = response.data;

						if (airesponse) {
								api.sendMessage(`${airesponse}\n\n📝 Request Count: ${request_count}`, event.threadID, event.messageID);

								if (image_url) {
										const imagePath = './image.jpg';
										const imageResponse = await axios.get(image_url, { responseType: 'arraybuffer' });
										fs.writeFileSync(imagePath, Buffer.from(imageResponse.data));

										api.sendMessage({ attachment: fs.createReadStream(imagePath) }, event.threadID, () => {
												fs.unlinkSync(imagePath); 
										});
								}
						} else {
								api.sendMessage("An error occurred while processing your request.", event.threadID);
						}
				} catch (error) {
						console.error(error);
						api.sendMessage("🔨 | An error occurred while processing your request from API...", event.threadID);
				}
		}
};
