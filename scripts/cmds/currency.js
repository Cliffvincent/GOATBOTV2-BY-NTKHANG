const axios = require("axios");

module.exports = {
  config: {
    name: "currency",
    version: "1",
    author: "Samir Œ",
    category: "currency",
  },

  onStart: async function ({ api, event, args }) {   
    const amount = parseFloat(args[0]);
    const fromCurrency = args[1];
    const toCurrency = args[2];

    if (isNaN(amount) || !fromCurrency || !toCurrency) {
      api.sendMessage("Please provide a valid amount, fromCurrency, and toCurrency.", event.threadID);
      return;
    }

    try {
      const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/the ${fromCurrency}`);
      const exchangeRates = response.data.rates;
      if (toCurrency in exchangeRates) {
        const convertedAmount = (amount * exchangeRates[toCurrency]).toFixed(2);
        api.sendMessage(`${amount} ${fromCurrency} is approximately ${convertedAmount} ${toCurrency}.`, event.threadID);
      } else {
        api.sendMessage("Invalid currency codes provided.", event.threadID);
      }
    } catch (error) {
      console.error("Error fetching exchange rates:", error);
      api.sendMessage("An error occurred while fetching the exchange rates.", event.threadID);
    }
  },
};
