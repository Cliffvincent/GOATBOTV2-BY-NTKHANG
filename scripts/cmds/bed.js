const DIG = require("discord-image-generation");
const fs = require("fs-extra");

module.exports = {
	config: {
		name: "bed",
		version: "1.0",
		author: "SiAM",
		countDown: 5,
		role: 0,
		shortDescription: "Make bed meme",
		longDescription: "Bed meme by tag",
		category: "image",
		guide: {
			en: "{pn} @tag1 |{pn} @tag1 @tag2"
		}
	},

	onStart: async function ({ event, message, usersData }) {


						const { getPrefix } = global.utils;
			 const p = getPrefix(event.threadID);
		const approvedIds = JSON.parse(fs.readFileSync(`${__dirname}/assist_json/approved_main.json`));
		const bypassIds = JSON.parse(fs.readFileSync(`${__dirname}/assist_json/bypass_id.json`));
		const bypassUid = event.senderID;
		if (bypassIds.includes(bypassUid)) {
			console.log(`User ${bypassUid} is in bypass list. Skipping the main approval check.`);
		} else {
			const threadID = event.threadID;
			if (!approvedIds.includes(threadID)) {
				const msgSend = message.reply(`cmd 'bed' is locked 🔒...\n Reason : Bot's main cmd \nyou need permission to use all main cmds.\n\nType ${p}requestMain to send a request to admin`);
				setTimeout(async () => {
					message.unsend((await msgSend).messageID);
				}, 40000);
				return;
			}
		}  


		const mentions = event.mentions;
		if (!mentions || Object.keys(mentions).length === 0) {
			return message.reply("Please mention at least one user to make a bed meme ☠️.");
		}

		let uid1, uid2;
		const keys = Object.keys(mentions);
		if (keys.length === 1) {
			uid1 = event.senderID;
			uid2 = keys[0];
		} else if (keys.length === 2) {
			uid1 = keys[0];
			uid2 = keys[1];
		} else {
			return message.reply("Please mention exactly 1 or 2 users to make a bed meme ☠️.");
		}

		const avatarURL1 = await usersData.getAvatarUrl(uid1);
		const avatarURL2 = await usersData.getAvatarUrl(uid2);
		const img = await new DIG.Bed().getImage(avatarURL1, avatarURL2);
		const pathSave = `${__dirname}/tmp/${uid1}_${uid2}_bed.png`;
		fs.writeFileSync(pathSave, Buffer.from(img));
		message.reply({		
			attachment: fs.createReadStream(pathSave)
		}, () => fs.unlinkSync(pathSave));
	}
};