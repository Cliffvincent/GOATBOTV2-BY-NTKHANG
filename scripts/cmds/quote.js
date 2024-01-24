const axios = require('axios');
module.exports = {
 config: {
 name: "quote",
 author: "Gpt",
 countDown: 5,
 role: 0,
 category: "fun",
 shortDescription: {
 en: "Get a random quote from a specific category",
 },
 },
 onStart: async function ({ api, event, args, message }) {
 try {
 if (!args[0]) {
   return api.sendMessage("Please provide a category. Here are the available categories: age, alone, amazing, anger, architecture, art, attitude, beauty, best, birthday, business, car, change, communications, computers, cool, courage, dad, dating, death, design, dreams, education, environmental, equality, experience, failure, faith, family, famous, fear, fitness", event.threadID);
 }
 const category = args[0].toLowerCase();
 const response = await axios.get(`https://api.api-ninjas.com/v1/quotes?category=${category}`, {
 headers: {
 'X-Api-Key': 'A4drPDSMtprpmTnd1bEJ0w==5NZP88tykb5fXsVL'
 }
 });
 if (response.data.length === 0) {
   return api.sendMessage("No quotes found for this category. Please choose another one.", event.threadID);
 }
 const quote = response.data[0].quote;
 const author = response.data[0].author;
 const message = `${quote} - ${author}`;
 return api.sendMessage(message, event.threadID);
 } catch (error) {
 console.error(error);
 }
 },
}