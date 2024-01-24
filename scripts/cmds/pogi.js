module.exports = {
	config: {
			name: "pogi",
			version: "1.0",
			author: "Jaychris Garcia",
			countDown: 5,
			role: 0,
			shortDescription: "No Prefix",
			longDescription: "No Prefix",
			category: "reply",
	},
onStart: async function(){}, 
onChat: async function({
	event,
	message,
	getLang
}) {
	if (event.body && event.body.toLowerCase() == "pogi") return message.reply("pogi mo talaga par. btw, bakit mukha kang paa?");
}
};