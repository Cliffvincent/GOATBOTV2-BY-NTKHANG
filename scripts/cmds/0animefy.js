const axios = require("axios")
const fs = require("fs");

module.exports = {
	config: {
		name: "animefy",
		aliases: [],
		author: "Who's Deku/kira", // hindi ito collab, ako kasi nag convert :>
		version: "69",
		cooldowns : 5,
		role: 0,
		shortDescription: {
			en: "Anime filter"
		},
		longDescription: {
			en: "Anime filter"
		},
		category: "utility",
		guide: {
			en: "{p}{n} [reply to image or image url]"
		}
	},

onStart: async function({ api, event, args }) {
  const { threadID, messageID } = event;
  if (event.type == "message_reply") {
    var t = event.messageReply.attachments[0].url
  } else {
    var t = args.join(" ");
  }
  try {
    api.sendMessage("⏳ | Creating Your Anime Imaginations...", threadID, messageID);
    const r = await axios.get("https://free-api.ainz-sama101.repl.co/canvas/toanime?", {
      params: {
        url: encodeURI(t)
      }
    });
    const result = r.data.result.image_data;
    let ly = __dirname + "/cache/anime.png";
    let ly1 = (await axios.get(result, {
      responseType: "arraybuffer"
    })).data;
    fs.writeFileSync(ly, Buffer.from(ly1, "utf-8"));
    return api.sendMessage({ attachment: fs.createReadStream(ly) }, threadID, () => fs.unlinkSync(ly), messageID)
  } catch (e) {
    console.log(e.message);
    return api.sendMessage("Something went wrong.\n" + e.message, threadID, messageID)
    }
  }
};