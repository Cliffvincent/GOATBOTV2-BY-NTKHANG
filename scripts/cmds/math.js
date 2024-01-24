const axios = require('axios');

module.exports = {
  config: {
    name: "math",
    version: "1.0",
    author: "Shikaki",
    role: 0,
    category: "Utility",
    shortDescription: {
      en: "Solve math",
    },
    longDescription: {
      en: "Solve math using the math.js API.",
    },
    guide: {
      en: "{pn} <expression>",
    },
  },

  onStart: async function ({ message, args }) {
    try {
      // Check if the user provided a mathematical expression
      const expression = args.join(' ');

      if (!expression) {
        message.reply("Please provide a mathematical expression to evaluate.");
        return;
      }

      // Define the API URL
      const apiUrl = `http://api.mathjs.org/v4/?expr=${encodeURIComponent(expression)}`;

      // Send a GET request to the math.js API
      const response = await axios.get(apiUrl);

      if (response.status === 200 && response.data) {
        // Parse and format the result
        const result = parseFloat(response.data);

        if (!isNaN(result)) {
          message.reply(`The result of \`${expression}\` is: \`${result}\``);
        } else {
          message.reply("Sorry, I couldn't evaluate the expression.");
        }
      } else {
        message.reply("Sorry, there was an error while processing your request.");
      }
    } catch (error) {
      console.error("Error evaluating math expression:", error.message);
      message.reply("Sorry, there was an error while processing your request.");
    }
  },
};