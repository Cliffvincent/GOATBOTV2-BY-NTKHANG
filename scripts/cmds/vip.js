const header = `👑 𝗛𝗜𝗠𝗔 𝗩𝗜𝗣 𝗨𝗦𝗘𝗥𝗦 👑`;

const fs = require("fs");

const vipFilePath = "vip.json";
const changelogFilePath = "changelog.json"; // Path to your changelog file

function loadVIPData() {
	try {
		const data = fs.readFileSync(vipFilePath);
		return JSON.parse(data);
	} catch (err) {
		console.error("Error loading VIP data:", err);
		return {};
	}
}

function saveVIPData(data) {
	try {
		fs.writeFileSync(vipFilePath, JSON.stringify(data, null, 2));
	} catch (err) {
		console.error("Error saving VIP data:", err);
	}
}

function loadChangelog() {
	try {
		const data = fs.readFileSync(changelogFilePath);
		return JSON.parse(data);
	} catch (err) {
		console.error("Error loading changelog data:", err);
		return {};
	}
}

module.exports = {
	config: {
		name: "vip",
		version: "1.0", // Updated version to 1.0
		author: "Aryan Chauhan",
		role: 2,
		category: "Config",
		guide: {
			en: "!vip add <uid> - Add a user to the VIP list\n!vip rm <uid> - Remove a user from the VIP list\n!vip list - List VIP users\n!vip changelog - View the changelog",
		},
	},

	onStart: async function ({ api, event, args, message, usersData }) {
		const subcommand = args[0];

		if (!subcommand) {
			return;
		}

		// Load VIP data from the JSON file
		let vipData = loadVIPData();

		if (subcommand === "add") {
			const uidToAdd = args[1];
			if (uidToAdd) {
				const userData = await usersData.get(uidToAdd);
				if (userData) {
					const userName = userData.name || "Unknown User";
					// Send a message to the added VIP user
					message.reply(`${header}
${userName} (${uidToAdd}) has been successfully added to the VIP list.`);
					api.sendMessage(`${header}
Congratulations ${userName}! (${uidToAdd}), you have been added to the VIP list. Enjoy the VIP Features!!!`, uidToAdd);
					// Send a message to all VIP users
					Object.keys(vipData).forEach(async (uid) => {
						if (uid !== uidToAdd) {
							const vipUserData = await usersData.get(uid);
							if (vipUserData) {
								const vipUserName = vipUserData.name || "Unknown User";
								api.sendMessage(`${header}
Hello VIP Users! Let's welcome our new VIP user!
Name: ${userName} (${uidToAdd})
You can use vipnoti command if you want to send something to them!`, uid);
							}
						}
					});
					// Update the VIP data and save it
					vipData[uidToAdd] = true;
					saveVIPData(vipData);
				} else {
					message.reply(`${header}
User with UID ${uidToAdd} not found.`);
				}
			} else {
				message.reply(`${header}
Please provide a UID to add to the VIP list.`);
			}
		} else if (subcommand === "rm") {
			const uidToRemove = args[1];
			if (uidToRemove && vipData[uidToRemove]) {
				delete vipData[uidToRemove];
				saveVIPData(vipData);
				const userData = await usersData.get(uidToRemove);
				if (userData) {
					const userName = userData.name || "Unknown User";
					message.reply(`${header}
${userName} (${uidToRemove}) has been successfully removed from the VIP list.`);
					// Send a message to the removed VIP user
					api.sendMessage(`${header}
Sorry ${userName} (${uidToRemove}), you have been removed from the VIP list.`, uidToRemove);
					// Send a message to all VIP users
					Object.keys(vipData).forEach(async (uid) => {
						if (uid !== uidToRemove) {
							const vipUserData = await usersData.get(uid);
							if (vipUserData) {
								const vipUserName = vipUserData.name || "Unknown User";
								api.sendMessage(`${header}
Hello VIP Users, our user ${userName} (${uidToRemove}) has been removed from VIP.`, uid);
							}
						}
					});
				} else {
					message.reply(`${header}
User with UID ${uidToRemove} not found.`);
				}
			} else {
				message.reply(`${header}
Please provide a valid UID to remove from the VIP list.`);
			}
		} else if (subcommand === "list") {
			const vipList = await Promise.all(Object.keys(vipData).map(async (uid) => {
				const userData = await usersData.get(uid);
				if (userData) {
					const userName = userData.name || "Unknown User";
					return `• ${userName} (${uid})`;
				} else {
					return `• Unknown User (${uid})`;
				}
			}));

			if (vipList.length > 0) {
				message.reply(`${header}

» Our respected VIP Users:

${vipList.join(`
`) } 

Use !vip add/del <uid> to add or remove participants.`);
			} else {
				message.reply(`${header}
The VIP list is currently empty.`);
			}
		} else if (subcommand === "changelog") {
			// Display the changelog data
			const changelogData = loadChangelog();

			if (changelogData) {
				const changelogEntries = Object.keys(changelogData).filter((version) => parseFloat(version) >= 1.0);

				if (changelogEntries.length > 0) {
					const changelogText = changelogEntries.map((version) => `Version ${version}: ${changelogData[version]}`).join('\n');
					message.reply(`${header}
Current Version: ${module.exports.config.version}
Changelog:
${changelogText}`);
				} else {
					message.reply(`${header}
Current Version: ${module.exports.config.version}
Changelog:
No changelog entries found starting from version 1.0.`);
				}
			} else {
				message.reply("Changelog data not available.");
			}
		}
	}
};
