module.exports = {
config: {
name: "autorespondv2",
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
"🌸": ["Ritsu", "Princess", "sanchokuin", "Goddess", "Anaïs", "Barro", "Tsiaro", "Kazu", "Thea", "Aesther"],
"💚": ["jolie", "belle", "beau", "gaganunin", "pfft", "xyrene", "fantastique"],
"😾": ["🤨", "nooo", "talong", "galit"],
"😼": ["wtf", "fck", "haaays", "stfu", "ngi ", "ngek", "nge ", "luh", "lah"],
"😸": ["pill", "laugh", "lt ", "blague", "huy", "hoy"],
"⏳": ["prodia", "sdxl", "bardv3", "tanongv2", "-imagine", "genimg", "Tanongv4", "kamla", "-shortcut"],
"👋": ["salut", "bonjour", "c v"],
"🌊": ["ok", "cool", "bien", "super", "d'accord", "génial", "merveille"],
};

// Replies to specific words
const replies = {
"Bye": "A+ tard 🌸😘...",
"muaah": "💋🌷 bisous ",
"kaiz": "De aona ? ",
"who is you lover ?": "𝗧𝗛𝗘𝗔🌷 𝗶𝘀 𝗺𝘆 𝗘𝘃𝗲𝗿𝘆𝘁𝗵𝗶𝗻𝗴🌸"};

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