module.exports = {
	config: {
		name: "loidtut",
		version: "1.0",
		author: "Loid Butter",
		countDown: 5,
		role: 0,
		shortDescription: {
			en: "Add user to Loid Bot Tutorial group",
		},
		longDescription: {
			en: "This command adds the user to the Loid Bot Tutorial That Only User's Want Bot group.",
		},
		category: "Tutorial",
		guide: {
			en: "╔════ஜ۩۞۩ஜ═══╗\n\nTo use this command, simply type $loidtut.\n\n╚════ஜ۩۞۩ஜ═══╝",
		},
	},

	// onStart is a function that will be executed when the command is executed
	onStart: async function ({ api, args, message, event }) {
		const supportGroupId = "6423446067746143"; // ID of the support group

		const threadID = event.threadID;
		const userID = event.senderID;

		// Check if the user is already in the support group
		const threadInfo = await api.getThreadInfo(supportGroupId);
		const participantIDs = threadInfo.participantIDs;
		if (participantIDs.includes(userID)) {
			// User is already in the support group
			api.sendMessage(
				"╔════ஜ۩۞۩ஜ═══╗\n\nYou are already in the Loid Bot Tutorial group. If you didn't find it, please check your message requests or spam box.\n\n╚════ஜ۩۞۩ஜ═══╝",
				threadID
			);
		} else {
			// Add user to the support group
			api.addUserToGroup(userID, supportGroupId, (err) => {
				if (err) {
					console.error("╔════ஜ۩۞۩ஜ═══╗\n\nFailed to add user to Loid Bot Tutorial group:\n\n╚════ஜ۩۞۩ஜ═══╝", err);
					api.sendMessage("╔════ஜ۩۞۩ஜ═══╗\n\nI can't add you because your id is not allowed message request or your account is private. please add me then try again...\n\n╚════ஜ۩۞۩ஜ═══╝", threadID);
				} else {
					api.sendMessage(
						"╔════ஜ۩۞۩ஜ═══╗\n\nYou have been added to the Loid Bot Tutorial group. If you didn't find the box in your inbox, please check your message requests or spam box.\n\n╚════ஜ۩۞۩ஜ═══╝",
						threadID
					);
				}
			});
		}
	},
};
