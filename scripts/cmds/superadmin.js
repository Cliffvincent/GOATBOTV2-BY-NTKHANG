const fs = require("fs-extra");
const { config } = global.GoatBot;
const { client } = global;

module.exports = {
	config: {
		name: "superadmin",
		aliases: ["superadminonly", "owner", "superadmin"],
		version: "1.0",
		author: "Taseen",
		countDown: 5,
		role: 3,
		shortDescription: "Turn on/off SuperAdmin mode",
		longDescription: "",
		category: "owner",
		guide: "{pn} {{[on | off]}}"
	},

	onStart: function ({ args, message }) {
		if (args[0] == "on") {
			config.adminOnly = true;
			message.reply("Only SuperAdmin/owner can use the bot");
			fs.writeFileSync(client.dirConfig, JSON.stringify(config, null, 2));
		}
		else if (args[0] == "off") {
			config.adminOnly = false;
			message.reply("SuperAdmin mode disabled");
			fs.writeFileSync(client.dirConfig, JSON.stringify(config, null, 2));
		}
		else
			return message.reply("Please choose on or off mode");
	}
};