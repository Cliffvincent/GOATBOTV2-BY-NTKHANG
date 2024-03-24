const axios = require('axios');
module.exports = {
  config: {
    name: "gname",
    aliases: ["gname"],
    version: "1.0",
    author: "kshitiz",
    countDown: 5,
    role: 0,
    shortDescription: "Predict your gender based on your name",
    longDescription: "Predict your gender based on your name",
    category: "meme",
    guide: {
      en: "{pn} [name]"
    },
  },

  onStart: async function ({ message, args, api, event }) {
    const axios = require("axios");
    let { messageID, threadID, senderID, body } = event;
    const name = args.join(" ");
    if (!name) return api.sendMessage(`Wrong Format. Use`, threadID, messageID);
    try {
      const res = await axios.get(`https://api.genderize.io?name=${name}`);
      const gender = res.data.gender;
      const namePredicted = res.data.name;
      const probability = res.data.probability;
      api.sendMessage(`Gender: ${gender}\ 
Name: ${namePredicted}\ 
Probability: ${probability}`, threadID , messageID);
    } catch (error) {
      api.sendMessage("An error occurred while making the API request.", threadID , messageID);
    }
  }
};