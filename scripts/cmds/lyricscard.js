const {createCanvas, registerFont, loadImage, Image} = require("canvas")
var sizeOf = require('buffer-image-size');

const fs = require("fs")
const axios = require("axios")


module.exports = {
	config: {
		name: "lyricscard",
		version: "1.1",
		author: "NIB",
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
		category: "fun",
		guide : {
 en: "{pn} <id> | <name> | <color(optional)>"
},

	},

onStart: async function ({ event, message, getLang, usersData, api, args}) {
if ((event.type == "message_reply") && (event.messageReply.attachments.length > 0) && (event.messageReply.attachments[0].type == "photo")) {

 if(args.length == 0) return message.reply("add something to writr baka")

let arr = args.join(" ").split("|")
 if(arr.length<2) return message.send("Wrong Syntax")

 try{
 // let txt = args.join(" ")
 let ig = (await axios.get(encodeURI(
 event.messageReply.attachments[0].url), { responseType: "arraybuffer" })
 ).data;
 let logoo = (await axios.get(encodeURI(
 "https://i.ibb.co/khkcTBw/20221213-161950.png"), { responseType: "arraybuffer" })
 ).data;


var dmns = sizeOf(ig);

 let cnv = await createCanvas(dmns.width, dmns.height+100)
 let ctx = cnv.getContext("2d")
 ctx.imageSmoothingEnabled = false;
 ctx.patternQuality = 'best';
ctx.antialias = 'default';
ctx.filter = 'default';


ctx.fillStyle = "#382b2b";
ctx.fillRect(0, 0, cnv.width, cnv.height);


//let bg = await loadImage("bg.png")
let pg = await loadImage(ig)
let logo = await loadImage(logoo)
ctx.drawImage(pg, 0, 0)

ctx.font = '30px "Arial"';
let y = cnv.height-160
 let mns = parseInt(ctx.font)+5

 let arr2 = arr[0].split("\n").reverse()


 for(var txt of arr2){

 ctx.textBaseline = 'middle'; 
 ctx.fillStyle = '#fff';

 var width = ctx.measureText(txt).width;


 ctx.fillRect(30, y-(parseInt(ctx.font)/2), width, parseInt(ctx.font));


 ctx.fillStyle = '#000';
 ctx.fillText(txt, 30, y)
y = y-mns
 }

 ctx.font ='20px "Arial"'
 ctx.textBaseline = 'middle';
 ctx.fillStyle = '#fff';
ctx.fillRect(0, cnv.height-101, cnv.width, 3);

 ctx.fillText(arr[1], 30, cnv.height-50 )

await ctx.drawImage(logo, cnv.width-100, cnv.height-100)

 const imgBuffer = cnv.toBuffer('image/png') 



 await fs.writeFileSync(__dirname + "/tmp/lyricsCard.png", imgBuffer)
 // fs.writeFileSync('asd.png', imgBuffer)
message.reply({attachment:fs.createReadStream(__dirname + "/tmp/lyricsCard.png")})

 }catch(e){console.log(e)}
} else{
 message.reply("only reply to photos")
}
}
};