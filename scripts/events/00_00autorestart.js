const { getTime } = global.utils;
const cron = require('node-cron');
const exec = require('child_process').exec;

module.exports = {
	config: {
		name: "autorestart",
		version: "1.4",
		author: "NTKhang",
		description: "autorestart for being active 24/7",
		category: "events"
	},

	onStart: async function () {
		// Set up a cron job to restart every 20 minutes
		cron.schedule('*/60 * * * *', () => {
			console.log(`[${getTime()}] Autorestart - Restarting Goatbot...`);
			exec('node index.js', (error, stdout, stderr) => {
				if (error) {
					console.error(`[${getTime()}] Autorestart - Error during restart: ${error.message}`);
					return;
				}
				console.log(`[${getTime()}] Autorestart - Goatbot restarted successfully`);
			});
		});
	},
};
