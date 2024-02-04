const fs = require('fs');
const moment = require('moment-timezone');
const cron = require('node-cron');

module.exports = {
		config: {
				name: "autorestart",
				version: "1.1.0",
				author: "NTKhang",
				description: "Loop to all event in global.GoatBot.onEvent and run when have a new event",
				category: "events"
		},

		onLoad: function ({ api }) {
				const pathFile = `${__dirname}/tmp/restart.txt`;
				if (fs.existsSync(pathFile)) {
						const [tid, time] = fs.readFileSync(pathFile, "utf-8").split(" ");
						api.sendMessage(`✅ | Bot restarted\n⏰ | Time: ${(Date.now() - time) / 1000}s`, tid);
						fs.unlinkSync(pathFile);
				}

				cron.schedule('*/30 * * * *', () => {
						const restartTime = moment().tz('YourTimeZone').format('YYYY-MM-DD HH:mm:ss');
						fs.writeFileSync(pathFile, `${api.getCurrentUserID()} ${restartTime}`);
						process.exit(2);
				});
		},

		onStart: async function ({ message, event, getLang }) {
				const pathFile = `${__dirname}/tmp/restart.txt`;
				fs.writeFileSync(pathFile, `${event.threadID} ${Date.now()}`);
				await message.reply(getLang("Restarting"));
				process.exit(2);
		}
};
