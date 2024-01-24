const axios = require('axios');

module.exports = {
	config: {
		name: "taylorquote",
		aliases: ["taylorquote"],
		version: "1.0",
		author: "JUNMAR",
		countDown: 5,
		role: 0,
		shortDescription: "quote",
		longDescription: "quote",
		category: "fun",
		guide: {
			en: "{pn}"
		},
	},

	onStart: async function ({ message, args, api, event }) {
	let { threadID, messageID } = event;
	try {
		const res = await axios.get(`https://taylorswiftapi.onrender.com/get`);
		const respond = res.data.quote;
		const respond2 = res.data.song;
		const respond3 = res.data.album;
		const respond4 = `Quote: “${respond}”\nSong: ${respond2}\nAlbum: ${respond3}`;
		api.sendMessage(respond4, threadID, messageID);
	} catch (error) {
		api.sendMessage("Error occurred while fetching data from the Taylor API.", threadID, messageID);
	}
}
};