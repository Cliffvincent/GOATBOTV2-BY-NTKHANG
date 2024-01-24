const axios = require('axios');
const fs = require('fs-extra');

module.exports = {
	config: {
		name: 'Pinterest',
		aliases: ["pint", "pinter"],
		version: '1.2',
		author: 'Samuel',
		countDown: 5,
		role: 0,
		category: 'Image Search',
		shortDescription: {
			en: "Search for images on \n| Pinterest based on a keyword",
		},
		longDescription: {
			en: "This command searches for images on Pinterest based on a provided keyword.",
		},
		guide: {
			en: "{pn} 'keyword' -'number of search results'\nExample: {pn} cute -10\nIf no number is provided, the command will return the first 5 images.",
		},
	},

	onStart: async function ({ api, args, event , message }) {
		const { getPrefix } = global.utils;
			 const p = getPrefix(event.threadID);
		const approvedmain = JSON.parse(fs.readFileSync(`${__dirname}/assist_json/approved_main.json`));
		const bypassmain = JSON.parse(fs.readFileSync(`${__dirname}/assist_json/bypass_id.json`));
		const bypassmUid = event.senderID;
		if (bypassmain.includes(bypassmUid)) {
			console.log(`User ${bypassmUid} is in bypass list. Skipping the main approval check.`);
		} else {
			const threadmID = event.threadID;
			if (!approvedmain.includes(threadmID)) {
				const msgSend = message.reply(`cmd 'Pinterest' is locked 🔒...\n Reason : Bot's main cmd \nyou need permission to use all main cmds.\n\nType ${p}requestMain to send a request to admin`);
				setTimeout(async () => {
					message.unsend((await msgSend).messageID);
				}, 40000);
				return;
			}
		}  





		let keyword = args.join(' ');
		let numberSearch = 4;
		const match = keyword.match(/(.+?)\s*-?(\d+)?$/);
		if (match) {
			keyword = match[1].trim();
			if (match[2]) {
				numberSearch = parseInt(match[2]);
			}
		}

		if (!keyword) {
			api.sendMessage("Please provide a keyword.\nExample: Pinterest cute anime boy -10", event.threadID, event.messageID);
			return;
		}

		if (numberSearch > 20) {
			api.sendMessage("Maximum number of search results is 20.", event.threadID, event.messageID);
			return;
		}

		try {
			const res = await axios.get(`https://api-dien.kira1011.repl.co/pinterest?search=${encodeURIComponent(keyword)}`);
			const data = res.data.data;
			let num = 0;
			const img = [];

			for (let i = 0; i < numberSearch; i++) {
				const path = __dirname + `/tmp/${num += 1}.jpg`;
				const getDown = (await axios.get(`${data[i]}`, { responseType: 'arraybuffer' })).data;
				fs.writeFileSync(path, Buffer.from(getDown, 'utf-8'));
				img.push(fs.createReadStream(path));
			}

			api.sendMessage({
				body: `${numberSearch} search results for keyword: ${keyword}`,
				attachment: img
			}, event.threadID, event.messageID);

			for (let ii = 1; ii < numberSearch; ii++) {
				fs.unlinkSync(__dirname + `/tmp/${ii}.jpg`);
			}
		} catch (err) {
			console.error(err);
			api.sendMessage("Your search Input in Disallowed in Pinterest.", event.threadID, event.messageID);
			return;
		}
	}
};
