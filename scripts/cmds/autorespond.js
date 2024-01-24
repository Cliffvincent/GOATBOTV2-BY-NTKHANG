module.exports = {
config: {
name: "autorespondv3",
version: "2.0.0",
author: "Haru",
cooldown: 5,
role: 0,
shortDescription: "Autoresponds with reactions and replies",
longDescription: "Autoresponds with reactions and replies based on specific words or triggers.",
category: "fun",
guide: "?autorespondv3",
},
onStart: async ({ api, event }) => {
// Blank onStart function as per the request
},
onChat: async ({ api, event }) => {
const { body, messageID, threadID } = event;

// Reactions based on words
const emojis = {
"💜": ["Cliff", "August", "Jonell", "David", "purple", "Fritz", "Sab", "Haru", "Xuazane", "Kim"],
"💚": ["dia", "seyj", "ginanun", "gaganunin", "pfft", "xyrene", "gumanun"],
"😾": ["Jo", "Ariii", "talong", "galit"],
"😼": ["wtf", "fck", "haaays", "naku", "ngi ", "ngek", "nge ", "luh", "lah"],
"😸": ["pill", "laugh", "lt ", "gagi", "huy", "hoy"],
"🌀": ["prodia", "sdxl", "bardv3", "tanongv2", "-imagine", "genimg", "Tanongv4", "kamla", "-shortcut"],
"👋": ["hi ", "hello", "salut","bjr","bonjour"," Salut","👋","bonsoir","slt"],
"🔥": ["🔥", ".jpg", "astig", "damn", "angas", "galing", "husay"],"💩":["merde","Merde","caca","Caca","shit"],"🤢":["beurk",
			"dégueulasse",
			"dégeu",
			"horrible"
		],"🌸": [
			"amour",
			"câlin",
			"tendresse",
			"gentillesse",
			"bienveillance",
			"douceur",
			"complicité",
			"gratitude",
			"bonheur",
			"amitié"
		],
		"😂": [
			"Ridicule",
			"Clownesque",
			"Farce",
			"Pitrerie",
			"Comique",
			"Drôle",
			"Amusant",
			"Hilarant",
			"Loufoque",
			"Bouffonnerie",
			"Cocasse",
			"Burlesque",
			"Rigolo",
			"Absurde",
			"Irrévérencieux",
			"Ironique",
			"Ironie",
			"Parodie",
			"Esprit",
			"Facétieux"
		],
		"😎": [
			"cool","formidable"," 😎"
		],
		"⚡": [
			"Super",
			"Aesther"
		],
		"🤖": [
			"Prefix","robot"
		],
		"🔰": [
			"Nathan","barro"
		],
		"✔️": [
			"Bien",
			"ok"
		],
		"🎉": [
			"congrats",
			"félicitation",
			"Goddess-Anaïs"
		],
		"😆": [
			"xD"
		],
		"♻️": [
			"restart"
		],
		"🖕": [
			"fuck","enculer","fdp","🖕"
		],
		"🌀": [
			"imagine","prodia","textpro","photofy"
		],
		"🌼": [
			"Goddess-Anaïs"
		],
		"😑": [
			"mmmh",
			"kiii"
		],
		"💍": [
			"Aesther"
		],
		"💵": [
			"Anjara"
		],
		"😝": [
			"Anjara"
		],
		"✨": [
			"oui","super"
		],
		"✖️": [
			"wrong",
			"faux"
		],
		"😽": [
			"araara"
		],
		"🤡": [
			"Kindly provide the question","clone"," sanchokuin","bakugo"
		],
		"😕": [
			"bruh"
		],
		"👎": [
			"Kindly provide"
		],
		"🌩️": [
			"*thea",
			"Tatakae",
			"Damare"
		],
	"🤢": [
			"vomir"
		],
	"🔪": [
			"tué"
		],
};

// Replies to specific words
const replies = {"loft":"~~𝙾𝚞𝚒 ?? 🙃🌷"
};

// React based on words
for (const [emoji, words] of Object.entries(emojis)) {
for (const word of words) {
if (body.toLowerCase().includes(word)) {
api.setMessageReaction(emoji, messageID, () => {}, true);
}
}
}

// Reply based on triggers
for (const [trigger, reply] of Object.entries(replies)) {
if (body.toLowerCase().includes(trigger)) {
api.sendMessage(reply, threadID, messageID);
}
}
},
};