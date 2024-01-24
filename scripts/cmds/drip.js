module.exports = {
  config: {
    name: "drip",
    aliases: [],
    version: "1.0",
    author: "kshitiz",
    shortDescription: "",
    longDescription: "",
    category: "fun",
    guide: "{pn} @mention/reply"
  },

  async onStart({ api, event, usersData }) {
    try {
      let imageLink = "";

      if (event.type === "message_reply" && event.messageReply) {

        imageLink = await usersData.getAvatarUrl(event.messageReply.senderID);
      } else {
       avatar
        imageLink = await usersData.getAvatarUrl(event.senderID);
      }

      const gifURL = `https://api.popcat.xyz/drip?image=${encodeURIComponent(imageLink)}`;

      const message = {
        body: "you can't handle my richness🤑",
        attachment: [await global.utils.getStreamFromURL(gifURL)]
      };

      api.sendMessage(message, event.threadID, event.messageID);
    } catch (err) {
      console.error(err);
      api.sendMessage("Please mention or reply to someone", event.threadID, event.messageID);
    }
  }
};