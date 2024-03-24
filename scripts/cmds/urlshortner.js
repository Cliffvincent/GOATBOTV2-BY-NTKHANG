module.exports = {
  config: {
    name: "short",
    version: "1.0",
    author: "Mahir",
    role: 0,
    shortDescription: {
      en: "Shorten a URL using TinyUtils",
      vi: "Rút gọn đường dẫn bằng TinyUtils",
    },
    longDescription: {
      en: "This command allows you to shorten a URL using TinyUtils.",
      vi: "Lệnh này cho phép bạn rút gọn đường dẫn bằng TinyUtils.",
    },
    category: "Utility",
    guide: {
      en: "To use this command, provide the URL you want to shorten as an argument.\nExample: !shorten <url>",
      vi: "Để sử dụng lệnh này, cung cấp đường dẫn bạn muốn rút gọn như một đối số.\nVí dụ: !shorten <url>",
    },
  },

  onStart: async function ({ args, message }) { // Add 'message' parameter to access the message object
    const axios = require('axios');

    const apiKey = "127f0ad7536d10f10f877b643cad33aa932ae";

    function formatUrl(url) {
      let formattedUrl = url;

      if (!url.startsWith("https://") && !url.startsWith("http://")) {
        formattedUrl = "https://" + url;
      }

      return formattedUrl;
    }

    function shortenUrl(apiKey, shortenUrl, name = "") {
      let apiUrl = `https://cutt.ly/api/api.php?key=${apiKey}&short=${shortenUrl}`;

      if (name !== "") {
        apiUrl += `&name=${name}`;
      }

      axios.get(apiUrl)
        .then(response => {
          if (response.data.url.status === 7) {
            message.reply("" + response.data.url.shortLink);
          } else {
            const code = response.data.url.status;
            message.reply(`[!] Error shortening URL. Error code ${code}: ${getErrorFromCode(code)}`);
          }
        })
        .catch(error => {
          message.reply("[!] Error shortening URL: " + error.message);
        });
    }

    function getErrorFromCode(code) {
      const eURLrs = {
        1: "The URL has already been shortened.",
        2: "The given string is not a link.",
        3: "The preferred link name was already taken.",
        4: "Invalid API key.",
        5: "The link includes invalid characters.",
        6: "The link provided was from a blocked domain."
      };

      return errors[code] || "Unknown error.";
    }

    if (args.length >= 1) {
      shortenUrl(apiKey, formatUrl(args[0]));
    } else if (message.reference && message.reference.messageID) { // Check if the message has a reference
      // Extract the replied message
      const repliedMessage = await message.channel.messages.fetch(message.reference.messageID);
      const repliedUrl = repliedMessage.content;

      if (repliedUrl.startsWith("http://") || repliedUrl.startsWith("https://")) {
        shortenUrl(apiKey, formatUrl(repliedUrl));
      } else {
        message.reply("The replied message does not contain a valid URL.");
      }
    } else {
      message.reply("Please provide a URL to shorten or reply to a message containing a URL");
    }
  }
};