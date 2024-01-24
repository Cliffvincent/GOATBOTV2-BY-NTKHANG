const axios = require('axios');
const fs = require('fs');
const https = require('https');
const os = require('os'); // Import the 'os' module

module.exports = {
    config: {
        name: "cat",
        version: "1.1",
        author: "Shikaki",
        countDown: 5,
        role: 0,
        shortDescription: {
            en: "Get a cat fact and image."
        },
        longDescription: {
            en: "Get a random cat fact and an image of a cute cat."
        },
        category: "😄Fun",
        guide: {
            en: "{pn} cat"
        }
    },

    onStart: async function ({ message }) {
        try {
            // Fetch a random cat fact
            const factResponse = await axios.get('https://meowfacts.herokuapp.com/');
            const catFact = factResponse.data.data;

            // Fetch a random cat image URL
            const imageResponse = await axios.get('https://api.thecatapi.com/v1/images/search');
            const catImageURL = imageResponse.data[0].url;

            // Create a temporary file path for downloading the cat image
            const imageFileName = 'cat_image.jpg';
            const tempDir = os.tmpdir(); // Get the system's temporary directory
            const imageFilePath = `${tempDir}/${imageFileName}`;

            const file = fs.createWriteStream(imageFilePath);
            const request = https.get(catImageURL, function (response) {
                response.pipe(file);
                file.on('finish', function () {
                    // Create a reply message with the cat fact and send the image as an attachment
                    message.reply({
                        body: `🐱 **Cat Fact:**\n\n${catFact}`,
                        attachment: fs.createReadStream(imageFilePath)
                    });

                    // Close the file stream and delete the temporary file
                    file.close(() => {
                        fs.unlink(imageFilePath, (err) => {
                            if (err) {
                                console.error('Error deleting temporary file:', err);
                            }
                        });
                    });
                });
            });

        } catch (error) {
            console.error("Error fetching cat fact and image:", error);
            // Handle errors by sending an empty message
            message.reply("");
        }
    }
};
