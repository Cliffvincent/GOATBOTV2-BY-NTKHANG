module.exports = {
    config: {
        name: "autoreact2",
		      version: "1.0",
	       	author: "Loid/Zed",
		      countDown: 5,
	       	role: 0,
		      shortDescription: "",
	       	longDescription: "",
		       category: "auto",
    },
	onStart: async function (){},
	onChat: async function ({ event ,api}) {
    if (event.body.toLowerCase().indexOf("yo") !== -1) return api.setMessageReaction("🤍", event.messageID,event.threadID)

    if (event.body.toLowerCase().indexOf("stalker") !== -1) return api.setMessageReaction("🤬", event.messageID,event.threadID)

    if (event.body.toLowerCase().indexOf("pakyu") !== -1) return api.setMessageReaction("🤬", event.messageID,event.threadID)

    if (event.body.toLowerCase().indexOf("Suntukan") !== -1) return api.setMessageReaction("😾", event.messageID,event.threadID)

    if (event.body.toLowerCase().indexOf("tang ina") !== -1) return api.setMessageReaction("🤬", event.messageID,event.threadID)

    if (event.body.toLowerCase().indexOf("thankyou") !== -1) return api.setMessageReaction("🤍", event.messageID,event.threadID)

    if (event.body.toLowerCase().indexOf("welcome") !== -1) return api.setMessageReaction("🤍", event.messageID,event.threadID)

    if (event.body.toLowerCase().indexOf("sad") !== -1) return api.setMessageReaction("😔", event.messageID,event.threadID)

    if (event.body.toLowerCase().indexOf("useless") !== -1) return api.setMessageReaction("🥹", event.messageID,event.threadID)

    if (event.body.toLowerCase().indexOf("lungkot") !== -1) return api.setMessageReaction("😓", event.messageID,event.threadID)
  },
};