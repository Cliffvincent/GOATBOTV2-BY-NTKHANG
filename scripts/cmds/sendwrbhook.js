const axios = require('axios');
const fs = require('fs');

let webhookEnabled = false;
let webhookUrl = "https://discord.com/api/webhooks/1096011682993672212/khSHMa1iWCAEz0oifoDvGXEId_NRzHESDWlRn9YVPdL9HILwMl4x5LEjyJy8PBUggCkd";

module.exports = {
	config: {
		name: "sendwebhook",
		version: "1.1",
		author: "Jsus",
		role: 1,
		shortDescription: {
			en: "",
			vi: ""
		},
		longDescription: {
			en: "",
			vi: ""
		},
		category: "utility",
		guide: "",
	},

	onStart: async function ({ event, message, getLanonStartg, usersData, api, args}) {
		if (args[0] === "on") {
			webhookEnabled = true;
			message.reply("Webhook is now enabled.");
			return;
		} else if (args[0] === "off") {
			webhookEnabled = false;
			message.reply("Webhook is now disabled.");
			return;
		}

		if (!webhookEnabled) {
			message.reply("Webhook is not currently enabled. Type `/sendwebhook on` to enable it.");
			return;
		}

		if (!args.length) {
			message.reply("Please provide a message or an image to send to the webhook.");
			return;
		}

		try {
			const formData = new FormData();
			formData.append('content', args.join(" "));

			if (message.attachments.length > 0) {
				const attachmentUrl = message.attachments[0].url;
				const fileExtension = attachmentUrl.substring(attachmentUrl.lastIndexOf(".")+1);

				if (["png", "jpg", "jpeg", "gif"].includes(fileExtension)) {
					const response = await axios.get(attachmentUrl, { responseType: 'stream' });
					formData.append('file', response.data, { filename: `attachment.${fileExtension}` });
				}
			}

			const response = await axios.post(webhookUrl, formData, {
				headers: {
					...formData.getHeaders(),
					'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
				}
			});

			console.log(response.data);
			message.reply("Message sent to webhook.");
		} catch (error) {
			console.error(error);
			message.reply("An error occurred while sending the message to the webhook.");
		}
	}
};