const axios = require("axios")
module.exports = {
  config: {
    name: "movieinfo",
    version: "1.1",
    author: "kshitiz",
    countDown: 25,
    role: 0,
    shortDescription: {
      vi: "",
      en: ""
    },
    longDescription: {
      vi: "",
      en: ""
    },
    category: "",
    guide: "",

  },

onStart: async function ({ event, message, getLang, usersData, api, args}) {

  let query = args.join(" ")
  if(!query) return message.reply("Please write a movie name...")
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

        message.reply(
        {
          body: `Title: ${title}\n\nActors: ${actors}\n\nRelease Date: ${date}\n\nGenres: ${genres}\n\nDirector: ${director}\n\nPlot: ${plot}`,
          attachment: await global.utils.getStreamFromURL(poster)})
  } catch(e){
    console.log(e)
    message.reply("Not found")
  }


}
    }