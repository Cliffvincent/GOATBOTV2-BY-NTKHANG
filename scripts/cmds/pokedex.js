const axios = require('axios');

const fs = require("fs")
module.exports = {
	config: {
		name: "pokedex",
		aliases: ["pokedex"],
		version: "1.0",
		author: "NIB",
		countDown: 5,
		role: 0,
		shortDescription: "View your pokemons",
		longDescription: "",
		category: "harem kings",
		guide: "{pn}"
	},

	onStart: async function ({ api, message, args, event, usersData}) {
		var pokedb = JSON.parse(fs.readFileSync('pokedb.json', 'utf8'));

let uid = event.senderID

if(Object.keys(event.mentions)[0]) uid = Object.keys(event.mentions)[0]

		try {
			let name = await usersData.getName(uid)
			if(!pokedb.hasOwnProperty(event.threadID)) return message.reply("This thread haven’t started pokebot yet")
if(!pokedb[event.threadID].usdata.hasOwnProperty(uid)) return message.reply(`BAKA!! ${Object.keys(event.mentions)[0]?name:"you"} don't have any pokemons yet.`)


			let res2 = pokedb[event.threadID].usdata[uid]
			let fbid = uid
		 // let name = await usersData.getName(event.senderID)
			let waifus = res2.length
			let waifus_name = res2.join("\n↬").toUpperCase()
			const form = {
					body: `╭「Pokemon Masters Candidate」`
						+ `\n│_`
					+ `\n❏ User id: ${fbid}`
					+ `\n❏ Name: ${name}`
					+ `\n❏ Pokemons: ${waifus}`
					+ `\n↬ ${waifus_name}`
				};
			api.sendMessage(form, event.threadID, event.messageID);
		} catch (e) {
			console.log(e)
			message.reply('🥺 server busy')
		}

	}
};