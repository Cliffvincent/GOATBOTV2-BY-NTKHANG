const axios = require("axios");

module.exports = {
    config: {
        name: "bored",
        version: "1.0",
        author: "kshitiz",
        countdown: 2,
        role: 0,
        category: "Fun",
        ShortDescription: "Get a suggestion when you're bored",
        LongDescription: "Bot will suggest you an activity to do when you're bored.",
        guide: {
            en: "Type {pn} to get a suggestion for something to do when you're bored."
        }
    },

    onStart: async function({ api, args, message }) {
        try {
            const response = await axios.get("http://www.boredapi.com/api/activity/");
            const activity = response.data.activity;
            message.reply(`How about ${activity}?`);
        } catch (error) {
            message.reply("Sorry, the API is not responding. Please try again later.");
        }
    }
};