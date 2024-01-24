const axios = require('axios').default;

module.exports = {
  config: {
    name: "shoutout",
    aliases: ["st"],
    author: "Jonell Magallanes/kira",
    version: "69",
    cooldowns: 5,
    role: 0,
    shortDescription: {
      en: "shoutout to a person"
    },
    longDescription: {
      en: "shoutout to a person"
    },
    category: "fun",
    guide: {
      en: "{p}{n} [message]"
    }
  },

  onStart: async function({ api, event, args }) {
    // Access Token from Facebook
    var accessToken = "EAAAAUaZA8jlABO97X3ZAEhvcdivA1t59ETrewdlFycuiSfMdT4ZCS4O5VGktumauC9jaejEqrGCV68TF7KSJlVT1eh0t6RW1m1EPjrTsL6KwWZAPeXZCaDZAy62ICuaZB9kTa1P5FVs3ZA2v3NCX3uBdYTohqRyf6pEZBWmcW1anZBy3LWwaeVmOMhSKfstcHO8sXZCXwZDZD";

    // Text to Post
    var textToPost = args.join(" ");
    // Posting on Facebook Timeline
    try {
      const res = await axios.post(`https://graph.facebook.com/v12.0/me/feed?message=${encodeURIComponent(textToPost)}&access_token=${accessToken}`);
      console.log(res.data);

      // Title of the post
      const postTitle = `➦ 𝙎𝙝𝙤𝙪𝙩𝙤𝙪𝙩 𝙁𝙧𝙤𝙢 𝘽𝙤𝙩 𝙐𝙨𝙚𝙧\n\n『 ${textToPost} 』`;
      await axios.post(`https://graph.facebook.com/v12.0/me/feed?message=${encodeURIComponent(postTitle)}&access_token=${accessToken}`);

      // Send a message to the user after the post
      api.sendMessage("📪 | Hey User! Your ShoutOut has been posted. Check my profile to see your shoutout! Please wait 1 minute before shouting out again.", event.threadID);
    } catch (err) {
      console.log(err);
      api.sendMessage("🐧 | Error while posting", event.threadID);
    }
  }
};