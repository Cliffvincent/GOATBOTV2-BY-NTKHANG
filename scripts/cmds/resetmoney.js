module.exports.config = {
    name: "resetmoney",
    version: "1.0.0",
    hasPermission: 2,
    credits: "manhG",
    description: "Reset the money of all members in the group to 0",
    commandCategory: "admin",
    usages: "[cc], [del], [all]",
    cooldown: 5
};

module.exports.onStart = async ({ api, Threads, Currencies, getText }) => {
    const threads = await Threads.getAll(["threadID", "name"]);
    const promises = [];
    for (const thread of threads) {
        const threadID = thread.threadID;
        const data = (await Threads.getData(threadID)).data || {};
        if (typeof data.resetmoney !== "undefined" && !data.resetmoney) {
            continue;
        }
        data.resetmoney = true;
        await Threads.setData(threadID, { data });
        const message = getText("resetMoneyMessage", { name: thread.name });
        promises.push(api.sendMessage(message, threadID));
        const users = await api.getThreadInfo(threadID);
        for (const user of users.userInfo) {
            const currenciesData = await Currencies.getData(user.id);
            if (currenciesData) {
                await Currencies.setData(user.id, { money: 0 });
            }
        }
    }
    await Promise.all(promises);
};