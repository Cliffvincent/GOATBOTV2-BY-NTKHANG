const axios = require('axios');
const fs = require('fs');
const https = require('https');
const path = require('path');

// Create the "temp" directory if it doesn't exist
const tempDir = 'temp';
if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir);
}

module.exports = {
    config: {
        name: "cosplay2",
        version: "1.3",
        author: "Shikaki",
        countDown: 5,
        role: 0,
        shortDescription: {
            en: "Get a random cosplay image."
        },
        longDescription: {
            en: "Get a random cosplay image along with author credits."
        },
        category: "😄Fun",
        guide: {
            en: "{pn}"
        }
    },

    onStart: async function ({ api, event, message, getLang }) {
        try {
            // Fetch a random cosplay image
            const cosplayResponse = await axios.get('https://rishadsapi.apis100.repl.co/cosplay');
            const cosplayData = cosplayResponse.data;

            // Ensure the cosplay URL has the correct scheme (https://) by replacing "https//" with "https://"
            const cosplayURL = cosplayData.cosplay.replace('https//', 'https://');

            // Set a temporary path for the image file
            const imageFileName = `cosplay_${Date.now()}.jpg`;
            const tempImageFilePath = path.join(tempDir, imageFileName); // Save in the "temp" directory

            const file = fs.createWriteStream(tempImageFilePath);
            const request = https.get(cosplayURL, function (response) {
                response.pipe(file);
                file.on('finish', function () {
                    // Create a reply message with the cosplay image and author credits
                    const replyMessage = `
🎭 Here is a random cosplay image 
                    `;

                    // Use message.reply to send the message with the cosplay image as an attachment
                    message.reply({
                        body: replyMessage,
                        attachment: fs.createReadStream(tempImageFilePath)
                    }).then(() => {
                        // After sending, delete the temporary image file
                        fs.unlinkSync(tempImageFilePath);
                    });
                });
            });
        } catch (error) {
            console.error("Error fetching and sending cosplay image:", error);
            // Handle errors by sending an error message using message.reply
            message.reply("❌ An error occurred while fetching and sending the cosplay image. Please try again later.");
        }
    }
};
