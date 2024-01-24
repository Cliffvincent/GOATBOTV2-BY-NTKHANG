const axios = require("axios");
const s = require("srtn");

module.exports = {
 config: {
 name: "dalle",
 role: 0,
 },
 onStart: async function ({ message, api, args, event }) {
 const text = args.join(' ');
 const [prompt, model] = text.split('|').map((text) => text.trim());
 let puti = model || "2";
 const lado = `https://sandyapi.otinxsandeep.repl.co/dalle`;

 const pp = await s.shorten(lado);

 message.reply({
 body: `${pp}`,
 attachment: await global.utils.getStreamFromURL(lado),
 });
 }
};