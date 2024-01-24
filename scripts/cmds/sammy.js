const axios = require('axios');

// config 
const apiKey = "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";
const maxTokens = 400;
const numberGenerateImage = 5;
const maxStorageMessage = 5;

if (!global.temp.openAIUsing)
	global.temp.openAIUsing = {};
if (!global.temp.openAIHistory)
	global.temp.openAIHistory = {};

const { openAIUsing, openAIHistory } = global.temp;

module.exports = {
	config: {
		name: "sammy",
		aliases: ["Sæmmy", "Sam", "sam", "ai", "Ai"],
		usePrefix: false,
		version: "1.2",
		author: "NTKhang",
		countDown: 1,
		role: 0,
		shortDescription: {
			vi: "sammy chat",
			en: "sammy chat"
		},
		longDescription: {
			vi: "sammy chat",
			en: "sammy chat"
		},
		category: "box chat",
		guide: {
			vi: "   {pn} <draw> <nội dung> - tạo hình ảnh từ nội dung"
				+ "\n   {pn} <clear> - xóa lịch sử chat với gpt"
				+ "\n   {pn} <nội dung> - chat với gpt",
			en: "   {pn} <draw> <content> - create image from content"
				+ "\n   {pn} <clear> - clear chat history with gpt"
				+ "\n   {pn} <content> - chat with gpt"
		}
	},

	langs: {
		vi: {
			apiKeyEmpty: "╔════ஜ۩۞۩ஜ═══╗\n\nPlease provide api key \nfor openai at file \nscripts/cmds/sammy.js\n\n╚════ஜ۩۞۩ஜ═══╝",
			invalidContentDraw: "╔════ஜ۩۞۩ஜ═══╗\n\nPlease enter what you\n want to draw\n\n╚════ஜ۩۞۩ஜ═══╝",
			yourAreUsing: "╔════ஜ۩۞۩ஜ═══╗\n\nYou are using gpt chat,\n please wait to come back after \nthe previous request ends\n\n╚════ஜ۩۞۩ஜ═══╝",
			processingRequest: "╔════ஜ۩۞۩ஜ═══╗\n\nProcessing your request,\n it may take a few minutes,\n please wait\n\n╚════ஜ۩۞۩ஜ═══╝",
			invalidContent: "╔════ஜ۩۞۩ஜ═══╗\n\nPlease enter what\n you want to chat\n\n╚════ஜ۩۞۩ஜ═══╝",
			error: "╔════ஜ۩۞۩ஜ═══╗\n\nAn error occurred\n%1\n\n╚════ஜ۩۞۩ஜ═══╝",
			clearHistory: "╔════ஜ۩۞۩ஜ═══╗\n\nDeleted your chat\n history with sammy\n\n╚════ஜ۩۞۩ஜ═══╝"
		},
		en: {
			apiKeyEmpty: "╔════ஜ۩۞۩ஜ═══╗\n\nPlease provide apikey,\n for openai at file scripts/cmds/sammy.js\n\n╚════ஜ۩۞۩ஜ═══╝",
			invalidContentDraw: "╔════ஜ۩۞۩ஜ═══╗\n\nPlease enter the content\n you want to draw\n\n╚════ஜ۩۞۩ஜ═══╝",
			yourAreUsing: "╔════ஜ۩۞۩ஜ═══╗\n\nYou are using gpt chat, \nplease wait until the previous request ends\n\n╚════ஜ۩۞۩ஜ═══╝",
			processingRequest: "╔════ஜ۩۞۩ஜ═══╗\n\nProcessing your request, \this process may take a few minutes,\n please wait\n\n╚════ஜ۩۞۩ஜ═══╝",
			invalidContent: "╔════ஜ۩۞۩ஜ═══╗\n\nPlease enter the content you want to chat\n\n╚════ஜ۩۞۩ஜ═══╝",
			error: "╔════ஜ۩۞۩ஜ═══╗\n\nAn error has occurred\n%1\n\n╚════ஜ۩۞۩ஜ═══╝",
			clearHistory: "╔════ஜ۩۞۩ஜ═══╗\n\nYour chat history with\n Sammy has been deleted\n\n╚════ஜ۩۞۩ஜ═══╝"
		}
	},

	onStart: async function ({ message, event, args, getLang, prefix, commandName }) {
		if (!apiKey)
			return message.reply(getLang('╔════ஜ۩۞۩ஜ═══╗\n\napiKeyEmpty\n\n╚════ஜ۩۞۩ஜ═══╝', prefix));

		switch (args[0]) {
			case 'img':
			case 'image':
			case 'draw': {
				if (!args[1])
					return message.reply(getLang('╔════ஜ۩۞۩ஜ═══╗\n\ninvalidContentDraw\n\n╚════ஜ۩۞۩ஜ═══╝'));
				if (openAIUsing[event.senderID])
					return message.reply(getLang("╔════ஜ۩۞۩ஜ═══╗\n\nyourAreUsing\n\n╚════ஜ۩۞۩ஜ═══╝"));

				openAIUsing[event.senderID] = true;

				let sending;
				try {
					sending = message.reply(getLang('processingRequest'));
					const responseImage = await axios({
						url: "https://api.openai.com/v1/images/generations",
						method: "POST",
						headers: {
							"Authorization": `Bearer ${apiKey}`,
							"Content-Type": "application/json"
						},
						data: {
							prompt: args.slice(1).join(' '),
							n: numberGenerateImage,
							size: '1024x1024'
						}
					});
					const imageUrls = responseImage.data.data;
					const images = await Promise.all(imageUrls.map(async (item) => {
						const image = await axios.get(item.url, {
							responseType: 'stream'
						});
						image.data.path = `${Date.now()}.png`;
						return image.data;
					}));
					return message.reply({
						attachment: images
					});
				}
				catch (err) {
					const errorMessage = err.response?.data.error.message || err.message;
					return message.reply(getLang('error', errorMessage || ''));
				}
				finally {
					delete openAIUsing[event.senderID];
					message.unsend((await sending).messageID);
				}
			}
			case 'clear': {
				openAIHistory[event.senderID] = [];
				return message.reply(getLang('clearHistory'));
			}
			default: {
				if (!args[1])
					return message.reply(getLang('invalidContent'));

				handleGpt(event, message, args, getLang, commandName);
			}
		}
	},

	onReply: async function ({ Reply, message, event, args, getLang, commandName }) {
		const { author } = Reply;
		if (author != event.senderID)
			return;

		handleGpt(event, message, args, getLang, commandName);
	}
};

