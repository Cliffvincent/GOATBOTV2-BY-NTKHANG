module.exports = {
    config: {
        name: "autoreact",
		      version: "1.0",
	       	author: "Loid Butter",
		      countDown: 5,
	       	role: 0,
		      shortDescription: "",
	       	longDescription: "",
		       category: "dont know ",
    },
	onStart: async function (){},
	onChat: async function ({ event ,api}) {
		if (event.body.toLowerCase().indexOf("iloveyou") !== -1) return api.setMessageReaction("😙", event.messageID,event.threadID)
		
		if (event.body.toLowerCase().indexOf("good night") !== -1) return api.setMessageReaction("💗", event.messageID,event.threadID)
		
		if (event.body.toLowerCase().indexOf("good morning") !== -1) return api.setMessageReaction("💗", event.messageID,event.threadID)
		
		if (event.body.toLowerCase().indexOf("pakyo") !== -1) return api.setMessageReaction("😠", event.messageID,event.threadID)
		
		if (event.body.toLowerCase().indexOf("mahal") !== -1) return api.setMessageReaction("💗", event.messageID,event.threadID)
		
		if (event.body.toLowerCase().indexOf("mwa") !== -1) return api.setMessageReaction("💗", event.messageID,event.threadID)
		
		if (event.body.toLowerCase().indexOf("😢") !== -1) return api.setMessageReaction("😢", event.messageID,event.threadID)
		
		if (event.body.toLowerCase().indexOf("😆") !== -1) return api.setMessageReaction("😆", event.messageID,event.threadID)
		
		if (event.body.toLowerCase().indexOf("😂") !== -1) return api.setMessageReaction("😆", event.messageID,event.threadID)
		
		if (event.body.toLowerCase().indexOf("🤣") !== -1) return api.setMessageReaction("😆", event.messageID,event.threadID)
    
   	if (event.body.toLowerCase().indexOf("tangina") !== -1) return api.setMessageReaction("😡", event.messageID,event.threadID)

    if (event.body.toLowerCase().indexOf("good afternoon") !== -1) return api.setMessageReaction("❤", event.messageID,event.threadID)

		if (event.body.toLowerCase().indexOf("good evening") !== -1) return api.setMessageReaction("❤", event.messageID,event.threadID)

		if (event.body.toLowerCase().indexOf("gago") !== -1) return api.setMessageReaction("😡", event.messageID,event.threadID)

    		if (event.body.toLowerCase().indexOf("bastos") !== -1) return api.setMessageReaction("😳", event.messageID,event.threadID)

        		if (event.body.toLowerCase().indexOf("bas2s") !== -1) return api.setMessageReaction("😳", event.messageID,event.threadID)

        		if (event.body.toLowerCase().indexOf("bastog") !== -1) return api.setMessageReaction("😳", event.messageID,event.threadID)

        		if (event.body.toLowerCase().indexOf("hi") !== -1) return api.setMessageReaction("💗", event.messageID,event.threadID)

        		if (event.body.toLowerCase().indexOf("hello") !== -1) return api.setMessageReaction("💗", event.messageID,event.threadID)

        		if (event.body.toLowerCase().indexOf("zope") !== -1) return api.setMessageReaction("⏳", event.messageID,event.threadID)

    if (event.body.toLowerCase().indexOf("pangit") !== -1) return api.setMessageReaction("😠", event.messageID,event.threadID)

    if (event.body.toLowerCase().indexOf("redroom") !== -1) return api.setMessageReaction("😏", event.messageID,event.threadID)

    if (event.body.toLowerCase().indexOf("😏") !== -1) return api.setMessageReaction("😏", event.messageID,event.threadID)

    if (event.body.toLowerCase().indexOf("pakyu") !== -1) return api.setMessageReaction("🤬", event.messageID,event.threadID)

    if (event.body.toLowerCase().indexOf("fuck you") !== -1) return api.setMessageReaction("🤬", event.messageID,event.threadID)

    if (event.body.toLowerCase().indexOf("bata") !== -1) return api.setMessageReaction("👧", event.messageID,event.threadID)

    if (event.body.toLowerCase().indexOf("kid") !== -1) return api.setMessageReaction("👧", event.messageID,event.threadID)

    if (event.body.toLowerCase().indexOf("i hate you") !== -1) return api.setMessageReaction("😞", event.messageID,event.threadID)
  
    if (event.body.toLowerCase().indexOf("useless") !== -1) return api.setMessageReaction("😓", event.messageID,event.threadID)

    if (event.body.toLowerCase().indexOf("omg") !== -1) return api.setMessageReaction("😮", event.messageID,event.threadID)

if (event.body.toLowerCase().indexOf("shoti") !== -1) return api.setMessageReaction("😏", event.messageID,event.threadID)

if (event.body.toLowerCase().indexOf("pogi") !== -1) return api.setMessageReaction("😎", event.messageID,event.threadID)

    if (event.body.toLowerCase().indexOf("ganda") !== -1) return api.setMessageReaction("💗", event.messageID,event.threadID)

if (event.body.toLowerCase().indexOf("i miss you") !== -1) return api.setMessageReaction("💗", event.messageID,event.threadID)

if (event.body.toLowerCase().indexOf("sad") !== -1) return api.setMessageReaction("😔", event.messageID,event.threadID)
    
  }
};