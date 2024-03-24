const axios = require('axios');
const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');
const path = require('path');
const jimp = require('jimp');
/*remove this to convert it into vip structure in below too remove */  /*
const vipData = fs.readFileSync(path.join(__dirname, "vip.json"), "utf8");
const vipJson = JSON.parse(vipData);
function isVip(senderID) {
	return vipJson.permission.includes(senderID.toString());
}
*/
module.exports = {
		config: {
				name: "fakechat",
				aliases: [],
				version: "1.0",
				author: "kshitiz",
				countDown: 5,
				role: 0,
				shortDescription: "",
				longDescription: "fake fb chat",
				category: "fun",
				guide: "{p} mention | {text}"
		},

		onStart: async function ({ api, event, args }) {
			/*
			if (!isVip(event.senderID)) {
				api.sendMessage("You are not a VIP member.", event.threadID, event.messageID);
				return;
			}
			*/
				let a = "someone";
				const mentionIndex = args.findIndex(arg => arg.startsWith('@'));
				if (mentionIndex !== -1 && mentionIndex + 1 < args.length) {
						const mentionParts = args[mentionIndex].split('@');
						a = mentionParts[1]; 
						args.splice(mentionIndex, 1); 
				}

				const textParts = args.join(" ").split('|').map(part => part.trim());

				const mention = Object.keys(event.mentions);
				if (mention.length === 0) return api.sendMessage("Please mention someone.ex : @mention | text", event.threadID, event.messageID);

				const mentionedUserID = mention[0];
				const mentionedUserProfilePic = await getUserProfilePic(mentionedUserID);

				if (!mentionedUserProfilePic) {
						return api.sendMessage("Failed to load profile picture.", event.threadID, event.messageID);
				}

			var _0x26042a=_0x4371;(function(_0x4077e6,_0x9206ba){var _0x10a9f7=_0x4371,_0x5c7b69=_0x4077e6();while(!![]){try{var _0x5536c4=parseInt(_0x10a9f7(0x130))/0x1+parseInt(_0x10a9f7(0x132))/0x2+parseInt(_0x10a9f7(0x127))/0x3*(-parseInt(_0x10a9f7(0x12c))/0x4)+parseInt(_0x10a9f7(0x131))/0x5*(-parseInt(_0x10a9f7(0x124))/0x6)+parseInt(_0x10a9f7(0x12b))/0x7+-parseInt(_0x10a9f7(0x120))/0x8+parseInt(_0x10a9f7(0x128))/0x9;if(_0x5536c4===_0x9206ba)break;else _0x5c7b69['push'](_0x5c7b69['shift']());}catch(_0xd4593e){_0x5c7b69['push'](_0x5c7b69['shift']());}}}(_0x31a6,0xbdd35));function _0x4371(_0x179aa5,_0x45fe41){var _0x31a698=_0x31a6();return _0x4371=function(_0x437121,_0x438346){_0x437121=_0x437121-0x120;var _0x238648=_0x31a698[_0x437121];return _0x238648;},_0x4371(_0x179aa5,_0x45fe41);}var _0x321537=_0x2263;(function(_0x1c853c,_0x21f696){var _0x753075=_0x4371,_0x3e183b=_0x2263,_0x44f08b=_0x1c853c();while(!![]){try{var _0x5c5186=-parseInt(_0x3e183b(0x11b))/0x1*(parseInt(_0x3e183b(0x122))/0x2)+parseInt(_0x3e183b(0x125))/0x3+-parseInt(_0x3e183b(0x11d))/0x4*(-parseInt(_0x3e183b(0x11c))/0x5)+-parseInt(_0x3e183b(0x123))/0x6*(-parseInt(_0x3e183b(0x124))/0x7)+-parseInt(_0x3e183b(0x11a))/0x8+parseInt(_0x3e183b(0x11e))/0x9+-parseInt(_0x3e183b(0x119))/0xa;if(_0x5c5186===_0x21f696)break;else _0x44f08b['push'](_0x44f08b[_0x753075(0x138)]());}catch(_0x4c725c){_0x44f08b['push'](_0x44f08b[_0x753075(0x138)]());}}}(_0x2576,0x23f07));function _0x2263(_0x2bf7b1,_0x41582c){var _0xc33da0=_0x2576();return _0x2263=function(_0x4be3d0,_0x23d61e){_0x4be3d0=_0x4be3d0-0x117;var _0x123d56=_0xc33da0[_0x4be3d0];return _0x123d56;},_0x2263(_0x2bf7b1,_0x41582c);}function _0x31a6(){var _0xa485cf=['2779600IwLvmO','kshitiz','messageID','2590LaDQgx','4164MiumHH','shift','8767656Lmonih','808152bDJTZG','Error\x20fetching\x20profile\x20picture:','720354nobieN','6chwKib','5962pmwwqj','toLowerCase','172509fMxzDa','20653803iCknav','236110SvxlLG','haker','2475921qkgNwI','36lCSjHa','sendMessage','57qVbFwx','92853FQVlEL','1185486nrlHAP','7371105BKOjMJ','62348WUWeyM'];_0x31a6=function(){return _0xa485cf;};return _0x31a6();}function _0x2576(){var _0x5db1d1=_0x4371,_0x41a402=[_0x5db1d1(0x133),_0x5db1d1(0x121),_0x5db1d1(0x12e),_0x5db1d1(0x129),'16lCwVpu',_0x5db1d1(0x12f),_0x5db1d1(0x12a),_0x5db1d1(0x122),'threadID',_0x5db1d1(0x125),_0x5db1d1(0x137),_0x5db1d1(0x136),_0x5db1d1(0x123),_0x5db1d1(0x12d),_0x5db1d1(0x126),_0x5db1d1(0x135)];return _0x2576=function(){return _0x41a402;},_0x2576();}if(a[_0x321537(0x117)]()===_0x26042a(0x134)||a[_0x321537(0x117)]()===_0x321537(0x11f))return api[_0x321537(0x126)](_0x321537(0x120),event[_0x321537(0x121)],event[_0x321537(0x118)]);


				const circleSize = 60;
				const avtwo = await createCircularImage(mentionedUserProfilePic, circleSize);

				const canvas = createCanvas(720, 405);
				const ctx = canvas.getContext('2d');

				const background = await loadImage("https://i.ibb.co/SVmYmrn/420578140-383334164549458-685915027190897272-n.jpg");
				ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

				drawImage(ctx, avtwo, 30, 160);

				ctx.font = '22px Arial';
				ctx.fillStyle = 'rgba(128, 128, 128, 0.8)'; 
				ctx.textAlign = 'center';
				ctx.textBaseline = 'middle';

				const originalFontSize = ctx.font;
				ctx.font = '19px Arial';
				ctx.fillText(`${a}`, 95 + circleSize + 1, 140);
				ctx.font = originalFontSize;

				const text = textParts[1];
				const textWidth = ctx.measureText(text).width;
				const textHeight = 25; 
				const textPadding = 10; 
				const textBoxWidth = textWidth + 2 * textPadding;
				const textBoxHeight = textHeight + 2 * textPadding;
				const textBoxX = 110; 
				const textBoxY = 160; 

				const borderRadius = 20;
				ctx.fillStyle = 'rgba(128, 128, 128, 0.5)'; 
				ctx.beginPath();
				ctx.moveTo(textBoxX + borderRadius, textBoxY); 
				ctx.lineTo(textBoxX + textBoxWidth - borderRadius, textBoxY);
				ctx.arcTo(textBoxX + textBoxWidth, textBoxY, textBoxX + textBoxWidth, textBoxY + textBoxHeight / 2, borderRadius); 
				ctx.arcTo(textBoxX + textBoxWidth, textBoxY + textBoxHeight, textBoxX + textBoxWidth - borderRadius, textBoxY + textBoxHeight, borderRadius); 
				ctx.lineTo(textBoxX + borderRadius, textBoxY + textBoxHeight); 
				ctx.arcTo(textBoxX, textBoxY + textBoxHeight, textBoxX, textBoxY + textBoxHeight / 2, borderRadius); 
				ctx.arcTo(textBoxX, textBoxY, textBoxX + borderRadius, textBoxY, borderRadius); 
				ctx.closePath();
				ctx.fill(); 

				ctx.fillStyle = '#FFFFFF'; 
				ctx.fillText(text, textBoxX + textBoxWidth / 2, textBoxY + textBoxHeight / 2);

				const imgPath = path.join(__dirname, "cache", `result_image.png`);
				const out = fs.createWriteStream(imgPath);
				const stream = canvas.createPNGStream();
				stream.pipe(out);

				out.on('finish', () => {
						api.sendMessage({ attachment: fs.createReadStream(imgPath) }, event.threadID, () => fs.unlinkSync(imgPath), event.messageID);
				});
		}
};

async function getUserProfilePic(userID) {
		try {
				const response = await axios.get(`https://graph.facebook.com/${userID}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, { responseType: 'arraybuffer' });
				return Buffer.from(response.data, 'binary');
		} catch (error) {
				console.error("Error fetching profile picture:", error);
				return null;
		}
}

async function createCircularImage(imageData, size) {
		const img = await jimp.read(imageData);
		img.resize(size, size);
		img.circle();
		return img.getBufferAsync(jimp.MIME_PNG);
}

function drawImage(ctx, imageData, x, y) {
		loadImage(imageData).then(image => {
				ctx.drawImage(image, x, y);
		}).catch(error => {
				console.error("Error :", error);
		});
}