const axios = require('axios');

module.exports = {
  config: {
    name: "character",
    aliases: ["character","ctanime","ac"],
    version: "1.0",
    author: "binod",
    countDown: 5,
    role: 0,
    shortDescription: "get character data",
    longDescription: "search and get character infos",
    category: "anime",
    guide: "{pn} {{<name>}}"
  },

  onStart: async function ({ message, args }) {
    const name = args.join(" ");
    if (!name)
      return message.reply(`⚠️ | Please enter character name!`);
    else {
      const BASE_URL = `https://api.safone.tech/anime/character?query=${name}`;
      try {
        let res = await axios.get(BASE_URL)


        let res2 = res.data
        let nm = res2.name.full + " " + res2.name.native
        let gen = res2.gender
        let ag = res2.age
        let heit = res2.height
        let anim = res2.media.edges[0].node.title.romaji + " 🇯🇵 " + res2.media.edges[0].node.title.native
        let desc = res2.description
        let img = res2.image.large
        const form = {
          body: `===「 Character Info 」===`
            + `\n\n👤 Name: ${nm}`
            + `\n🚻 Gender: ${gen}`
            + `\n🗓️ Age: ${ag}`
            + `\n👖 Height: ${heit}`
            + `\n\n📺 Anime & Manga: ${anim}`
            + `\n\n🔉 Description: ${desc}`

        };
        if (img)
          form.attachment = await global.utils.getStreamFromURL(img);
        message.reply(form);
      } catch (e) { message.reply(`something went wrong`) }

    }
  }
};