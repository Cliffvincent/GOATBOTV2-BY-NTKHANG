var cred = "Samuel";
const axios = require("axios");

module.exports = {
		config: {
				name: "stalk",
				version: "1.0",
				author: "Samuel",
				countDown: 5,
				role: 0,
				shortDescription: "",
				longDescription: {
						en: ""
				},
				category: "",
				guide: {
						en: "{pn}"
				},
				credits: "Samuel"
		},
		onStart: async function({ api, event, Thread,args }) {
				try {
						const fs = global.goat["fs-extra"];
						const request = global.goat["request"];
						const { threadID, senderID, messageID } = event;
						if (module.config.credits !== `${cred}`) {
								return api.sendMessage(`Please change the credits to Samuel.`, threadID, messageID);
						}
						let id;
						if (args.join().indexOf('@') !== -1) {
								id = Object.keys(event.mentions);
						} else {
								id = args[0] || senderID;
						}
						if (event.type === "message_reply") {
								id = event.messageReply.senderID;
						} else if (args.join().indexOf(".com/") !== -1) {
								const res = await axios.get(`https://api.reikomods.repl.co/sus/fuid?link=${args.join(" ")}`);
								id = res.data.result;
						}
						const res = await api.getUserInfo(id);
						const gender = res.gender === 'male' ? "Male" : res.gender === 'female' ? "Female" : "Not found";
						const birthday = res.birthday === 'No Data' ? "Not found" : res.birthday;
						const love = res.relationship_status === 'No Data' ? "Not found" : res.relationship_status;
						const location = res.location === 'No Data' ? "Not Found" : res.location.name;
						const hometown = res.hometown === 'No Data' ? "Not found" : res.hometown.name;
						const follow = res.follow === 'No Data' ? "Not Found" : res.follow;
						const usern = res.username === 'No Data' ? res.id : res.username;
						const usern1 = res.username === 'No Data' ? "Not Found" : res.username;
						const rs = res.love === 'No Data' ? "None" : res.love.name;
						const callback = function() {
								return api.sendMessage({
										body: `•——[INFORMATION]——•
Name: ${res.name}
Facebook URL: https://facebook.com/${usern}
Username: ${usern}
Birthday: ${birthday}
Followers: ${follow}
Gender: ${gender}
UID: ${res.id}
Location: ${location}
Hometown: ${hometown}
Relationship Status: ${love}
In relationship with: ${rs}
•——[INFORMATION]——•`,
										attachment: fs.createReadStream(__dirname + `/cache/image.png`)
								}, threadID, () => fs.unlinkSync(__dirname + `/cache/image.png`), messageID);
						};
						return request(encodeURI(res.avatar)).pipe(fs.createWriteStream(__dirname + `/cache/image.png`)).on("close", callback);
				} catch (err) {
						console.log(err);
						const { threadID } = event;
						return api.sendMessage(`Error`, threadID);
				}
		}
};