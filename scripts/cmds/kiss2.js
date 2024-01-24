const DIG = require("discord-image-generation");
const fs = require("fs-extra");


module.exports = {
		config: {
				name: "kiss2",
				aliases: ["kiss"],
				version: "1.0",
				author: "NIB",
				countDown: 5,
				role: 0,
				shortDescription: "KISS",
				longDescription: "",
				category: "funny",
				guide: "{pn}"
		},



		onStart: async function ({ api, message, event, args, usersData }) {
			let one, two;
				const mention = Object.keys(event.mentions);
			if(mention.length == 0) return message.reply("Please mention someone");
else if(mention.length == 1){
 one = event.senderID
	 two = mention[0];

} else{
 one = mention[1]
	 two = mention[0];

}


				const avatarURL1 = await usersData.getAvatarUrl(one);
		const avatarURL2 = await usersData.getAvatarUrl(two);
		const img = await new DIG.Kiss().getImage(avatarURL1, avatarURL2);
		const pathSave = `${__dirname}/tmp/${one}_${two}kiss.png`;
		fs.writeFileSync(pathSave, Buffer.from(img));
		const content = "😘😘"
		message.reply({
			body: `${(content || "Bópppp 😵‍💫😵")}`,
			attachment: fs.createReadStream(pathSave)
		}, () => fs.unlinkSync(pathSave));
	}
};