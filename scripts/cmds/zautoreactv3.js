module.exports = {
	config: {
		name: "autoreact | NOTCMD",
		version: "1.0",
		author: "jvb",
		countDown: 5,
		role: 0,
		shortDescription: "sarcasm",
		longDescription: "sarcasm",
		category: "reply",
	},
	onStart: async function () {},
	onChat: async function ({ api, event, client, __GLOBAL }) {
		var { threadID, messageID } = event;
		let react = event.body.toLowerCase();
		if (
			event.body.indexOf("kain") == 0 ||
			event.body.indexOf("Kain") == 0 ||
			event.body.indexOf("yie") == 0 ||
			event.body.indexOf("paiyot") == 0 ||
			event.body.indexOf("pokpok") == 0 ||
			event.body.indexOf("Paiyot") == 0 ||
			event.body.indexOf("chupa") == 0 ||
			event.body.indexOf("Chupa") == 0 ||
			event.body.indexOf("sex") == 0 ||
			event.body.indexOf("Sex") == 0 ||
			event.body.indexOf("bilat") == 0 ||
			event.body.indexOf("belat") == 0 ||
			event.body.indexOf("Bilat") == 0 ||
			event.body.indexOf("Belat") == 0 ||
			event.body.indexOf("Puke") == 0 ||
			event.body.indexOf("puke") == 0 ||
			event.body.indexOf("puday") == 0 ||
			event.body.indexOf("Puday") == 0 ||
			event.body.indexOf("lalaki") == 0 ||
			event.body.indexOf("Lalaki") == 0 ||
			event.body.indexOf("buti pa") == 0 ||
			event.body.indexOf("hehe") == 0 ||
			event.body.indexOf("Hehe") == 0 ||
			event.body.indexOf("mwah") == 0 ||
			event.body.indexOf("Mwah") == 0 ||
			event.body.indexOf("mwuah") == 0 ||
			event.body.indexOf("baby") == 0 ||
			event.body.indexOf("iyot") == 0 ||
			event.body.indexOf("Iyot") == 0 ||
			event.body.indexOf("bby") == 0 ||
			event.body.indexOf("bebe") == 0 ||
			event.body.indexOf("luck") == 0 ||
			event.body.indexOf("inita") == 0 ||
			event.body.indexOf("afternoon") == 0 ||
			event.body.indexOf("aftie") == 0 ||
			event.body.indexOf("Afternoon") == 0 ||
			event.body.indexOf("Aftie") == 0 ||
			event.body.indexOf("Morning") == 0 ||
			event.body.indexOf("morning") == 0 ||
			event.body.indexOf("peste") == 0 ||
			event.body.indexOf("Kayat") == 0 ||
			event.body.indexOf("kainit") == 0 ||
			event.body.indexOf("seggs") == 0 ||
			event.body.indexOf("jerjer") == 0 ||
			event.body.indexOf("kayat") == 0 ||
			event.body.indexOf("utin") == 0 && !bot.includes(event.senderID)
		) {
			var msg = {
				body: "",
			};
			api.sendMessage(msg, threadID, messageID);
			api.setMessageReaction("🥵", event.messageID, (err) => {}, true);
		}
	},
};
