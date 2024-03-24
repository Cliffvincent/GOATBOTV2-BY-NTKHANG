const axios = require("axios");

module.exports = {
config: {
		name: "matrix",
		version: "1.0",
		author: "Samir",
		countDown: 5,
		role: 0,
		shortDescription: "Write Matrix Text Through textpro.me",
		longDescription: "Write Matrix Text Through textpro.me",
		category: "textpro",
		guide: {
			en: "{p}{n} query",
		}
	},

 onStart: async function ({ api, event, args, message }) {
 try { 
 const samir = args.join(' ');
 const response = await axios.get(`https://tanjiro-api.onrender.com/textpro?text=${samir}&&link=https://textpro.me/matrix-style-text-effect-online-884.html&api_key=tanjiro`);

 const message = {attachment:await global.utils.getStreamFromURL(response.data.result)};
 return api.sendMessage(message, event.threadID);
 } catch (error) {
 console.error(error);
 message.reply("An error occurred while fetching response");
 }
 }
};