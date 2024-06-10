const a = require("axios"),
	t = require("tinyurl");

global.api = {
s: "https://apis-samir.onrender.com"
};

const fm = {
' ': ' ',
'a': '𝐚', 'b': '𝐛', 'c': '𝐜', 'd': '𝐝', 'e': '𝐞', 'f': '𝐟', 'g': '𝐠', 'h': '𝐡',
'i': '𝐢', 'j': '𝐣', 'k': '𝐤', 'l': '𝐥', 'm': '𝐦', 'n': '𝐧', 'o': '𝐨', 'p': '𝐩', 'q': '𝐪',
'r': '𝐫', 's': '𝐬', 't': '𝐭', 'u': '𝐮', 'v': '𝐯', 'w': '𝐰', 'x': '𝐱', 'y': '𝐲', 'z': '𝐳',
'A': '𝐀', 'B': '𝐁', 'C': '𝐂', 'D': '𝐃', 'E': '𝐄', 'F': '𝐅', 'G': '𝐆', 'H': '𝐇',
'I': '𝐈', 'J': '𝐉', 'K': '𝐊', 'L': '𝐋', 'M': '𝐌', 'N': '𝐍', 'O': '𝐎', 'P': '𝐏', 'Q': '𝐐',
'R': '𝐑', 'S': '𝐒', 'T': '𝐓', 'U': '𝐔', 'V': '𝐕', 'W': '𝐖', 'X': '𝐗', 'Y': '𝐘', 'Z': '𝐙',
};

function ctf(t) {
let ct = '';
for (let c of t) {
ct += fm[c] || c;
}
return ct;
}

function cba(t) {
return t.replace(/\*(.*?)\*/g, (m, p1) => ctf(p1));
}

module.exports = {
config: {
name: "gemini",
aliases: ["bard"],
version: "1.0",
author: "Samir OE",
countDown: 5,
role: 0,
category: "𝗔𝗜"
},
onStart: async function({
message: m,
event: e,
args: r,
commandName: n
}) {
try {
	let s;
	const i = e.senderID;
	if ("message_reply" === e.type && ["photo", "sticker"].includes(e.messageReply.attachments?.[0]?.type)) {
		s = await t.shorten(e.messageReply.attachments[0].url);
	} else {
		const o = r.join(" "),
					c = await a.get(`${global.api.s}/Gemini?text=${encodeURIComponent(o)}&uid=${i}`);
		if (c.data && c.data.candidates && c.data.candidates.length > 0) {
			const t = c.data.candidates[0].content.parts[0].text,
						e = `${cba(t)}`;
			m.reply({
				body: e
			}, (r, o) => {
				global.GoatBot.onReply.set(o.messageID, {
					commandName: n,
					messageID: o.messageID,
					author: i
				})
			})
		}
	}
	if (!s) return void console.error("Error: Invalid message or attachment type");
	const d = `${global.api.s}/telegraph?url=${encodeURIComponent(s)}&senderId=${i}`,
				p = await a.get(d),
				u = p.data.result.link,
				o = r.join(" "),
				f = `${global.api.s}/gemini-pro?text=${encodeURIComponent(o)}&url=${encodeURIComponent(u)}`;
	m.reply({
		body: (await a.get(f)).data
	})
} catch (t) {
	console.error("Error:", t.message)
}
},
onReply: async function({
message: m,
event: e,
Reply: r,
args: n
}) {
try {
	let {
		author: o,
		commandName: c
	} = r;
	if (e.senderID !== o) return;
	const i = n.join(" "),
				d = await a.get(`${global.api.s}/Gemini?text=${encodeURIComponent(i)}&uid=${e.senderID}`);
	if (d.data && d.data.candidates && d.data.candidates.length > 0) {
		const t = d.data.candidates[0].content.parts[0].text,
					r = `${cba(t)}`;
		m.reply({
			body: r
		}, (t, n) => {
			global.GoatBot.onReply.set(n.messageID, {
				commandName: c,
				messageID: n.messageID,
				author: e.senderID
			})
		})
	}
} catch (t) {
	console.error("Error:", t.message)
}
}
}