module.exports = {
	config: {
		name: "leaveall",
		author: "cliff",
		version: "1.5.0",
		countDown: 10,
		role: 0,
		category: "Admin",
		shortDescription: {
			en: "leave all group"
		}
	},

	onStart: async function ({ api, event, args }) {
		return api.getThreadList(100, null, ["INBOX"], (err, list) => {
			if (err) throw err;
			list.forEach(item => (item.isGroup == true && item.threadID != event.threadID) ? api.removeUserFromGroup(api.getCurrentUserID(), item.threadID) : '');
			api.sendMessage('Out of the whole group successfully', event.threadID);
		});
	}
};
