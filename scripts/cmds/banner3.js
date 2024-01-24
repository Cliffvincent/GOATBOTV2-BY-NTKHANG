const axios = require('axios');
const jimp = require("jimp");
const fs = require("fs");
module.exports = {
	config: {
		name: "banner3",
		version: "1.0",
		author: "@Toxinum.",
		countDown: 5,
		role: 2,
		shortDescription: "Create Banner",
		longDescription: "",
		category: "edit",
		guide: {
			vi: "{p}{n} <name> | <description> | <facebook> | <Instagram> | <phone> | <location>",
			en: "{p}{n} <name> | <description> | <facebook> | <Instagram> | <phone> | <location>"
		}
	},

	onStart: async function ({ message, args, event, api }) {
let avatarUrl1;
	  if(event.type == "message_reply" && event.messageReply.attachments.length > 0 && (event.messageReply.attachments[0].type == "photo" || "animated_image")){
var x = event.messageReply.attachments[0].url;
avatarUrl1 = event.messageReply.attachments[0].url;
} else{
avatarUrl1 = `https://graph.facebook.com/${event.senderID}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`;
};
	  
    const info = args.join(" ");
		if (!info){
			return message.reply(`- কিছুই লেখলি না!`);
		}else {
		const msg = info.split("|");
		const name = msg[0];
		const description = msg[1];
		const facebook = msg[2];
		const instagram = msg[3];
		const phone = msg[4];
		const location = msg[5];
    const img = (`https://goatbot.up.railway.app/taoanhdep/banner2?name=${name}&description=${description}&facebook=${facebook}&instagram=${instagram}&phone=${phone}&location=${location}&avatarurl=${encodeURIComponent(avatarUrl1)}&apikey=ntkhangGoatBot`)
			const form = {
				body: ` ❤️❤️❤️ `
			};
				form.attachment = []
				form.attachment[0] = await global.utils.getStreamFromURL(img);
			message.reply(form);
			  }
}};