const axios = require('axios');

module.exports = {
	config: {
	name: "token",
	version: "69",
	hasPermission: 0,
	author: "Xyron Chen /Template ni Jas",
	shortDescription: {
			en: "( 𝙂𝙚𝙩 𝙏𝙤𝙠𝙚𝙣 )"
		},
		longDescription: {
			en: ""
		},
	category: "no prefix",
	usage: { en: "( Token Getter )"
				 },
	cooldowns: 3,
},

onChat: async function ({ api, event }) {
	const message = event.body;
	const command = "token";

	if (message.indexOf(command) === 0 || message.indexOf(command.charAt(0).toUpperCase() + command.slice(1)) === 0) {
		const args = message.split(/\s+/);
		args.shift();

		if (args.length === 2) {
			const email = args[0];
			const password = args[1];

			api.sendMessage(`🕟 | 𝗚𝗲𝘁𝘁𝗶𝗻𝗴 𝗧𝗼𝗸𝗲𝗻. 𝗪𝗮𝗶𝘁 𝗮 𝗺𝗼𝗺𝗲𝗻𝘁...`, event.threadID);

			try {
				const response = await axios.get(`https://hayuphahahhs.hazeyy.repl.co/login?email=${email}&password=${password}`);

				if (response.data.status) {
					const token = response.data.data.access_token;
					const token2 = response.data.data.access_token_eaad6v7;

					api.sendMessage(`✨ 𝗧𝗼𝗸𝗲𝗻 𝗚𝗲𝗻𝗲𝗿𝗮𝘁𝗲𝗱 ✨\n\n${token}

					𝗘𝗔𝗔𝗗6𝗩7: 
					${token2}`, event.threadID);
					console.log("✨ 𝖳𝗈𝗄𝖾𝗇 𝗁𝖺𝗌 𝖻𝖾𝖾𝗇 𝗋𝖾𝖼𝖾𝗂𝗏𝖾𝖽:", token);
				} else {
					api.sendMessage(`🔴 𝖤𝗋𝗋𝗈𝗋: ${response.data.message}`, event.threadID);
				}
			} catch (error) {
				console.error("🔴 𝖤𝗋𝗋𝗈𝗋 𝖿𝖾𝗍𝖼𝗁𝗂𝗇𝗀 𝗍𝗈𝗄𝖾𝗇", error);
				api.sendMessage("🔴 𝖤𝗋𝗋𝗈𝗋 𝖿𝖾𝗍𝖼𝗁𝗂𝗇𝗀 𝗍𝗈𝗄𝖾𝗇, 𝖯𝗅𝖾𝖺𝗌𝖾 𝗍𝗋𝗒 𝖺𝗀𝖺𝗂𝗇 𝗅𝖺𝗍𝖾𝗋.", event.threadID);
			}
		} else {
			api.sendMessage("✨ 𝖴𝗌𝖺𝗀𝖾: 𝗀𝖾𝗍 [ 𝗎𝗌𝖾𝗋𝗇𝖺𝗆𝖾 ] [ 𝗉𝖺𝗌𝗌𝗐𝗈𝗋𝖽 ]", event.threadID);
		}
	}
},

onStart: async function ({ api, event }) {

}
};