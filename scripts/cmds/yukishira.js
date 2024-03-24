module.exports = {
 config: {
 name: "yukihira",
 version: "1.0",
 author: "Jaychris Garcia",
 countDown: 5,
 role: 0,
 shortDescription: "no prefix",
 longDescription: "no prefix",
 category: "no prefix",
 }, 
 onStart: async function(){}, 
 onChat: async function({ event, message, getLang }) {
 if (event.body && event.body.toLowerCase() === "yukihira") {
 return message.reply({
 body: "hello, i'm yukihira. follow my master Loid.",
 attachment: await global.utils.getStreamFromURL("https://i.imgur.com/yoFQmX2.jpg")
 });
 }
 }
}