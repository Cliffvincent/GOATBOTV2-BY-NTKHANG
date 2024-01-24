const express = require('express');
const app = express();
const axios = require('axios');
const PORT = 3000;

app.get('/watch', async (req, res) => {
	try {
		const cookies = {
			session: 'XBCUZTwUtXRA2oeS1C6esg3q',
			_csrf: 'v2%3Bclient_version%3A2390%3Btimestamp%3A1704634205',
			connect: '10%3AmvexvsuW6SkNUw%3A2%3A1704522377%3A-1%3A8071'
		};

		const headers = {
			'Cookie': Object.keys(cookies).map(key => `${key}=${cookies[key]}`).join('; ')
		};

		const response = await axios.get('https://replit.com/@cliffvincentvto/GOATBOT~V2', { headers });
		// Check the response
		console.log(response.data);
	} catch (error) {
		console.error(error);
	}
	res.send('Watching');
});

app.get('/like', async (req, res) => {
	try {
		const cookies = {
			session: 'your_session_cookie',
			_csrf: 'your_csrf_cookie',
			connect.sid: 'your_connect_sid_cookie'
		};

		const headers = {
			'Cookie': Object.keys(cookies).map(key => `${key}=${cookies[key]}`).join('; ')
		};

		const response = await axios.post('https://replit.com/like/@cliffvincentvto/GOATBOT~V2', {}, { headers });

		console.log(response.data);
	} catch (error) {
		console.error(error);
	}
	res.send('Liking');
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});