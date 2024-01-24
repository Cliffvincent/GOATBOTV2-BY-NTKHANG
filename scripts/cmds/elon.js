const axios = require('axios');
const fs = require('fs-extra');
const { loadImage, createCanvas } = require('canvas');

const wrapText = (ctx, text, maxWidth) => {
  return new Promise(resolve => {
    if (ctx.measureText(text).width < maxWidth) return resolve([text]);
    if (ctx.measureText('W').width > maxWidth) return resolve(null);
    const words = text.split(' ');
    const lines = [];
    let line = '';
    while (words.length > 0) {
      let split = false;
      while (ctx.measureText(words[0]).width >= maxWidth) {
        const temp = words[0];
        words[0] = temp.slice(0, -1);
        if (split) words[1] = `${temp.slice(-1)}${words[1]}`;
        else {
          split = true;
          words.splice(1, 0, temp.slice(-1));
        }
      }
      if (ctx.measureText(`${line}${words[0]}`).width < maxWidth) line += `${words.shift()} `;
      else {
        lines.push(line.trim());
        line = '';
      }
      if (words.length === 0) lines.push(line.trim());
    }
    return resolve(lines);
  });
};

module.exports = {
  config: {
    name: "elon",
    version: "1.0",
    role: 0,
    author: "MILAN",
    shortDescription: "Enter text",
    category: "fun",
    guide: "elon [text]",
    countDown: 10,
  },

  onStart: async function ({ api, event, args }) {
    const { senderID, threadID, messageID } = event;
    const pathImg = __dirname + '/assets/any.png';
    const text = args.join(" ");
    if (!text) return api.sendMessage('Enter the content of the write on the post', threadID, messageID);
    const getPorn = (await axios.get('https://i.imgur.com/GGmRov3.png', { responseType: 'arraybuffer' })).data;
    fs.writeFileSync(pathImg, Buffer.from(getPorn, 'utf-8'));
    const baseImage = await loadImage(pathImg);
    const canvas = createCanvas(baseImage.width, baseImage.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height);
      ctx.font = "320 30px Arial";
  ctx.fillStyle = "#000000";
  ctx.textAlign = "start";
  let fontSize = 220;
  while (ctx.measureText(text).width > 2600) {
    fontSize--;
    ctx.font = `320 ${fontSize}px Arial, sans-serif`;
  }
  const lines = await wrapText(ctx, text, 1160);
  ctx.fillText(lines.join('\n'), 40,115);//comment
    ctx.beginPath();
    const imageBuffer = canvas.toBuffer();
    fs.writeFileSync(pathImg, imageBuffer);
    return api.sendMessage({ attachment: fs.createReadStream(pathImg) }, threadID, () => fs.unlinkSync(pathImg), messageID);
  }
};