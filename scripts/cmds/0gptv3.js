const axios = require('axios');

module.exports = {
  config: {
    name: 'gpt3',
    version: '2.5',
    author: 'JV Barcenas',
    role: 0,
    category: 'Ai - Chat',
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
  onStart: async function ({ api, event }) {
    try {
      const prompt = event.body.trim();

      if (prompt) {
        const unsendFirstMessage = await api.sendMessage("Answering your question. Please wait a moment...", event.threadID);

        const response = await axios.get(`https://chatgayfeyti.archashura.repl.co?gpt=${encodeURIComponent(prompt)}`);

        if (response.status === 200 && response.data && response.data.content) {
          const messageText = response.data.content.trim();
          await api.sendMessage({
            body: messageText,
            mentions: event.mentions,
          }, event.threadID, unsendFirstMessage.messageID);
          console.log('Sent answer as a reply to the user');
        } else {
          throw new Error('Invalid or missing response from API');
        }
      }
    } catch (error) {
      console.error(`Failed to get an answer: ${error.message}`);
      api.sendMessage(
        `${error.message}.\n\nYou can try typing your question again or resending it, as there might be a bug from the server that's causing the problem. It might resolve the issue.`,
        event.threadID
      );
    }
  },
};
