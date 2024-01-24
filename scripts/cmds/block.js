module.exports = {
config: {
  name: "block",
  aurthor:"anne/zed",// Convert By Goatbot Zed
   role: 2,
  shortDescription: " ",
  longDescription: "",
  category: "admin",
  guide: "{pn}"
},

  onStart: async function ({ api, event, args }) {
const axios = require("axios");
if (args.join().indexOf('@') !== -1){ var id = Object.keys(event.mentions) }
      else var id = args[1];
 if (args.join().indexOf(".com/") !== -1) {
        const res = await axios.get(`https://eurix-api.diciper09.repl.co/finduid?link=${args[1]}`);
var id = res.data.result || args[1];
      }
//let text = args[0];
if(!id) return api.sendMessage(`『 Wrong format 』\n『 Use message block [uid/fb link/mention] (to block user) 』\n『 ${this.config.name} unblock [uid] (to unblock user)`, event.threadID, event.messageID);
if(!args[1]) return api.sendMessage(`『 Wrong format 』\n『 Use message block [uid] (to block user) 』\n『 ${this.config.name} unblock [uid/fb link/mention] (to unblock user) 』`,event.threadID, event.essageID);
if (args[0] == "block"){
api.changeBlockedStatus(`${id}`, true, (err) => {
        if(err) return api.sendMessage(`${err}`, event.threadID, event.messageID);
  else return api.sendMessage("『 Successfully blocked user 』", event.threadID, event.messageID);
    });
}
else if (args[0] == "unblock"){
  api.changeBlockedStatus(`${id}`, false, (err) => {
        if(err) return api.sendMessage(`${err}`, event.threadID, event.messageID);
  else return api.sendMessage("『 Successfully unblocked user 』", event.threadID, event.messageID);
    });
  }
    },
};