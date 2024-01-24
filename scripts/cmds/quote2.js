const axios = require("axios");

module.exports = {
 config: {
 name: "quote2",
 version: "1.0",
 author: "Samir",
 countDown: 5,
 role: 0,
 shortDescription: "Get anime quotes",
 longDescription: {
 en: "get quotes."
 },
 category: "anime",
 guide: {
 en: "{pn}"
 }
 },

 onStart: async function ({ api, event, args, message }) {
 try { 
 const response = await axios.get(`https://milanbhandari.imageapi.repl.co/quote`, {
 params: {
 apikey: 'xyzmilan',
 }
 });
 const message = `From: ${response.data.anime}\n\nQuote: ${response.data.quote}\n\nBy: ${response.data.character}`;
 return api.sendMessage(message, event.threadID);
 } catch (error) {
 console.error(error);
 }
 }
};