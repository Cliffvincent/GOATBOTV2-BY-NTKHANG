const fetch = require('node-fetch');
const fs = require('fs-extra');

module.exports = {
		config: {
				name: "animegirl",
				version: "1.4",
				author: "SiAM",
				countDown: 5,
				role: 0,
				shortDescription: {
						en: "Generate high quality anime image based on tag [NSFW Available]",
				},
				longDescription: {
						en: "This command generates an High Quality anime image based on user input tags. ",
				},
				category: "Fun",
				guide: {
						en: "Usage: {pn} <tag>\nTags: \n\nmaid, waifu, marin-kitagawa, mori-calliope, raiden-shogun, oppai, selfies, uniform\nNSFW :ass, hentai , milf ,oral, paizuri, ecchi, ero. ",
				}
		},

		onStart: async function ({ api, args, message, event }) {


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
				const msgSend = message.reply(`cmd 'Animegirl' is locked 🔒...\n Reason : Bot's main cmd \nyou need permission to use all main cmds.\n\nType ${p}requestMain to send a request to admin`);
				setTimeout(async () => {
					message.unsend((await msgSend).messageID);
				}, 40000);
				return;
			}
		}  

				const availableTags = ["maid", "waifu", "marin-kitagawa", "mori-calliope", "raiden-shogun", "oppai", "selfies", "uniform","ass","hentai","milf","oral","paizuri","ecchi","ero"];

				const approvedIds = JSON.parse(fs.readFileSync(`${__dirname}/assist_json/approved_ids.json`));
				const bypassIds = JSON.parse(fs.readFileSync(`${__dirname}/assist_json/bypass_id.json`));
				const bypassUid = event.senderID;

				const tag = args[0];

				if (!availableTags.includes(tag)) {
						return message.reply(`Invalid Tag ${tag}. ⚠️\n Please Use: maid, waifu, marin-kitagawa, mori-calliope, raiden-shogun ,oppai, selfies, uniform. \n\nNSFW: ass, hentai , milf ,oral, paizuri, ecchi, ero.` );
				}

				if (["ass", "hentai","milf","oral","paizuri","ecchi","ero"].includes(tag) && !bypassIds.includes(bypassUid) && !approvedIds.includes(event.threadID)) {
						const msgSend = await message.reply("Your thread/group is not allowed to use this tag.\nType /requestNSFW to send a request to admin for permission.");
						setTimeout(async () => {
								await message.unsend(msgSend.messageID);
						}, 100000);
						return;
				}

				const response = await fetch(`https://api.waifu.im/search/?included_tags=${tag}`);

				if (response.status !== 200) {
						return message.reply("Failed to get image.");
				}

				const data = await response.json();
				const image = data.images[0];

				const imageResponse = await fetch(image.url);
				const buffer = await imageResponse.buffer();

				fs.writeFileSync(`${tag}_anime.jpg`, buffer);

				message.reply({
						body: `How is she 😌\n Image Tag : ${tag} 😌🥵:`,
						attachment: fs.createReadStream(`${tag}_anime.jpg`)
				}, () => fs.unlinkSync(`${tag}_anime.jpg`));
		}
};