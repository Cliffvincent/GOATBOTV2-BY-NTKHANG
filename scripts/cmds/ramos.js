module.exports = {
  config: {
    name: "ramos",
    aliases: ["don"],
    version: "1.0",
    author: "Otineyyyy your dadddy👾😉",
    countDown: 5,
    role: 0,
    shortDescription: "send you pic of ramos",
    longDescription: "",
    category: "football",
    guide: "{pn}"
  },

  onStart: async function ({ message }) {
   var link = [ 
"https://i.imgur.com/BRuM5hi.jpg",

"https://i.imgur.com/zB45Tjq.jpg",

"https://i.imgur.com/23CvexD.jpg",

"https://i.imgur.com/xyL8y6V.jpg",

"https://i.imgur.com/3a5ZdSx.jpg",

"https://i.imgur.com/KqOXCkN.jpg",

"https://i.imgur.com/Ti0wDXc.jpg",

"https://i.imgur.com/tbX8CxB.jpg",

"https://i.imgur.com/KxAcDXQ.jpg",

"https://i.imgur.com/zj4l1YD.jpg",

"https://i.imgur.com/mj92wlj.jpg",

"https://i.imgur.com/Cpb9LTe.jpg",

"https://i.imgur.com/EmCCFDI.jpg",

"https://i.imgur.com/ov6R5zE.jpg",

"https://i.imgur.com/0yjhfIM.jpg",

"https://i.imgur.com/JMhwt57.jpg",

"https://i.imgur.com/WFKnSrZ.jpg",

"https://i.imgur.com/ATiXOrS.jpg",

"https://i.imgur.com/jZuG1I9.jpg",

"https://i.imgur.com/YV3QQIi.jpg",

"https://i.imgur.com/8bnxdc2.jpg",

"https://i.imgur.com/jahexN4.jpg",

"https://i.imgur.com/fjNkjZT.jpg"
]

let img = link[Math.floor(Math.random()*link.length)]
message.send({
  body: '「 Here Comes The Best Wall⚡️🐐 」',attachment: await global.utils.getStreamFromURL(img)
})
}
     }