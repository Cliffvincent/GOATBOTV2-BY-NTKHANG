const axios = require("axios")
module.exports = {
  config: {
    name: "movie",
    version: "1.1",
    author: "nahim",
    countDown: 5,
    role: 0,
    shortDescription: {
      vi: "",
      en: ""
    },
    longDescription: {
      vi: "",
      en: ""
    },
    category: "information",
    guide:  {
      vi: "{pn} movie name",
      en: "{pn} movie name"
    }

  },

onStart: async function ({ event, message, getLang, usersData, api, args}) {

  let query = args.join(" ")
  if(!query) return message.reply("Bigay mo ang title ng movie")
  try{
  let res = await axios.get(`https://api.popcat.xyz/imdb?q=${encodeURIComponent(query)}`)

      let title = res.data.title,
        date = res.data.year,
        time = res.data.runtime,
        genres = res.data.genres,
        director = res.data.director,
        actors = res.data.actors,
        plot = res.data.plot
      var poster = res.data.poster;
     // console.log(res)
        message.reply(
        {
          body: `Title: ${title}\\Actors: ${actors}\\Release Date: ${date}\\Genres: ${genres}\\Director: ${director}\\Plot: ${plot}`,
          attachment: await global.utils.getStreamFromURL(poster)})
  } catch(e){
    console.log(e)
    message.reply("Sorry wala akong nakuha na ganyan")
  }


}
}