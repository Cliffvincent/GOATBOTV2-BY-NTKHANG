module.exports = {
	config: {
		name: "feedback",
		info: "Feedback",
		author: "Deku",
		hasPermission: "members",
		usages: "[feedback]",
		prefix: "enable",
		cooldowns: 10,
		countDown: 5,
		role: "",
		shortDescription: {
			vi: "",
			en: ""
		},
		longDescription: {
			vi: "",
			en: ""
		},
		category: "Feedback",
		guide: {
			vi: "",
			en: ""
		},
		langs: {
			vi: {},
			en: {}
		}
	},
	onStart: async function ({ api, box, event, target }) {
		if (!target[0]) return box.send("Please enter your feedback", event.threadID, event.messageID);
		if (target.join(" ").length > 60) return box.send("Your feedback is too long my admin is lazy to read.", event.threadID, event.messageID);
		var tn = event.isGroup ? (await api.getThreadInfo(event.threadID)).name || "Unnamed Group" : "Direct Chat";
		const m = require("moment-timezone");
		var time = m.tz("Asia/Manila").format("HH:mm:ss DD/MM/YYYY");
		const res = await api.getUserInfo(event.senderID);
		var name = res.name;
		for (let i of global.harold.adminbot) {
			box.send("Feedback from " + name + ": " + target.join(" ") + "\nFrom Group: " + tn + "\nAt " + time, i);
		}
		return api.sendMessage("Your feedback has been sent to admin(s).", event.threadID, event.messageID);
	}
};
