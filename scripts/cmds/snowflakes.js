const axios = require('axios');
const { GoatWrapper } = require('fca-liane-utils');

async function getUserNames(api, uid) {
	try {
		const userInfo = await api.getUserInfo([uid]);
		return Object.values(userInfo).map(user => user.name || `User${uid}`);
	} catch (error) {
		console.error('Error getting user names:', error);
		return [];
	}
}

function formatFont(text) { 
	const fontMapping = {
		a: "𝚊", b: "𝚋", c: "𝚌", d: "𝚍", e: "𝚎", f: "𝚏", g: "𝚐", h: "𝚑", i: "𝚒", j: "𝚓", k: "𝚔", l: "𝚕", m: "𝚖",
		n: "𝚗", o: "𝚘", p: "𝚙", q: "𝚚", r: "𝚛", s: "𝚜", t: "𝚝", u: "𝚞", v: "𝚟", w: "𝚠", x: "𝚡", y: "𝚢", z: "𝚣",
		A: "𝙰", B: "𝙱", C: "𝙲", D: "𝙳", E: "𝙴", F: "𝙵", G: "𝙶", H: "𝙷", I: "𝙸", J: "𝙹", K: "𝙺", L: "𝙻", M: "𝙼",
		N: "𝙽", O: "𝙾", P: "𝙿", Q: "𝚀", R: "𝚁", S: "𝚂", T: "𝚃", U: "𝚄", V: "𝚅", W: "𝚆", X: "𝚇", Y: "𝚈", Z: "𝚉"
	};

	return text.split('').map(char => fontMapping[char] || char).join('');
}

module.exports = {
	config: {
		name: 'snowflakes',
		version: '1.1.1',
		hasPermssion: 0,
		author: "cliff",
	 countDown: 0,
		category: "None",
		credits: 'hashier',
		description: 'powered by Snowflakes Ai',
		usePrefix: false,
		hasPrefix: false,
		commandCategory: 'snowflakes',
		usages: '[prompt]',
		usage: 'prompt',
		cooldowns: 0,
		aliases: ["snowai"],
		cooldown: 0,
	},

	onStart: async function({ api, event, args }) {
		const uid = event.senderID;
		const userNames = await getUserNames(api, uid);
		const user = args.join(" ");

		try {
			if (!user) { 
				return api.sendMessage("Please provide a question first!", event.threadID, event.messageID);
			}

			const searchMessage = await api.sendMessage(`🔍 Searching Please Wait...`, event.threadID);
			const response = await axios.get(`https://ai-1stclass-nemory-project.vercel.app/api/arctic?ask=${encodeURIComponent(user)}`);
			const responseData = response.data;
			const content = formatFont(responseData.response);
			const bayot = `❄️ 𝗦𝗡𝗢𝗪𝗙𝗟𝗔𝗞𝗘𝗦 (𝐀𝐈)\n\n🖋️ Ans: '${content}'\n\n👤 Question Asked by: ${userNames.join(', ')}`;
			await api.sendMessage(bayot, event.threadID);

		} catch (err) {
			console.error(err);
			return api.sendMessage("An error occurred while processing your request.", event.threadID, event.messageID);
		}  
	}
};

const wrapper = new GoatWrapper(module.exports);
wrapper.applyNoPrefix({ allowPrefix: true });