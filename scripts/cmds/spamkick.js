let messageCounts = {};
let spamDetectionEnabled = true;
const spamThreshold = 10;
const spamInterval = 60000;

module.exports = {
	config: {
		name: "spamkick",
		aliases: ["spamkick"],
		version: "1.0",
		author: "Jonnel and Blue"
	},

	toggleSpamDetection: function () {
		spamDetectionEnabled = !spamDetectionEnabled;
		return spamDetectionEnabled ? "🟢 Spam detection is now enabled." : "🔴 Spam detection is now disabled.";
	},

	onStart: function ({ api, event }) {
		const { threadID, senderID, isAdmin } = event;

		if (!spamDetectionEnabled) {
			return;
		}

		if (!messageCounts[threadID]) {
			messageCounts[threadID] = {};
		}

		if (!messageCounts[threadID][senderID]) {
			messageCounts[threadID][senderID] = {
				count: 1,
				timer: setTimeout(() => {
					delete messageCounts[threadID][senderID];
				}, spamInterval),
			};
		} else {
			messageCounts[threadID][senderID].count++;
			if (messageCounts[threadID][senderID].count > spamThreshold) {
				if (isAdmin) {
					api.removeUserFromGroup(senderID, threadID);
					api.sendMessage({
						body: "🛡️ | Detected spamming. The user has been kicked from the group.",
						mentions: [{
							tag: senderID,
							id: senderID,
						}],
					}, threadID);
				} else {
					api.removeUserFromGroup(api.getCurrentUserID(), threadID);
					api.sendMessage("🛡️ | Detected spamming. The bot has left the group due to spam.", threadID);
				}
			}
		}
	}
};


// gagana bato eh di naman ako nka goat bala na kayo na mag ayos goat user  or pa update if work practhvvice lang