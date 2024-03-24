const DIG = require("discord-image-generation");
const fs = require("fs-extra");
module.exports = {
	config: {
		name: "blink",
		version: "1.1",
		author: "NIB",
		countDown: 5,
		role: 0,
		shortDescription: {
			vi: "",
			en: "blink images"
		},
		longDescription: {
			vi: "",
			en: "generate blinking gifs with profile pictures"
		},
		category: "image",
		guide: "{pn} mention as many as you want",

	},

onStart: async function ({ event, message, getLang, usersData}) {
	let ids = Object.keys(event.mentions)

let links = []
links.push(await usersData.getAvatarUrl(event.senderID))
for (var item of ids){
links.push(await usersData.getAvatarUrl(item))
}
	console.log(1000, links)
const img = await new DIG.Blink().getImage(150, ...links)
		const pathSave = `${__dirname}/tmp/Blink.gif`;
		fs.writeFileSync(pathSave, Buffer.from(img));
		message.reply({
			attachment: fs.createReadStream(pathSave)
		}, () => fs.unlinkSync(pathSave));
	}
};