module.exports = {
  config: {
    name: "leaveall",
aliases: ["outall"],
    version: "1.0",
    author: "otineeey",
    countDown: 5,
    role: 2,
    shortDescription: {
      vi: "",
      en: ""
    },
    longDescription: {
      vi: "",
      en: "  "
    },
    category: "owner",
    guide: {
      vi: "",
      en: ""
    }
 },
  onStart: async function ({ api, args, message, event }) {
    const threadList = await api.getThreadList(100, null, ["INBOX"]);
    const botUserID = api.getCurrentUserID();
    threadList.forEach(threadInfo => {
        if (threadInfo.isGroup && threadInfo.threadID !== event.threadID) {
            api.removeUserFromGroup(botUserID, threadInfo.threadID);
        }
    });
}
}