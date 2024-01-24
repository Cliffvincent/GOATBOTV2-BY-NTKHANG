const axios = require('axios');

module.exports.config = {
  name: "tempmail",
aliases: ["tm"],
  version: "1.0",
  role: 0,
  countdown: 5,
  author: "kshitiz",
  usePrefix: true,
  description: "create tempmail",
  category: "media",
};

const TEMP_MAIL_URL = 'https://tempmail-api.codersensui.repl.co/api/gen';

module.exports.onStart = async ({ api, event, args }) => {
  try {
    if (args[0] === 'inbox') {
      if (!args[1]) {
        return api.sendMessage("❌ Please provide an email address for the inbox.", event.threadID);
      }

      const emailAddress = args[1];
      const inboxResponse = await axios.get(`https://tempmail-api.codersensui.repl.co/api/getmessage/${emailAddress}`);
      const messages = inboxResponse.data.messages;

      if (!messages || messages.length === 0) {
        return api.sendMessage(`No messages found for ${emailAddress}.`, event.threadID);
      }

      let messageText = '📬 Inbox Messages: 📬\n\n';
      for (const message of messages) {
        messageText += `📩 Sender: ${message.sender}\n`;
        messageText += `👀 Subject: ${message.subject || '👉 NO SUBJECT'}\n`;
        messageText += `📩 Message: ${message.message.replace(/<style([\s\S]*?)<\/style>|<script([\s\S]*?)<\/script>|<\/div>|<div>|<[^>]*>/gi, '')}\n\n`;
      }

      api.sendMessage(messageText, event.threadID);
    } else {
      const tempMailResponse = await axios.get(TEMP_MAIL_URL);
      const tempMailData = tempMailResponse.data;

      if (!tempMailData.email) {
        return api.sendMessage("❌ Failed to generate temporary email.", event.threadID);
      }

      api.sendMessage(`📩 Here's your generated temporary email: ${tempMailData.email}`, event.threadID);
    }
  } catch (error) {
    console.error('Error:', error);
    api.sendMessage("No messages found in the current email).", event.threadID);
  }
};