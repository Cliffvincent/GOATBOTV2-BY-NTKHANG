const fs = require("fs");
const path = require("path");
const { config } = global.GoatBot;

const pendingIDsPath = path.join(__dirname, "assist_json", "pending_main.json");
const approvedIDsPath = path.join(__dirname, "assist_json", "approved_main.json");

module.exports = {
	config: {
		name: "requestMAIN",
		version: "1.1",
		author: "SiAM",
		countDown: 5,
		category: "Utility",
		role: 0,
		guide: {
			en: "{pn} Your <message for admin> "
		}
	},

	onStart: async function ({ api, args, event, threadsData }) {
		const { getPrefix } = global.utils;
			 const p = getPrefix(event.threadID);
		const threadID = event.threadID;
		const senderID = event.senderID;
		const threadInfo = await api.getThreadInfo(threadID);

		// Check if the thread ID is already approved
		if (fs.existsSync(approvedIDsPath)) {
			const approvedIDs = JSON.parse(fs.readFileSync(approvedIDsPath));
			if (approvedIDs.includes(threadID)) {
				const approvalMsg = "No need for approval. This thread is already approved to use all main  command from the bot.\n\n If you don't know how to use this bot then join the Marin support Box \nType : $support \nto join.";
				api.sendMessage(approvalMsg, threadID);
				return;
			}
		}

		// Check if the thread ID is already pending
		if (fs.existsSync(pendingIDsPath)) {
			const pendingIDs = JSON.parse(fs.readFileSync(pendingIDsPath));
			if (pendingIDs.includes(threadID)) {
				const pendingMsg = "Your request to use bot main cmds is already in pending.... \nPlease contact Loid Butter for fast approval.\n\n Facebook:https://www.facebook.com/profile.php?id=100082741664058\n\n also you can join  Marin support Box for help\nType : $support \nto join.";
				api.sendMessage(pendingMsg, threadID);
				return;
			}
		} else {
			// If the file doesn't exist, create an empty array
			fs.writeFileSync(pendingIDsPath, "[]");
		}

		// Check if the user provided a message for the admin
		const userMessage = args.join(" ");
		if (!userMessage) {
			const messageReminder = `Please add a message for the admin. \n\nExample:\n ${p} requestMAIN yourmessage`;
			api.sendMessage(messageReminder, threadID);
			return;
		}

		// Store the thread ID in the pending list
		const pendingIDs = JSON.parse(fs.readFileSync(pendingIDsPath));
		pendingIDs.push(threadID);
		fs.writeFileSync(pendingIDsPath, JSON.stringify(pendingIDs));

		const msg = `------MAIN BoT RQ------\n\nThread ID: ${threadID}\nThread Type: ${threadInfo.isGroup ? "Group" : "User"}\n${threadInfo.isGroup ? `Group Name: ${threadInfo.name}\n\nRequester ID: ${senderID}\nRequester Name: ${await getUserName(api, senderID)}` : `User Name: ${await getUserName(api, senderID)}`}\n\nMessage: ${userMessage}`;
for (const adminID of config.adminBot) {
	api.sendMessage(msg, adminID);
}


		const notifyMsg = `✅Your approval request for using Bot's main cmds has been sent to admin SiAM with this\nmessage: ${userMessage}.\n\n I will notify you if your thread is approved. Please wait until then.\n\n join the Marin support Box if you facing any problem\nType : $support \nto join.`;
		api.sendMessage(notifyMsg, threadID);
	}
};

async function getUserName(api, userID) {
	const user = await api.getUserInfo(userID);
	return user[userID].name;
}
