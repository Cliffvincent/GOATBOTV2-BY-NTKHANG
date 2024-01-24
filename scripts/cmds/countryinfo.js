const axios = require('axios');

module.exports = {
  config: {
    name:"countryinfo",
    aliases: ["countryinfo"],
    version: "1.0",
    author: "Lahatra"
  },

  onStart: async function ({ api, event, args }) {
    const query = args.join(' ');

    if (!query) {
      return api.sendMessage("Donne-moi une question!", event.threadID, event.messageID);
    }

    try {
      const response = await axios.get(`https://restcountries.com/v3/name/${query}`);

      if (response.data) {
        const country = response.data[0];
        let message = '';

        message += `Name Of The Country: ${country.name.common}
Capital: ${country.capital}
Population: ${country.population}
Language:  ${Object.values(country.languages).join(', ')}
`;

        await api.sendMessage(message, event.threadID, event.messageID);
      } else {
        api.sendMessage("J'ai pas trouvé de pays correspondant à ta recherche!", event.threadID, event.messageID);
      }
    } catch (error) {
      api.sendMessage("J'ai rencontré une erreur en récupérant les informations sur le pays!", event.threadID, event.messageID);
    }
  }
};