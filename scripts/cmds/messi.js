module.exports = {
  config: {
    name: "messi",
    aliases: ["lm10"],
    version: "1.0",
    author: "Otineyyyy your dadddy👾😉",
    countDown: 5,
    role: 0,
    shortDescription: "send you pic of messi",
    longDescription: "",
    category: "football",
    guide: "{pn}"
  },

  onStart: async function ({ message }) {
   var link = [ "https://i.imgur.com/ahKcoO3.jpg",

"https://i.imgur.com/Vsf4rM3.jpg",

"https://i.imgur.com/ximEjww.jpg",

"https://i.imgur.com/ukYhm0D.jpg",

"https://i.imgur.com/Poice6v.jpg",

"https://i.imgur.com/5yMvy5Z.jpg",

"https://i.imgur.com/ndyprcd.jpg",

"https://i.imgur.com/Pm2gC6I.jpg",

"https://i.imgur.com/wxxHuAG.jpg",

"https://i.imgur.com/GwOCq59.jpg",

 "https://i.imgur.com/oM0jc4i.jpg",

"https://i.imgur.com/dJ0OUef.jpg",

"https://i.imgur.com/iurRGPT.jpg",

"https://i.imgur.com/jogjche.jpg",

"https://i.imgur.com/TiyhKjG.jpg",

"https://i.imgur.com/AwlBM23.jpg",

"https://i.imgur.com/9OLSXZD.jpg",


"https://i.imgur.com/itscmiy.jpg",

"https://i.imgur.com/FsnCelU.jpg",

"https://i.imgur.com/c7BCwDF.jpg",

"https://i.imgur.com/3cnR6xh.jpg",

"https://i.imgur.com/TZqepnU.jpg",

"https://i.imgur.com/kYxEPrD.jpg",

"https://i.imgur.com/9ZjD5nX.jpg",

"https://i.imgur.com/YWyI4hP.jpg"
]

let img = link[Math.floor(Math.random()*link.length)]
message.send({
  body: '「 The Goat has arrived🐐 」',attachment: await global.utils.getStreamFromURL(img)
})
}
     }