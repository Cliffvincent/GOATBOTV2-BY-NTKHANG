const axios = require("axios");
const monitoredURLs = new Set();

module.exports = {
    config: {
        name: "monitor",
        aliases: [],
        author: "Hazeyy/kira", // hindi ito collab, ako kasi nag convert :>
        version: "69",
        cooldowns: 5,
        role: 0,
        shortDescription: {
            en: "monitor repl's"
        },
        longDescription: {
            en: "monitor repl's"
        },
        category: "utility",
        guide: {
            en: "{p}{n} [url]"
        }
    },

    onStart: async function ({ api, event }) {
        const args = event.body.split(/\s+/);
        args.shift();

        if (args.length < 1) {
            api.sendMessage("🗨️ 𝖴𝗌𝖺𝗀𝖾: 𝗆𝗈𝗇𝗂𝗍𝗈𝗋 [ 𝗎𝗋𝗅 ] 𝗍𝗈 𝗌𝗍𝖺𝗋𝗍 𝗆𝗈𝗇𝗂𝗍𝗈𝗋𝗂𝗇𝗀", event.threadID);
            return;
        }

        const url = args[0];

        if (monitoredURLs.has(url)) {
            api.sendMessage(`⚠️ ${url} 𝗂𝗌 𝖺𝗅𝗋𝖾𝖺𝖽𝗒 𝖻𝖾𝗂𝗇𝗀 𝗆𝗈𝗇𝗂𝗍𝗈𝗋𝖾𝖽`, event.threadID);
            return;
        }

        try {
            monitoredURLs.add(url);
            api.sendMessage(`🕟 𝖠𝖽𝖽𝗂𝗇𝗀 𝖴𝖱𝖫 𝗍𝗈 𝗍𝗁𝖾 𝗆𝗈𝗇𝗂𝗍𝗈𝗋𝗂𝗇𝗀 𝗅𝗂𝗌𝗍...`, event.threadID);

            setTimeout(async () => {
                const response = await axios.post("https://hazeyy-up-api.kyrinwu.repl.co/api/uptime", { uptime: url });

                if (response.data && response.data.success === false) {
                    api.sendMessage(response.data.msg, event.threadID, event.messageId);
                    return;
                }

                api.sendMessage(`🟢 𝖴𝖱𝖫 ${url} 𝗌𝗍𝖺𝗋𝗍𝖾𝖽 𝗌𝗎𝖼𝖼𝖾𝗌𝗌𝖿𝗎𝗅𝗅𝗒`, event.threadID);
            }, 8000);
        } catch (error) {
            api.sendMessage("🔴 𝖠𝗇 𝖾𝗋𝗋𝗈𝗋 𝗈𝖼𝖼𝗎𝗋𝖾𝖽 𝗐𝗁𝗂𝗅𝖾 𝗌𝗍𝖺𝗋𝗍𝗂𝗇𝗀 𝗍𝖺𝗋𝗍𝗂𝗇𝗀 𝗍𝗁𝖾 𝖴𝗋𝗈𝗂 𝗆𝗈𝗇𝗂𝗍𝗈𝗋𝗂𝗇𝗀.", event.threadID);
            console.error(error);
        } finally {
            monitoredURLs.delete(url);
        }
    }
};