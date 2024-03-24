const tabs = require("ultimate-guitar");

module.exports = {
  config: {
    name: "chords",
    aliases: [],
    version: "1.0",
    author: "Joshua Sy & kshitiz",
    shortDescription: "Search Chords",
    longDescription: "Search Chords",
    category: "media",
    guide: "{pn} chords song title"
  },
  onStart: async function ({ api, event, args, Users, __GLOBAL }) {
    let qwerty = args.join(" ");

    if (qwerty === "") {
     
      api.sendMessage("Please type 'chords' with the song name", event.threadID, event.messageID);
      return;
    }

    try {
      const res = await tabs.firstData(qwerty);

      if (!res) {
        
        console.error(`Chords for '${qwerty}' not found.`);
       
        api.sendMessage(`Chords for '${qwerty}' not found.`, event.threadID, event.messageID);
      } else {
        var title = res.title;
        var chords = res.chords;
        var type = res.type;
        var key = res.key;
        var artist = res.artist;

        api.sendMessage(
          `Artist: ${artist}\nTitle: ${title}\nType: ${type}\nKey: ${key}\n——Here’s the chords——\n\n${chords}\n\n——End——`,
          event.threadID,
          event.messageID
        );
      }
    } catch (err) {
      
      console.error("[ERR] " + err);
   
      api.sendMessage("[ERR] An error occurred while fetching chords.", event.threadID, event.messageID);
    }
  }
};
