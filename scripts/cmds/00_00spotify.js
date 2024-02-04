const { get } = require("axios");
const { getPrefix, getStreamFromUrl } = global.utils;

module.exports = {
	config: {
		name: "spotify",
		version: "1.3",
		author: "Jun Jaam",
		countDown: 0,
		role: 0,
		shortDescription: "download Spotify",
		longDescription: "",
		category: "media",
		guide: {
			en: "{pn} title or Spotify link"
		}
	},

	onStart: async function ({ message, args, event }) {
		let q = args.join(" ");
		if (!q) {
			return message.reply("Please add a title or Spotify link.\nExample: " +
				`${await getPrefix(event.threadID)}${this.config.name} <title> or <Spotify link>`);
		}

		if (q.includes("spotify.com")) {
			const ok = /^https:\/\/open\.spotify\.com\/track\/[a-zA-Z0-9]+\?[a-zA-Z0-9\-_=&]+$/i;
			if (ok.test(q)) {
				try {
					const sptf = await get(`https://test-ai-ihc6.onrender.com/mid/spotify-v2?url=${q}`);
					const { av, result } = sptf.data;
					const dl = await message.reply("Downloading the track, please wait...");
					message.reply({
						body: result,
						attachment: await getStreamFromUrl(av)
					});
					message.unsend(dl.messageID);
				} catch (error) {
					return message.reply(error);
				}
			} else {
				return message.reply("Please enter a valid Spotify URL");
			}
		} else {
			const emj = ["👍", "😮", "😆", "😢", "❤"];
			try {
				const res = await get(`https://api-samir.onrender.com/spotifysearch?q=${q}`);
				const r = res.data.data.slice(0, 5);
				let result = "";
				r.forEach((d, i) => {
					const { title, imageUrl, popularity, artist, genres, releaseDate, duration } = d;
					result += `${i + 1}.${emj[i]} Title: ${title}\nPopularity: ${popularity}\nArtist: ${artist.join(", ")}\nRelease Date: ${releaseDate}\nGenre: ${genres.join(", ")}\nDuration: ${duration}\n\n`;
				});

				const spotimg = r.map(j => j.imageUrl);
				const _ = await Promise.all(spotimg.map(async url => await getStreamFromUrl(url)));
				const info = await message.reply({
					body: "React only to download the track\n\n" + result,
					attachment: _
				});

				const n = {
					commandName: this.config.name,
					author: event.senderID,
					"👍": r[0].url,
					"😮": r[1].url,
					"😆": r[2].url,
					"😢": r[3].url,
					"❤": r[4].url,
					spoti: false,
					d: info
				};

				global.GoatBot.onReaction.set(info.messageID, n);
			} catch (error) {
				return message.reply(error);
			}
		}
	},

	onReaction: async function ({ message, event, Reaction }) {
		const { author, spoti, d } = Reaction;
		if (event.userID !== author || spoti) return;

		const e = event.reaction;
		if (e in Reaction) {
			message.unsend(d.messageID);
			const bsk = await message.reply("Downloading, please wait");
			const track = Reaction[e];

			try {
				const sptf = await get(`https://test-ai-ihc6.onrender.com/mid/spotify-v2?url=${track}`);
				const { av, result } = sptf.data;
				message.reply({
					body: result,
					attachment: await getStreamFromUrl(av)
				});
				message.unsend(bsk.messageID);
			} catch (error) {
				return message.reply(error);
			}
		}
	}
};
