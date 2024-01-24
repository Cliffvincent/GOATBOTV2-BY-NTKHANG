const http = require('http');

// Simple HTTP server
const server = http.createServer((req, res) => {
	res.writeHead(200, { 'Content-Type': 'text/plain' });
	res.end('Hello, world!\n');
});

const PORT = process.env.PORT || 3000;

// Start server
server.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});

// If you want to use forever
const forever = require('forever-monitor');

const foreverOptions = {
	command: 'node',
	args: ['index.js'],
	silent: false,
	minUptime: 1000,
	spinSleepTime: 1000,
};

const foreverProcess = new forever.Monitor(foreverOptions);

foreverProcess.on('exit', () => {
	console.log('Forever process has exited, restarting...');
	foreverProcess.start();
});

foreverProcess.start();

// If you want to use pm2
const { spawn } = require('child_process');

const pm2Process = spawn('pm2', ['start', 'index.js', '--name', 'your-app']);

pm2Process.stdout.on('data', (data) => {
	console.log(`pm2 stdout: ${data}`);
});

pm2Process.stderr.on('data', (data) => {
	console.error(`pm2 stderr: ${data}`);
});

pm2Process.on('close', (code) => {
	console.log(`pm2 process closed with code ${code}, restarting...`);
	// You might want to add logic here to restart the process
});
