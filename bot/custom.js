const { log } = global.utils;
const cron = require('node-cron');

module.exports = async function ({ api, threadModel, userModel, dashBoardModel, globalModel, threadsData, usersData, dashBoardData, globalData, getText }) {
	const minInterval = 5 * 60 * 1000; // Minimum interval in milliseconds
	let lastMessageTime = 0;
	let messagedThreads = new Set();

	const configCustom = {
		autoRestart: {
			status: true,
			time: 30, // 40 minutes
			note: 'To avoid problems, enable periodic bot restarts'
		},
		acceptPending: {
			status: true,
			time: 1, // 1 minute
			note: 'Approve waiting messages after a certain time'
		}
	};

	function autoRestart(config) {
		if (config.status) {
			cron.schedule(`*/${config.time} * * * *`, () => {
				log('Start rebooting the system!', "[ Auto Restart ]");
				process.exit(1);
			});
		}
	}

	setInterval(async () => {
		api.refreshFb_dtsg()
			.then(() => {
				log.success("refreshFb_dtsg", getText("custom", "refreshedFb_dtsg"));
			})
			.catch((err) => {
				log.error("refreshFb_dtsg", getText("custom", "refreshedFb_dtsgError"), err);
			});
	}, 1000 * 60 * 60 * 48); // 48h
};