const fs = require("fs");

module.exports = {
	config: {
		name: "approved",
		author: "Jun",
		countDown: 5,
		role: 0,
		category: "owner",
		shortDescription: {
			en: ""
		}
	},

	onLoad: async function() {
		const dataPath = __dirname + "/cache/approvedThreads.json";
		const pendingPath = __dirname + "/cache/pendingThreads.json";

		if (!fs.existsSync(dataPath)) {
			fs.writeFileSync(dataPath, JSON.stringify([]));
		}

		if (!fs.existsSync(pendingPath)) {
			fs.writeFileSync(pendingPath, JSON.stringify([]));
		}
	},

	onStart: async function({ event, api, args }) {
		const { threadID, messageID, senderID } = event;
		const dataPath = __dirname + "/cache/approvedThreads.json";
		const pendingPath = __dirname + "/cache/pendingThreads.json";
		let data = JSON.parse(fs.readFileSync(dataPath));
		let pending = JSON.parse(fs.readFileSync(pendingPath));
		let msg = "";
		let idBox = args[0] || threadID;

		if (args[0] == "list") {
			msg = "LIST OF APPROVED BOXES! ";
			let count = 0;

			for (const e of data) {
				msg += `${count += 1}. ID: ${e}`;
			}

			api.sendMessage(msg, threadID, messageID);
		} else if (args[0] == "del") {
			idBox = args[1] || event.threadID;

			if (isNaN(parseInt(idBox))) {
				api.sendMessage("Not a number.", threadID, messageID);
				return;
			}

			if (!data.includes(idBox)) {
				api.sendMessage("The box was not approved before! ", threadID, messageID);
				return;
			}

			api.sendMessage(`Box ${idBox} has been removed from bot permission list `, threadID, () => {
				if (!pending.includes(idBox)) {
					pending.push(idBox);
				}

				data.splice(data.indexOf(idBox), 1);
				fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
				fs.writeFileSync(pendingPath, JSON.stringify(pending, null, 2));
			}, messageID);
		} else if(args[0] == "pending") {
			msg = "DANH SÁCH CÁC BOX CHỜ ĐƯỢC DUYỆT!";
			let count = 0;

			for (const e of pending) {
				const name = (await api.getThreadInfo(e)).name || "Nhóm Chat";
				msg += `${count += 1}. ${name}\ID: ${e}`;
			}

			api.sendMessage(msg, threadID, messageID);
		} else if (isNaN(parseInt(idBox))) {
			api.sendMessage("Invalid ID entered ", threadID, messageID);
		} else if (data.includes(idBox)) {
			api.sendMessage(`ID ${idBox} was approved before! `, threadID, messageID);
		} else {
			api.sendMessage("» Box has been approved by admin.\Use help to see more commands.", idBox, (error, info) => {
				if (error) {
					api.sendMessage("An error occurred, make sure that the ID you entered is valid and the bot is in the box! ", threadID, messageID);
				} else {
					data.push(idBox);
					pending.splice(pending.indexOf(idBox), 1);
					fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
					fs.writeFileSync(pendingPath, JSON.stringify(pending, null, 2));
					api.sendMessage(`» Box approval successful:\${idBox}`, threadID, messageID);
				}
			});
		}
	}
};