module.exports.config = {
    name: "steal",
    version: "1.0.0",
    hasPermission: 0,
    credits: "Mirai Team",
    description: "Steal some money from another user",
    commandCategory: "economy",
    usages: "",
    cooldowns: 60
};

module.exports.onStart = async function ({ api, event, Users, Currencies }) {
    var alluser = global.data.allUserID;
    let victim = alluser[Math.floor(Math.random() * alluser.length)];
    let nameVictim = (await Users.getData(victim)).name;
    if (victim == api.getCurrentUserID() || victim == event.senderID) return api.sendMessage('Sorry, you can\t steal from this person. Please try again.', event.threadID, event.messageID);
    var route = Math.floor(Math.random() * 2);
    if (route == 0) {
        const moneydb = (await Currencies.getData(victim)).money;
        var money = Math.floor(Math.random() * 1000) + 1;
        if (moneydb <= 0 || moneydb == undefined) {
            return api.sendMessage(`You just stole from ${nameVictim}, but they are a poor person and have nothing to steal.`, event.threadID, event.messageID);
        } else if (moneydb >= money) {
            await Currencies.increaseMoney(victim, -money);
            await Currencies.increaseMoney(event.senderID, money);
            return api.sendMessage(`You just stole ${money} dollars from ${nameVictim}.`, event.threadID, event.messageID);
        } else if (moneydb < money) {
            await Currencies.increaseMoney(victim, -moneydb);
            await Currencies.increaseMoney(event.senderID, moneydb);
            return api.sendMessage(`You just stole all ${moneydb} dollars from ${nameVictim}.`, event.threadID, event.messageID);
        }
    } else if (route == 1) {
        var name = (await Users.getData(event.senderID)).name;
        var moneyuser = (await Currencies.getData(event.senderID)).money;
        if (moneyuser <= 0) {
            return api.sendMessage("You don't have any money to steal. Work to earn some capital!", event.threadID, event.messageID);
        } else {
            await Currencies.increaseMoney(event.senderID, -moneyuser);
            await Currencies.increaseMoney(victim, Math.floor(moneyuser / 2));
            return api.sendMessage(`You have been caught by ${nameVictim} and lost ${moneyuser} dollars.`, event.threadID, () => api.sendMessage({
                body: `Congratulations ${nameVictim}! You caught ${name} and received a reward of ${Math.floor(moneyuser / 2)} dollars!`,
                mentions: [{
                    tag: nameVictim,
                    id: victim
                }, {
                    tag: name,
                    id: event.senderID
                }]
            }, event.threadID));
        }
    }
          }