async function askGpt(event) {
	const response = await axios({
		url: "https://api.openai.com/v1/chat/completions",
		method: "POST",
		headers: {
			"Authorization": `Bearer ${apiKey}`,
			"Content-Type": "application/json"
		},
		data: {
			model: "gpt-3.5-turbo-0613",
			messages: openAIHistory[event.senderID],
			max_tokens: maxTokens,
			temperature: 0.7
		}
	});
	return response;
}

async function handleGpt(event, message, args, getLang, commandName) {
	try {
		openAIUsing[event.senderID] = true;

		if (
			!openAIHistory[event.senderID] ||
			!Array.isArray(openAIHistory[event.senderID])
		)
			openAIHistory[event.senderID] = [];

		if (openAIHistory[event.senderID].length >= maxStorageMessage)
			openAIHistory[event.senderID].shift();

		openAIHistory[event.senderID].push({
			role: 'user',
			content: args.join(' ')
		});

		const response = await askGpt(event);
		const text = response.data.choices[0].message.content;

		openAIHistory[event.senderID].push({
			role: 'assistant',
			content: text
		});

		return message.reply(text, (err, info) => {
			global.GoatBot.onReply.set(info.messageID, {
				commandName,
				author: event.senderID,
				messageID: info.messageID
			});
		});
	}
	catch (err) {
		const errorMessage = err.response?.data.error.message || err.message || "";
		return message.reply(getLang('error', errorMessage));
	}
	finally {
		delete openAIUsing[event.senderID];
	}
			}