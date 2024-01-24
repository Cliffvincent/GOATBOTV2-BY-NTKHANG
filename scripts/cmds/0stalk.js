const a = require('axios');
module.exports = {
  config: {
    name: "stalk",
    author: "Jun",
    role: 0,
    countDown: 0,
    shortDescription: "stalk socmed acc",
    category: "media",
    guide: {
      en: "usage\n{pn} fb <uid>\n{pn}github <username\n{pn} tiktok <username>"
    }
  },
  onStart: async function ({ message, api, args, event, usersData }) {
    if (args.length <1) {
      message.reply("Usage:\nstalk fb <uid>\nstalk github <username>\nstalk tiktok <username>");
      return;
    }
    const jun = "yourboss12";
    const c = args[0];
    const id = args[1];

    try {
      const r = await a.get(`https://api-test.${jun}.repl.co/stalk/${c}?&id=${id}`);
      const { result, av } = r.data;
      message.reply({
        body: result,
        attachment: await global.utils.getStreamFromURL(av)
      });
    } catch (error) {
      console.error(error);
    }
  }
};