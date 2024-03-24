const axios = require('axios');

const fs = require("fs")

module.exports = {
	config: {
		name: "pokechamps",
		aliases: ["pokechams", "pokemasters"],
		version: "1.0",
		author: "NIB",
		countDown: 5,
		role: 0,
		shortDescription: "See all Top Pokemon Champions",
		longDescription: "",
		category: "harem kings",
		guide: "{pn}"
	},

	onStart: async function ({ api, message, args, event, usersData }) {


var pokedb = JSON.parse(fs.readFileSync('pokedb.json', 'utf8'));
		try {
			if(!pokedb.hasOwnProperty(event.threadID)) return message.send("This thread haven’t started pokebot yet")
if(!Object.keys(pokedb[event.threadID].usdata).length) return message.send("Alas!! Nobody of this thread have any pokemons.")
			let obj = pokedb[event.threadID].usdata
var arr = [];
		for (var prop in obj) {
				if (obj.hasOwnProperty(prop)) {
						arr.push({
								'name': await usersData.getName(prop),
							"uid": prop,
								'poks': obj[prop].length
						});
				}
		}
		arr.sort(function(a, b) { return b.poks - a.poks; });


			var str = ""
for(var itm of arr){
	str += `${arr.indexOf(itm)+1} ↬ Uid : ${itm.uid}
	 Name : ${itm.name}
 Pokemons : ${itm.poks}\n\n`
}

			const form = {
				body: str
			};
			// if (img) {
			// 	form.attachment = []
			// 	form.attachment[0] = await global.utils.getStreamFromURL(img);

			// }
			message.reply(form);
		} catch (e) { console.log(e)
			message.reply('🥺 Not Found') }

	}
};