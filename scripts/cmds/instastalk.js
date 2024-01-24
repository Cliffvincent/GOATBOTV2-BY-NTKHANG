const axios = require("axios");

module.exports = {
  config: {
    name: "instastalk",
    version: "1.0",
    author: "MILAN",
    countDown: 10,
    role: 0,
    shortDescription: {
      vi: "Tìm kiếm nhạc và nghe.",
      en: "Get Instagram user info."
    },
    longDescription: {
      vi: "Lệnh này cho phép bạn lấy thông tin về một người dùng Instagram, bao gồm tên người dùng, họ và tên đầy đủ, tiểu sử, số lượng người theo dõi, số lượng người đang theo dõi, danh mục, PK, trạng thái riêng tư, trạng thái xác minh, số lượng người theo dõi chung, sẵn có hướng dẫn, phương pháp liên hệ kinh doanh và URL bên ngoài. Nó cũng hiển thị hình đại diện của người dùng.",
      en: "This command allows you to retrieve information about an Instagram user, such as their username, full name, biography, follower count, following count, category, PK, privacy status, verification status, mutual followers count, guide availability, business contact method, and external URL. It also displays the user's profile picture."
    },
    category: "info",
    guide: {
      en: "{pn} <username>",
      vi: "{pn} <tên tài khoản}"
    }
  },

  onStart: async function ({ api, event, args, message }) {
    try {
      const username = args.join(" ");
      if (!username)
        return api.sendMessage(`Please provide an Instagram username.`, event.threadID, event.messageID);

      const response = await axios.get(`https://milanbhandari.imageapi.repl.co/iginfo?username=${username}`);

      if (response.data.length > 0) {
        const data = response.data[0];
        const message = {
          body: `===${data.full_name}===
────────────
❏ Username: ${data.username}
❏ Full Name: ${data.full_name}
❏ Biography: ${data.biography}
❏ Follower Count: ${data.follower_count}
❏ Following Count: ${data.following_count}
❏ Category: ${data.category}
❏ PK: ${data.pk}
❏ Is Private: ${data.is_private}
❏ Is Verified: ${data.is_verified}
❏ Mutual Followers Count: ${data.mutual_followers_count}
❏ Has Guides: ${data.has_guides}
❏ Business Contact Method: ${data.business_contact_method}
❏ External URL: ${data.external_url}
`,
          attachment: await global.utils.getStreamFromURL(data.profile_pic_url_hd)
        };

        return api.sendMessage(message, event.threadID);
      } else {
        return api.sendMessage(`No Instagram user found with that username.`, event.threadID);
      }
    } catch (error) {
      console.error(error);
      message.reply("An error occurred while fetching Instagram user data.");
    }
  }
};