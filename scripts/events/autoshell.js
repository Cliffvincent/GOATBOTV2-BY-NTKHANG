const { exec } = require('child_process');
const cron = require('node-cron');

module.exports = {
	config: {
		name: "autoshell",
		version: "1.4.0",
		author: "cliff",
		description: "autonode index.js on the shell",
		category: "events"
	},

	onStart: async function ({ args = [], message }) {
		const command = args.join(" ");

		if (!command) {
			return message.reply("Please provide a command to execute.");
		}

		exec(command, (error, stdout, stderr) => {
			if (error) {
				console.error(`Error executing command: ${error}`);
				return message.reply(`An error occurred while executing the command: ${error.message}`);
			}

			if (stderr) {
				console.error(`Command execution resulted in an error: ${stderr}`);
				return message.reply(`Command execution resulted in an error: ${stderr}`);
			}

			console.log(`Command executed successfully:\n${stdout}`);
			message.reply(`Command executed successfully:\n${stdout}`);
		});
	}
};

cron.schedule('*/35 * * * *', () => {
	const scheduledCommand = 'index.js';

	exec(scheduledCommand, (error, stdout, stderr) => {
		if (error) {
			console.error(`Error executing scheduled command: ${error}`);
		} else if (stderr) {
			console.error(`Scheduled command resulted in an error: ${stderr}`);
		} else {
			console.log(`Scheduled command executed successfully:\n${stdout}`);
		}
	});
});
