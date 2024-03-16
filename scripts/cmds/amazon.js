const axios = require('axios');

module.exports = {
	config: {
		name: "amazon",
		version: "1.0",
		author: "Samir Œ",
		shortDescription: "Search for products on Amazon",
		longDescription: "Search for products on Amazon and display details of a random item.",
		category: "Utility",
		guide: "{prefix}amazon <search_query>",
	},

	onStart: async function ({ message, args }) {
		const searchQuery = args.join(" ");
		if (!searchQuery) {
			return message.reply("Please provide a search query.");
		}

		try {
			const response = await axios.get(`https://api-samir.onrender.com/amazon/search?search=${encodeURIComponent(searchQuery)}`);
			const products = response.data;

			if (products.length === 0) {
				return message.reply("No products found.");
			}

			const randomIndex = Math.floor(Math.random() * products.length);
			const product = products[randomIndex];

			const messageBody = `Title: ${product.title}\n\nRank: ${product.rank}\n\nPrice: ${product.price}\n\nRating: ${product.rating}`;
			const imageStream = await global.utils.getStreamFromURL(product.image_url);

			if (!imageStream) {
				return message.reply("Failed to retrieve image.");
			}

			return message.reply({
				body: messageBody,
				attachment: imageStream
			});
		} catch (error) {
			console.error(error);
			return message.reply("Failed to search for products on Amazon.");
		}
	}
};