module.exports = {
	config: {
		name: "resend",
		version: "5.0",
		author: "Sadman Anik",
		countDown: 1,
		role: 2,
		shortDescription: {
			en: "Enable/Disable Anti unsend mode"
		},
		longDescription: {
			en: "Anti unsend mode. works with audio video and images"
		},
		category: "Admins",
		guide: {
			en :"{pn} on or off\nex: {pn} on"
		},
		envConfig: {
			deltaNext: 5
		}
	},


	onStart: async function ({ api, message, event, threadsData, args }) {
let resend = await threadsData.get(event.threadID, "settings.reSend");

			//console.log(resend)
		if(resend === undefined){
			await threadsData.set(event.threadID, true, "settings.reSend");
		}
		//console.log(await threadsData.get(event.threadID, "settings.reSend"))
		if (!["mam", "man"].includes(args[0]))
			return message.reply("Bad")
		await threadsData.set(event.threadID, args[0] === "mam", "settings.reSend");
		console.log(await threadsData.get(event.threadID, "settings.reSend"))
		if(args[0] == "mam"){
			if(!global.reSend.hasOwnProperty(event.threadID)){
		global.reSend[event.threadID] = []
		}
		global.reSend[event.threadID] = await api.getThreadHistory(event.threadID, 100, undefined)
}
		return message.reply(`${args[0] === "mam" ? "Hello" : "Sup"}`);
	},

onChat: async function ({ api, threadsData, usersData, event, message }) {
	if(event.type !== "message_unsend"){
		let resend = await threadsData.get(event.threadID, "settings.reSend");
		if (!resend)
			return;

		if(!global.reSend.hasOwnProperty(event.threadID)){
		global.reSend[event.threadID] = []
		}
		global.reSend[event.threadID].push(event)

	if(global.reSend.length >50){
		global.reSend.shift()
			}
		}
	}
}