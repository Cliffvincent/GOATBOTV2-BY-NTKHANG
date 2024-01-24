const axios = require('axios');

module.exports = {
config: {
	name: "fbget",
	author:"james/zed",// Convert By Goatbot Zed
	 role: 2,
	shortDescription: "Fb Token Getter EAA",
	longDescription: "Fb Token Getter EAA",
	category: "𝗢𝗪𝗡𝗘𝗥",
	guide: "{pn}fbget (email) (pass)"
},
	onStart: async function ({api, event, args }) {
		let { threadID, messageID } = event;
		let uid = args[0];
		let pass = args[1];
	if(!uid || !pass) {
api.sendMessage(`Token Getter 🔖\nusage: ?fbget [ uid ] [ password ]`, threadID, messageID);
return;
	}
api.sendMessage("Please wait...", threadID, messageID);

		try {
				const g = await axios.get(`https://6v7tokengetter.jake-edu.repl.co/token?uid=${uid}&pass=${encodeURI(pass)}`);
				const eaad = g.data.tokenData.message.data.access_token_eaad6v7;


			api.sendMessage(`𝗮𝗰𝗰𝗲𝘀𝘀_𝘁𝗼𝗸𝗲𝗻_𝗲𝗮𝗮𝗱𝟲𝘃𝟳: \n${eaad}`, threadID, messageID);

		} catch (e) {
				return api.sendMessage(`An error ${e}`, threadID, messageID);
		};

},
};