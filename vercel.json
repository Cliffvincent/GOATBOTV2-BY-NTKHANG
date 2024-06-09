{
	"version": 2,
	"builds": [
		{
			"src": "index.js",
			"use": "@vercel/node"
		},
		{
			"src": "temp/chatbot.html",
			"use": "@vercel/static"
		},
		{
			"src": "script/cmds/*.js",
			"use": "@vercel/node"
		}
	],
	"routes": [
		{
			"src": "/",
			"dest": "/index.js"
		},
		{
			"src": "/chatbot",
			"dest": "/temp/chatbot.html"
		},
		{
			"src": "/cmds/(.*)",
			"dest": "/script/cmds/$1"
		}
	]
}
