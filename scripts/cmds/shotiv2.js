const axios = require("axios");
const fs = require("fs");
const request = require("request");

module.exports = {
  config: {
    name: "shoti2",
    version: "1.0",
    author: "Ronald Allen Albania",
    countDown: 20,
    category: "chatbox",
  },

  langs: {
    vi: {},
    en: {},
  },

  onStart: async function ({ api, event }) {
    api.sendMessage("Sending Shoti Vid Please Wait...", event.threadID);

    try {
      let response = await axios.post(
        "https://api--v1-shoti.vercel.app/api/v1/get",
        {
          apikey: "shoti-1ha4h3do8at9a7ponr",
        },
      );

      if (
        response.data.code === 200 &&
        response.data.data &&
        response.data.data.url
      ) {
        const videoUrl = response.data.data.url;
        const filePath = __dirname + "/cache/shoti.mp4";
        const file = fs.createWriteStream(filePath);
        const rqs = request(encodeURI(videoUrl));

        rqs.pipe(file);

        file.on("finish", async () => {
          const userInfo = response.data.data.user;
          const username = userInfo.username;
          const nickname = userInfo.nickname;

          await api.sendMessage(
            {
              attachment: fs.createReadStream(filePath),
            },
            event.threadID,
          );
          api.sendMessage(
            `Username: @${username}\nNickname: ${nickname}`,
            event.threadID,
          );
        });
      } else {
        api.sendMessage(
          "No video URL found in the API response.",
          event.threadID,
        );
      }
    } catch (error) {
      console.error(error);
      api.sendMessage(
        "An error occurred while fetching the video.",
        event.threadID,
      );
    }
  },
};