module.exports = {
	config: {
		name: "findgay",
		aliases: [],
		author: "kshitiz",
		version: "2.0",
		cooldowns: 20,
		role: 0,
		shortDescription: {
			en: "gay finder",
		},
		longDescription: {
			en: "find gay in gc",
		},
		category: "𝗙𝗨𝗡",
		guide: {
			en: "{p}{n} find gay",
		},
	},
	onStart: async function ({ api, event, message }) {
		const groupId = event.threadID;
		const groupMembers = await api.getThreadInfo(groupId);

		const friends = groupMembers.participantIDs.filter((userId) => !groupMembers.nicknames[userId]);

		if (friends.length === 0) {
			message.reply("No eligible users found in this group.");
			return;
		}

		const randomIndex = Math.floor(Math.random() * friends.length);
		const randomUserId = friends[randomIndex];

		const userInfo = await api.getUserInfo([randomUserId]);
		const realName = userInfo[randomUserId].name;


		const url = "https://drive.google.com/uc?export=download&id=1PfE5AOA_bht94pdAH5o26_d3K346zxjx";


		const loadingMessage = await api.sendMessage("Loading... Gay user\nof this gc please wait🤡", groupId);


		message.reply({
			body: `𝗧𝗵𝗲 𝗚𝗮𝘆 𝗣𝗲𝗿𝘀𝗼𝗻 𝗶𝘀 ${realName} 🏳️‍🌈 `,
			attachment: await global.utils.getStreamFromURL(url),
		});


		await api.unsendMessage(loadingMessage.messageID);
	},
};