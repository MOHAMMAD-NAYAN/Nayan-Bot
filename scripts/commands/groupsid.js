module.exports.config = {
  name: "tid",	
  version: "1.0.0", 
	permission: 0,
	credits: "ryuko",
	description: "get box id", 
	prefix: false,
	category: "without prefix",
	usages: "groupid",
	cooldowns: 5, 
	dependencies: '',
};

module.exports.run = async function({ api, event }) {
  api.sendMessage("group id : "+event.threadID, event.threadID, event.messageID);
};