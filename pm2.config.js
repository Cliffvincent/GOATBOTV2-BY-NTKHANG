// pm2.config.js
module.exports = {
	script: 'index.js',
	watch: true,
	ignore_watch: ['node_modules', 'logs'],
	watch_delay: 500,
	env: {
		NODE_ENV: 'production',
	},
};
