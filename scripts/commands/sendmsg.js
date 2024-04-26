module.exports.config = {
	name: "sendmsg2",
	version: "0.0.2",
	permission: 2,
  prefix: true,
	credits: "Nayan",
	description: "sendmsg",
	category: "admin",
	usages: "sendmsg [user]/[thread] id msg",
    cooldowns: 5,
};

module.exports.run = async function({ api, event, args, utils }) {
    const moment = require("moment-timezone");
    var time = moment.tz("Asia/Manila").format("H:mm:ss");
    var year = moment.tz("Asia/Manila").format("D/MM/YYYY");
    var msg = args.splice(2).join(" ");
    if (args[0]=='user') {
        return api.sendMessage(`you have received a message from admin\ntime : ${time}\ndate : ${year}\nmessage : ` + msg, args[1]).then(
            api.sendMessage('successfully sent a message\nuser id : ' + args[1], event.threadID, event.messageID));
    } else {
            if (args[0]=='thread') { return api.sendMessage(`this group has received a message from the admin\ntime : ${time}\ndate : ${year}\nmessage : ` + msg, args[1]).then(
            api.sendMessage('successfully sent a message\ngroup id : ' + args[1], event.threadID, event.messageID))
            }
                else return api.sendMessage(`syntax error\ntry : sendmsg (user/thread) (id) (msg)`, event.threadID, event.messageID);
        }
    }