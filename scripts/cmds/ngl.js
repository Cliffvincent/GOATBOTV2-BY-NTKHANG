const axios = require('axios');

module.exports = {
  config: {
    name: "ngl",
    aurthor:"?/zed",// Convert By Goatbot Zed
     role: 2,
    shortDescription: " ",
    longDescription: "",
    category: "love",
    guide: "{pn}"
  },

onStart: async function ({ api, event, args }) {
  try {
    if (args.length < 3) {
      api.sendMessage('[ NGL ] Insufficient arguments. Usage: ?ngl [username] [message] [amount]', event.threadID);
      return;
    }

    const username = args.shift();
    const message = args.slice(0, -1).join(" "); 
    const spamCount = parseInt(args[args.length - 1]); 

    if (isNaN(spamCount) || spamCount <= 0) {
      api.sendMessage('[ NGL ] Invalid amount. Please provide a valid positive number.', event.threadID);
      return;
    }

    console.log(`[ NGL ] Spamming To : ${username}`);
    for (let i = 0; i < spamCount; i++) {
      const response = await axios.post('https://ngl.link/api/submit', {
        username: username,
        question: message,
        deviceId: '23d7346e-7d22-4256-80f3-dd4ce3fd8878',
        gameSlug: '',
        referrer: '',
      });

      console.log(`[ NGL ] Message ${i + 1}: Status - ${response.status}`);
    }

    api.sendMessage(`[ NGL ] Successfully spammed ${spamCount} times to ${username}`, event.threadID);
  } catch (error) {
    console.error('[ NGL ] Error:', error);
    api.sendMessage('[ NGL ] Error: ' + error.message, event.threadID);
  }
},
};
