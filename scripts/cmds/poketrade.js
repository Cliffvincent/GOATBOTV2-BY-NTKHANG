const axios = require('axios');

const fs = require("fs")
module.exports = {
	config: {
		name: "poketrade",
		aliases: ["poketrade"],
		version: "1.0",
		author: "NIB",
		countDown: 5,
		role: 0,
		shortDescription: "Trade your pokemons",
		longDescription: "",
		category: "harem kings",
		guide: "{pn}"
	},

	onStart: async function ({ api, message, args, event, usersData, commandName}) {
		var pokedb = JSON.parse(fs.readFileSync('pokedb.json', 'utf8'));
		try {

			let mentionv = Object.values(event.mentions)
			let mentionk = Object.keys(event.mentions)
			if(!pokedb.hasOwnProperty(event.threadID)) return message.send("This thread haven’t started pokebot yet")
if(!pokedb[event.threadID].usdata.hasOwnProperty(event.senderID)) return message.send("BAKA!! You don't have any pokemons yet.")

			if(mentionv.length == 0) return message.reply("baka mention someone")
if(!pokedb[event.threadID].usdata.hasOwnProperty(mentionk[0])) return message.send("BAKA!! Opposition don't have any pokemons yet.")
let arr = args.join(" ").replace(mentionv[0], "").split("|").filter(e => e.trim()).filter(e => e)

if(arr.length != 2) return message.reply("Baka wrong syntax")

if(!pokedb[event.threadID].usdata[event.senderID].includes(arr[0].trim().toLowerCase())) return message.send(`BAKA!! You don't have  ${arr[0]} in your pokedex`)

			if(!pokedb[event.threadID].usdata[mentionk[0]].includes(arr[1].trim().toLowerCase())) return message.send(`BAKA!! Opposition don't have  ${arr[1]} in their pokedex`)

			message.reply(`${await usersData.getName(event.senderID)} wants to trade ${arr[0].toUpperCase()} with ${arr[1].toUpperCase()} from ${await usersData.getName(mentionk[0])}`, (err, info)=>{
				global.GoatBot.onReply.set(info.messageID,{
					commandName,
					mid:info.messageID,
					author:event.senderID,
					oppose:mentionk[0],
					atrd: arr[0].trim().toLowerCase(),
					otrd: arr[1].trim().toLowerCase()
				})
			})

		} catch (e) {
			console.log(e)
			message.reply('🥺 server busy')
		}

	},
	onReply: async ({ event, api, Reply, message, getLang }) => {
		var pokedb = JSON.parse(fs.readFileSync('pokedb.json', 'utf8'));
if(event.senderID == Reply.author){
	if(event.body == "Deal close"){
		message.unsend(Reply.mid)
message.reply("Huhhhh. Deal closed. Wasted my valuable time.") 
}else {
		message.reply("Only reply Deal close.")
}
} else if(event.senderID == Reply.oppose){
	if(event.body == "Deal done"){

pokedb[event.threadID].usdata[Reply.author].splice(pokedb[event.threadID].usdata[Reply.author].indexOf(Reply.atrd),1)
pokedb[event.threadID].usdata[Reply.oppose].splice(pokedb[event.threadID].usdata[Reply.oppose].indexOf(Reply.otrd),1)
pokedb[event.threadID].usdata[Reply.author].push(Reply.otrd)
pokedb[event.threadID].usdata[Reply.oppose].push(Reply.atrd)
fs.writeFile('pokedb.json', JSON.stringify(pokedb), err => { if (err) return console.error(err); });
		message.reply("Hurrah deal done")
		message.unsend(Reply.mid)
} else if(event.body == "Deal close"){

		message.unsend(Reply.mid)
message.reply("Huhhhh. Deal closed. Wasted my valuable time.") 
}else {
		message.reply("Only reply Deal done or Deal close.")
}

} else{
	message.reply("Only traders can reply")
}
	}
};