module.exports.config = {
	name: "banned",
	version: "1.0.0",
	permission: 2,
	credits: "unknown",
  prefix: false,
	description: "ban list",
	category: "admin",
	usages: "[thread], [user]",
	cooldowns: 5,
};
module.exports.run = async function({api, args, Users, event, Threads, client}) {

	if (args[0] == "user") {
		var list = global.data.userBanned || [];
		var listuserbanned = [];
		for (var iduser of list) {
			const banned = (await Users.getData(iduser))
				.banned;
			if (banned == 1) {
				listuserbanned.push({
					id: iduser
				});
			}
		}
		var msg = "";
		for (let i = 0; i < listuserbanned.length; i++) {
			const name = (await Users.getData(listuserbanned[i].id))
				.name;
			msg += `${i+1}. Name: ${name}\nID: ${listuserbanned[i].id}\n`
		}
		msg == "" ? api.sendMessage("Currently no user is banned", event.threadID, event.messageID) : api.sendMessage("❎Users who have been banned from the system include bots:\n\n" + msg, event.threadID, event.messageID);
	}
	else if (args[0] == "thread") {
		var list = global.data.threadBanned || [];
		var listthreadbanned = [];
		for (var idthread of list) {
			const banned = (await Threads.getData(idthread))
				.banned;
			if (banned == 1) {
				listthreadbanned.push({
					id: idthread
				});
			}
		}
		var msg = "";
		for (let i = 0; i < listthreadbanned.length; i++) {
			let namethread = (await api.getThreadInfo(listthreadbanned[i].id))
				.threadName;
			msg += `${i+1}. Name: ${namethread}\nID: ${listthreadbanned[i].id}`;
		}
		msg.length == 0 ? api.sendMessage("No thread is currently banned", event.threadID, event.messageID) : api.sendMessage("❎Those threads that have been banned from the system include bots:\n\n" + msg, event.threadID, event.messageID);
	}
	else api.sendMessage("error", event.threadID, event.messageID);
}
