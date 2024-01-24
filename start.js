const { exec } = require('child_process');

const command = 'pm2 start app.js';

const startServer = () => {
	const child = exec(command);

	child.stdout.on('data', (data) => {
		console.log(`Server Output: ${data}`);
	});

	child.stderr.on('data', (data) => {
		console.error(`Server Error: ${data}`);
	});

	child.on('exit', (code) => {
		console.log(`Server exited with code ${code}. Restarting...`);
		startServer();
	});
};

startServer();