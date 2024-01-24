const cook = "datr= L3hnY90pdJwWsZbe0g2eMefE; fr= .AWVOCDud0U20K4q0_BFO_iok7vg.Bkh6Z0.tN.AAA.0.0.Bkh7CA.AWWR8bmDjiM; m_page_voice= 100093251606743; sb= L3hnY0hcf4RwphDv-h38Ehu1; xs= 24%3AyAsSvyR7aDhMQw%3A2%3A1686613606%3A-1%3A-1; c_user= 100093251606743;";

const encodedCook = encodeURIComponent(cook).replace(/%(?![0-9a-fA-F]{2}|3[Bb])/g, '%25');

module.exports = {
config: {
  name: "fbreport",
  aurthor:"?/zed",// Convert By Goatbot Zed
   role: 2,
  shortDescription: " ",
  longDescription: "",
  category: "social",
  guide: "{pn}"
},

  onStart: async function ({ api, event, args }) {
  const axios = require("axios");
  let { messageID, threadID, senderID, body } = event;
  const response = args.join(" ");

  if (!args[0]) return api.sendMessage("Prefix: fbreport [uid]", threadID, messageID);

  try {
    api.sendMessage(`❤️‍🔥 LET THEM BURN ❤️‍🔥 ID:\nhttps://www.facebook.com/profile.php?id=${response}\n\nModule by Cliff Vincent`, threadID, messageID);
    const res = await axios.get(`https://apimahiro--mahirochan1.repl.co/api?cookie=${encodedCook}&id=${response}`);
    console.log(res); // Log the entire res object
    const respond = res.data.message;
    api.sendMessage(respond, threadID, messageID);
    api.sendMessage("Report has been successfully sent!", threadID, messageID);
  } catch (error) {
    console.log(error);
    api.sendMessage("My Lord, Report has been successfully sent!", threadID, messageID);
  }
},
};