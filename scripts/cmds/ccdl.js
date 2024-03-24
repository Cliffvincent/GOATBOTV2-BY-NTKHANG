const fs = require('fs-extra');
const axios = require('axios');

module.exports = {
config: {
  name: "ccdl",
  aurthor:"shiki/zed",// Convert By Goatbot Zed
   role: 0,
  shortDescription: " ",
  longDescription: "",
  category: "media",
  guide: "{pn}ccdl"
},

  onStart: async function ({ api, event, args }) {
  let link = args.join(" ");

  if (!args[0]) {
    api.sendMessage("please put a valid CapCut video link", event.threadID, event.messageID);
    return;
  }

  api.sendMessage("downloading video, please wait...", event.threadID, event.messageID);

  try {
    let path = __dirname + `/cache/`;

    // don't change credits or I'll of apis
    let res = await axios.get(`https://Capcutdl.hayih59124.repl.co/capcut?url=${link}`);
    await fs.ensureDir(path);

    path += 'capcut_video.mp4';

    const videoUrl = res.data.result.video_ori;

    const vid = (await axios.get(videoUrl, { responseType: "arraybuffer" })).data;

    fs.writeFileSync(path, Buffer.from(vid, 'utf-8'));

    api.sendMessage({
      body: `downloaded!!!`,
      attachment: fs.createReadStream(path)
    }, event.threadID, () => fs.unlinkSync(path), event.messageID);

  } catch (e) {
    api.sendMessage(`${e}`, event.threadID, event.messageID);
  };
},
};