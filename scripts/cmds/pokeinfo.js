const axios = require("axios");

module.exports = {
  config: {
    name: "pokeinfo",
    version: "1.0",
    author: "Rishad",
    countDown: 5,
    role: 0,
    shortDescription: {
      en: "Get Pokémon info",
      vi: "Lấy thông tin Pokémon",
    },
    longDescription: {
      en: "Retrieve detailed information about a Pokémon. This command allows you to fetch data such as the Pokémon's name, type, powerstats, description, and images. Simply provide the name of the Pokémon as an argument.",
      vi: "Lấy thông tin chi tiết về một Pokémon sử dụng pokeinfo API. Lệnh này cho phép bạn lấy dữ liệu về tên, loại, sức mạnh, mô tả và hình ảnh của Pokémon. Chỉ cần cung cấp tên của Pokémon làm đối số.",
    },
    category: "info",
    guide: {
      en: "{pn} <Pokémon name>",
      vi: "{pn} <tên Pokémon>",
    },
  },

  onStart: async function ({ api, event, args }) {
    try {
      const pokemonName = args.join(' ');
      if (!pokemonName)
        return api.sendMessage(`Please provide a Pokémon name.`, event.threadID, event.messageID);

      const response = await axios.get(`https://rishadapi.rishad100.repl.co/pokeinfo?apikey=key100&search=${pokemonName}`);

      if (response.data.matchingPokemon.length > 0) {
        const pokemonData = response.data.matchingPokemon[0];
        const message = {
          body: `===${pokemonData.name}===
────────────
❏ Name: ${pokemonData.name}
❏ Type: ${pokemonData.type}
❏ Powerstats:
  - HP: ${pokemonData.power.HP}
  - Attack: ${pokemonData.power.Attack}
  - Defense: ${pokemonData.power.Defense}
  - Speed: ${pokemonData.power.Speed}
❏ Description:
  - ${pokemonData.description}
`,
          attachment: await global.utils.getStreamFromURL(pokemonData.images)
        };

        return api.sendMessage(message, event.threadID);
      } else {
        return api.sendMessage(`No Pokémon found with that name.`, event.threadID);
      }
    } catch (error) {
      console.error(error);
      api.sendMessage("An error occurred while fetching Pokémon data.", event.threadID);
    }
  }
};