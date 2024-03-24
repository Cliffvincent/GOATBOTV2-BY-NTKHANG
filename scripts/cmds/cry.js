const DIG = require("discord-image-generation");
const fs = require("fs-extra");

module.exports = {
  config: {
    name: "cry",
    version: "1.0",
    author: "kshitiz",
    countDown: 1,
    role: 0,
    shortDescription: "",
    longDescription: "",
    category: "meme",
    guide: "{pn}",
    envConfig: {
      deltaNext: 5
    }
  },

  langs: {
    vi: {
      noTag: "Bạn phải tag người bạn muốn tát"
    },
    en: {
      noTag: "You must tag the person you want to "
    }
  },

  onStart: async function ({ event, message, usersData, args, getLang }) 
  {

    let mention = Object.keys(event.mentions)
    let uid;




    if(event.type == "message_reply"){
    uid = event.messageReply.senderID
    } else{
      if (mention[0]){
        uid = mention[0]
      }else{
        console.log(" jsjsj")
        uid = event.senderID}
    }

let url = await usersData.getAvatarUrl(uid)
let avt = await new DIG.Mikkelsen().getImage(url)


 
      const pathSave = `${__dirname}/tmp/cry.png`;
  fs.writeFileSync(pathSave, Buffer.from(avt));
    let body = "this person always makes me cry"
    if(!mention[0]) body="Lol you make urself cry\nforgot to reply or mention someone"
    message.reply({body:body,
attachment: fs.createReadStream(pathSave)
    }, () => fs.unlinkSync(pathSave));


  }
};