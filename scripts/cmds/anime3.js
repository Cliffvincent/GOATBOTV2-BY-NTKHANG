const axios = require('axios');

module.exports = {
	config: {
		name: "anime3",
		author: "al-rulex/loufi/Pikachu",
		version: "2.0",
		shortDescription: "Search for anime pictures using the AniList API",
		longDescription: "Search for anime pictures using the AniList API and return a specified number of results.",
		category: "utility",
		guide: {
			vi: "",
			en: ""
		}
	},

	onStart: async function({ args, message, getLang }) {
		try {
			const query = args.join(' ');
			const numResults = parseInt(args[0]) || 5; // Default to 5 if no number is provided
			const url = `https://graphql.anilist.co/`;

			const { data } = await axios.post(url, {
				query: `
					query ($search: String, $numResults: Int) {
						Page(perPage: $numResults) {
							media(search: $search, type: ANIME) {
								coverImage {
									extraLarge
								}
							}
						}
					}
				`,
				variables: {
					search: query,
					numResults: numResults
				}
			});

			const results = data.data.Page.media.map(result => result.coverImage.extraLarge);
			const attachments = await Promise.all(results.map(url => global.utils.getStreamFromURL(url)));

			return message.reply({ body: "Results", attachment: attachments });
		} catch (error) {
			console.error(error);
			return message.reply("No results found 🤯");
		}
	}
		}