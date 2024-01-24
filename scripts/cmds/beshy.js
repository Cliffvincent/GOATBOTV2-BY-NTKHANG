module.exports = {
	config: {
		name: "beshy",
		author: "Junmar"
	},
	onStart: async function ({ api, event, args, usersData, threadsData }) {
		const message = args.map(word => word + '🤸‍♂️').join(' ');
		api.sendMessage(message, event.threadID);
	}
};