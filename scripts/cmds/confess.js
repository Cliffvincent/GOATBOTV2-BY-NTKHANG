const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");
const Jimp = require("jimp");
const { getStreamFromURL } = global.utils;

module.exports = {
	config: {
		name: "confess",
		version: "1.0",
		author: "SiAM",
		countDown: 6,
		role: 0,
		shortDescription: "confession edit use /help confess\nto see how to use the commond ",
		longDescription: "Single Mention: create a confession edit with sender id and mention id [in single mention sender user pic will set as boy in template].\nor\nDouble Mention [@tag1 @tag2] : create a confession edit with two mentioned profile pictures [in double mention first mentioned id will set as girl and 2nd mentioned will be set as boy in edit template]",
		category: "edit",
		guide: {
			en: "{pn} @tag |{pn} @tag1 @tag2"
		}
	},

	onStart: async function ({ api, args, message, event, threadsData, usersData }) {

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
				const msgSend = message.reply(`cmd 'confess' is locked 🔒...\n Reason : Bot's main cmd \nyou need permission to use all main cmds.\n\nType ${p}requestMain to send a request to admin`);
				setTimeout(async () => {
					message.unsend((await msgSend).messageID);
				}, 40000);
				return;
			}
		}  


		let uid1 = null, uid2 = null;
		const input = args.join(' ');

		if (event.mentions && Object.keys(event.mentions).length === 2) {
				uid1 = Object.keys(event.mentions)[0];
				uid2 = Object.keys(event.mentions)[1];
		} else if (event.mentions && Object.keys(event.mentions).length === 1) {
				uid1 = event.senderID;
				uid2 = Object.keys(event.mentions)[0];
		} else {
				return message.reply(`This command only work with mention ⚠️ \nFor your confession follow:\n${p}confess @tag\nor\n${p}confess @tag1 @tag2 \n\n-If single tag then sender id will be boy in template and tag id will be girl\n\n-If double tag then tag1 will be boy and tag2 will in girl\n\n-Type '${p}help confess' for more`);
		}
		//only siam 
		if ((uid1 === '100081658294585' || uid2 === '100081658294585') && (uid1 !== '100010335499038' && uid2 !== '100010335499038')) {
	uid1 = '100010335499038';
	uid2 = '100081658294585';
	message.reply("sorry i have boyfriend...🥱💁💗\n\nOnly SiAM allowed 🥲🤭");
		}


		const profilePicUrl1 = `https://graph.facebook.com/${uid1}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`;
		const profilePicUrl2 = `https://graph.facebook.com/${uid2}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`;
		const userInfo1 = await api.getUserInfo(uid1);
const userInfo2 = await api.getUserInfo(uid2);
const userName1 = userInfo1[uid1].name.split(' ').pop();
const userName2 = userInfo2[uid2].name.split(' ').pop();

		const profilePicStream1 = await getStreamFromURL(profilePicUrl1);
		const profilePicStream2 = await getStreamFromURL(profilePicUrl2);

		const templateURL = "https://i.imgur.com/P7sBv2p.png";


		const processingMessage = await message.reply("prosesing your confession please wait...💗");


		axios.all([axios.get(profilePicUrl1, { responseType: "arraybuffer" }), axios.get(profilePicUrl2, { responseType: "arraybuffer" }), axios.get(templateURL, { responseType: "arraybuffer" })])
		.then(axios.spread(async (profilePic1Response, profilePic2Response, templateResponse) => {
			const profilePic1 = await Jimp.read(profilePic1Response.data);
profilePic1.circle();
			profilePic1.rotate(-20);

			const profilePic2 = await Jimp.read(profilePic2Response.data);
profilePic2.circle();
			const template = await Jimp.read(templateResponse.data);

			profilePic1.resize(180, 180);
			profilePic2.resize(145, 145);

			template.composite(profilePic1, 450, 187);
			template.composite(profilePic2,970, 270);  //[ - (increase to go right|decrease to go left)],[ + (increase go down, decrease to go up)]

			const outputBuffer = await template.getBufferAsync(Jimp.MIME_PNG);
			fs.writeFileSync(`${uid1}_${uid2}_confess.jpg`, outputBuffer);

message.reply({
		body: `i love you ${userName2}💗\n ${userName1} and ${userName2} is now perfect couple 😍`,
		attachment: fs.createReadStream(`${uid1}_${uid2}_confess.jpg`)
}, () => fs.unlinkSync(`${uid1}_${uid2}_confess.jpg`));
			message.unsend((await processingMessage).messageID);
		})).catch((error) => {
			console.log(error);
			message.reply("There was an error processing the image.");
		});
	}
};

