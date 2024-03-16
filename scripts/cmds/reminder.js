const parseTime = (timeString) => {
  const [hours, minutes, seconds] = timeString.split('|').map(Number);
  return { hours, minutes, seconds };
};

module.exports = {
  config: {
    name: "reminder",
    version: "1.0",
    author: "Samir Œ",
    shortDescription: "Set a reminder",
    longDescription: "Set a reminder to receive a message after a specified time.",
    category: "Utility",
    guide: "{prefix}reminder <message> | <hours> | <minutes> | <seconds>",
  },

  onStart: async function ({ api, event, args, prefix }) {
    const reminderInfo = args.join(" ").split("|").map((info) => info.trim());

    if (reminderInfo.length !== 4) {
      return api.sendMessage(`Invalid command usage. Use \`${prefix}reminder <message> | <hours> | <minutes> | <seconds>\``, event.threadID);
    }

    const [message, hours, minutes, seconds] = reminderInfo;

    const userID = event.senderID;
    const reminderTime = parseTime(`${hours}|${minutes}|${seconds}`);
    const reminderMilliseconds = (reminderTime.hours * 3600 + reminderTime.minutes * 60 + reminderTime.seconds) * 1000;

    setTimeout(() => {
      api.sendMessage(message, userID);
    }, reminderMilliseconds);

    return api.sendMessage(`Reminder set! You will receive "${message}" after ${hours} hours, ${minutes} minutes, and ${seconds} seconds.`, event.threadID);
  }
};
