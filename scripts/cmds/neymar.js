module.exports = {
  config: {
    name: "neymar",
    aliases: ["njr"],
    version: "1.0",
    author: "Otineyyyy your dadddy👾😉",
    countDown: 5,
    role: 0,
    shortDescription: "send you pic of neymar",
    longDescription: "",
    category: "football",
    guide: "{pn}"
  },

  onStart: async function ({ message }) {
   var link = [
     "https://i.imgur.com/arWjsNg.jpg",

"https://i.imgur.com/uJYvMR0.jpg",

"https://i.imgur.com/A3MktQ4.jpg",

"https://i.imgur.com/wV8YHHp.jpg",

"https://i.imgur.com/14sAFjM.jpg",

"https://i.imgur.com/EeAi2G6.jpg",

"https://i.imgur.com/fUZbzhJ.jpg",

"https://i.imgur.com/bUjGSCX.jpg",

"https://i.imgur.com/4KZvLbO.jpg",

"https://i.imgur.com/gBEAsYZ.jpg",

"https://i.imgur.com/baKOat0.jpg",

"https://i.imgur.com/4Z0ERpD.jpg",

"https://i.imgur.com/h2ReDUe.jpg",

"https://i.imgur.com/KQPalvi.jpg",

"https://i.imgur.com/VRALDic.jpg",

"https://i.imgur.com/Z3qGkZa.jpg",

"https://i.imgur.com/etyPi7B.jpg",

"https://i.imgur.com/tMxLEwl.jpg",

"https://i.imgur.com/OwEdlZo.jpg",

"https://i.imgur.com/UHAo39t.jpg",

"https://i.imgur.com/aV4EVT9.jpg",

"https://i.imgur.com/zdC8yiG.jpg",

"https://i.imgur.com/JI7tjsr.jpg",

"https://i.imgur.com/fFuPCrM.jpg",

"https://i.imgur.com/XIaAXju.jpg",

"https://i.imgur.com/yyIJwPH.jpg",

"https://i.imgur.com/MyGcsJM.jpg",

"https://i.imgur.com/UXjh4R1.jpg",

"https://i.imgur.com/QGrvMZL.jpg"
] 

let img = link[Math.floor(Math.random()*link.length)]
message.send({
  body: '「 Here Comes Magician🐐」',attachment: await global.utils.getStreamFromURL(img)
})
}
     }