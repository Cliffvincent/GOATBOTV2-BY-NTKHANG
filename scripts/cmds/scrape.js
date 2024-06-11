const { GoatWrapper } = require('fca-liane-utils'); 

const axios = require('axios');

module.exports = {
   config: {
       name: 'scrape',
       version: '1.1.1',
       hasPermssion: 0,
       role: 2,
       author: "cliff",
       category: "scrape",
       shortDescription: "Scraping Web and api/output",
       credits: "cliff",
       author: 'yazky',
       description: 'Scraping Web and api/output',
       usePrefix: false,
       hasPrefix: false,
       commandCategory: 'url',
       usage: '{pn} [url]',
       usages: '{pn} [url]',
       cooldown: 0,
       cooldowns: 0,
       countDown: 0,
   },

   onStart: async function({ api, event, args }) {

      let url = args.join(' ');

      try {
         if (!url) {
            return api.sendMessage('Please provide a URL you want to scrape.', event.threadID, event.messageID);
         }

         const cliff = await new Promise(resolve => {
            api.sendMessage('Scraping website/API, please wait a few seconds...', event.threadID, (err, info1) => {
               resolve(info1);
            }, event.messageID);
         });

         const response = await axios.get(`http://158.101.198.227:8609/scrapper?url=${encodeURIComponent(url)}`);
         const responseData = response.data.results;

         let ughContent = responseData.map(item => item.content).join('\n\n');

         let formattedContent = responseData.map(item => ({
            created_at: item.created_at,
            updated_at: item.updated_at,
            page: item.page,
            url: item.url,
            job_id: item.job_id,
            status_code: item.status_code,
            _request: item._request,
            _response: item._response,
            session_info: item.session_info
         }));

         let sheshh = `${ughContent}\n\n${JSON.stringify(formattedContent, null, 2)}`;

         api.editMessage(sheshh, cliff.messageID);
      } catch (err) {
         console.error(err);
         return api.sendMessage('Error bai hindi ko ma acces ang link pasensya na.', event.threadID, event.messageID);
      }
   }
};

const wrapper = new GoatWrapper(module.exports);
wrapper.applyNoPrefix({ allowPrefix: true });