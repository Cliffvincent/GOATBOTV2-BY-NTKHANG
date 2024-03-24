const axios = require('axios');

const Prefixes = [
  'bea',
];

module.exports = {
  config: {
    name: 'bea',
    version: '2.5',
    author: 'JV Barcenas', // do not change
    role: 0,
    category: 'ai',
    shortDescription: {
      en: 'Asks an AI for an answer.',
    },
    longDescription: {
      en: 'Asks an AI for an answer based on the user prompt.',
    },
    guide: {
      en: '{pn} [prompt]',
    },
  },
  onStart: async function () {},
  onChat: async function ({ api, event, args, message }) {
    try {
      const prefix = Prefixes.find((p) => event.body && event.body.toLowerCase().startsWith(p));

      if (!prefix) {
        return; 
      }

      const prompt = event.body.substring(prefix.length).trim();

      if (prompt === '') {
        await message.reply(
          "𝖧𝖤𝖫𝖫𝖮, 𝖬𝖸 𝖴𝖲𝖤𝖱 𝖯𝖫𝖤𝖠𝖲𝖤 𝖠𝖣𝖣 𝖠 𝖰𝖴𝖤𝖲𝖳𝖨𝖮𝖭 𝖳𝖮 𝖬𝖠𝖪𝖤 𝖮𝖴𝖱 𝖢𝖮𝖭𝖵𝖤𝖱𝖲𝖠𝖳𝖨𝖮𝖭 𝖥𝖠𝖲𝖳𝖤𝖱"
        );
        return;
      }


      await message.reply("♑ | 𝖡𝖤𝖠 𝖨𝖲 𝖭𝖮𝖶 𝖲𝖤𝖠𝖱𝖢𝖧𝖨𝖭𝖦 𝖥𝖮𝖱 𝖠𝖭 𝖠𝖭𝖲𝖶𝖤𝖱.....");

      const response = await axios.get(`https://chatgayfeyti.archashura.repl.co?gpt=${encodeURIComponent(prompt)}`);

      if (response.status !== 200 || !response.data) {
        throw new Error('Invalid or missing response from API');
      }

      const messageText = response.data.content.trim();

      await message.reply(messageText);

      console.log('Sent answer as a reply to user');
    } catch (error) {
      console.error(`Failed to get answer: ${error.message}`);
      api.sendMessage(
        `${error.message}.\n\nYou can try typing your question again or resending it, as there might be a bug from the server that's causing the problem. It might resolve the issue.`,
        event.threadID
      );
    }
  },
};