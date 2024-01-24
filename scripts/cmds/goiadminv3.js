module.exports = {
	config: {
		name: "goiadmin",
		author: "cliff",
		role: 2,
		shortDescription: " ",
		longDescription: "",
		category: "BOT",
		guide: "{pn}"
	},

onChat: function({ api, event }) {
	if (event.senderID !== "100053549552408") {
		var aid = ["100053549552408"];
		for (const id of aid) {
		if ( Object.keys(event.mentions) == id) {
			var msg = ["anong kailangan mo sa pogi kong admin?", "Tag Admin again, I'll punch you", "wag mong istorbohin admin ko","tumatae sya","tulog yung admin  ko"];
			return api.sendMessage({body: msg[Math.floor(Math.random()*msg.length)]}, event.threadID, event.messageID);
		}
		}}
},
onStart: async function({}) {
	}
};