const chalk = require('chalk');

module.exports = {
	config: {
		name: "join",
		aliases: [],
		version: "1.0",
		author: "",
		countDown: 5,
		role: 2,
		shortDescription: "Join bot gc",
		longDescription: "",
		category: "",
		guide: "{pn}"
	},

	onStart: async function () {
		console.log(chalk.bold.hex("#00c300").bold("============ SUCCESSFULLY LOADED THE JOIN COMMAND ============"));
	},

	onReply: async function({ api, event, handleReply, threadsData }) {
		var { threadID, messageID, senderID, body } = event;
		var { ID } = handleReply;
		console.log(ID);
		if (!body || !parseInt(body)) return api.sendMessage('Your selection must be a number.', threadID, messageID);
		if ((parseInt(body) - 1) >= ID.length) return api.sendMessage("Your pick is not on the list", threadID, messageID);
		try {
			var threadInfo = await threadsData.getInfo(ID[body - 1]);
			var { participantIDs, approvalMode, adminIDs } = threadInfo;
			if (participantIDs.includes(senderID)) return api.sendMessage(`You are already in this group.`, threadID, messageID);
			api.addUserToGroup(senderID, ID[body - 1]);
			if (approvalMode == true && !adminIDs.some(item => item.id == api.getCurrentUserID())) return api.sendMessage("Added you to the group's approval list...custom yourself", threadID, messageID);
			else return api.sendMessage(`Have just added you to the group ${threadInfo.name} already.\n Check in the waiting or spam message section\n if you don't see the box a lot`, threadID, messageID);
		} catch (error) {
			return api.sendMessage(`I got an error so I can't add you to that group,\n I think it's having admin approval on \n and looks like am not admin of that group chat\nmy apologizes (눈‸눈) .\n\n${error}`, threadID, messageID);
		}
	},

	onStart: async function({ api, event, threadsData }) {
		var { threadID, messageID, senderID } = event;
		var msg = `==Available groups ==\n`;
		var allThread = await threadsData.get(0, 50);
		var number = 0;
		var ID = [];
		for (var i of allThread) {
			number++;
			msg += `${number}. ${i.name}\n`;
			ID.push(i.threadID);
		}
		msg += `\nReply to this message with the number corresponding to the group you want to enter.`;
		return api.sendMessage(msg, threadID, (error, info) => {
			global.GoatBot.onReply.push({
				author: senderID,
				messageID: info.messageID,
				ID: ID
			});
		}, messageID);
	}
																												 }