const axios = require('axios');
const fs = require('fs-extra');

module.exports = {
config: {
  name: "igdl",
  aurthor:"shiki/zed",// Convert By Goatbot Zed
   role: 0,
  shortDescription: " ",
  longDescription: "",
  category: "media",
  guide: "{pn}igdl"
},

  onStart: async function ({ api, event, args }) {
  const link = args[0];

  if (!link || !link.startsWith("https://www.instagram.com/")) {
    api.sendMessage("Please provide a valid Instagram link.", event.threadID, event.messageID);
    return;
  }

  api.sendMessage("⏳ | Downloading Video, Please Wait...", event.threadID, event.messageID);

  try {
    const response = await axios.get(`https://instagramdl.hayih59124.repl.co/instagram?url=${encodeURIComponent(link)}`);
    const result = response.data.result[0];
    const videoURL = result._url;
    const path = __dirname + `/cache/instagram_video.mp4`;

    const videoData = (await axios.get(videoURL, { responseType: "arraybuffer" })).data;
    fs.writeFileSync(path, Buffer.from(videoData, 'utf-8'));

    api.sendMessage({
      body: "Here's your video",
      attachment: fs.createReadStream(path)
    }, event.threadID, () => fs.unlinkSync(path), event.messageID);
  } catch (error) {
    api.sendMessage(`Error fetching Instagram video: ${error}`, event.threadID, event.messageID);
  }
},
};