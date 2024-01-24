const axios = require('axios');

const bitlyToken = 'ee891aaa3d51db956a8e1c0bdc116cf2e7df839d';

module.exports = {
config : {
  name: "bit.ly",
  version: "1.0.0",
  author: "blake Cyphrus",
longDescription: {
en: "Shorten a link using Bitly"},
  shortDescription: {
en: "Shorten a link using Bitly"},
  commandCategory: "general",
  usages: "<link>",
  countDowns: 10,
  role: 0,
},

onStart : async function({ api, event, args }) {
  if (args.length < 1) {
    return api.sendMessage("Please provide a link to shorten.", event.threadID, event.messageID);
  }

  const originalLink = args[0];

  
  api.sendMessage("⌛| Processing your request... Your link will be shortened in a few seconds. Please wait...", event.threadID);

  // Simulate a delay (10 seconds).
  await new Promise((resolve) => setTimeout(resolve, 10000));

  try {
    const response = await axios.post('https://api-ssl.bitly.com/v4/shorten', {
      long_url: originalLink,
    }, {
      headers: {
        'Authorization': `Bearer ${bitlyToken}`,
        'Content-Type': 'application/json',
      },
    });

    const shortenedLink = response.data.link;
    api.sendMessage(`✅ | 🔗 Shortened Link: \n\n ${shortenedLink}`, event.threadID);
  } catch (error) {
    console.error(error);
    api.sendMessage("An error occurred while shortening the link. Please try again later.", event.threadID);
  }
},
};