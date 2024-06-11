const axios = require("axios");
const Prefixes = [
	"💻",
	"🍀", 
	"🤍",
	"💚",
	];

module.exports = {
	config: {
		name: 'evilinsult',
		version: '1.0.1',
		author: 'Null69',
		countDown: 0,
		role: 0,
		category: 'fun',
		description: "",
		guide: ""
	},

	onStart: async function () {},
	onChat: async function ({ message, event, args, usersData }) {
		const datas = await usersData.get(event.senderID);
		const name = datas.name;
		const prefix = Prefixes.find((p) => event.body && event.body.toLowerCase().startsWith(p));
			if (!prefix) {
				return; // Invalid prefix, ignore the command
			}
			const stdata = [
				"789355324486715",
				"789355411153373",
				"789355277820053",
				"789355341153380",
				"387545608037990",
				"387545844704633",
				"387545881371296"
				];
		const randomSticker = Math.floor(Math.random() * stdata.length);
		const sticker = stdata[randomSticker];
		const response = await axios.get(`https://evilinsult.com/generate_insult.php?lang=en&type=json`);
		const ress = response.data.insult;
		const res = `${name}, ${ress}`;
		const haha = await message.reply(res);
		await new Promise(resolve => setTimeout(resolve, 1000));
		const hehe = await message.reply({ sticker: sticker });
		message.reaction("😆", haha.messageID, () => {}, true);
		message.reaction("😆", hehe.messageID, () => {}, true);
	},
};