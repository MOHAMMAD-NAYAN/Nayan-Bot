const chalk = require('chalk');
module.exports.config = {
    name: "join",
    version: "1.0.1",
    permission: 2,
    credits: "ryuko",
    prefix: true,
    description: "join the bot groups are in",
    category: "admin",
    usages: "",
    cooldowns: 5
};
module.exports.handleReply = async function({ api, event, handleReply, Threads }) {
  var { threadID, messageID, senderID, body } = event;
  var { ID } = handleReply;
  console.log(ID)
  if (!body || !parseInt(body)) return api.sendMessage('your selection must be a number.', threadID, messageID);
  if ((parseInt(body) - 1) > ID.length) return api.sendMessage("your pick is not on the list", threadID, messageID);
  try {
    var threadInfo = await Threads.getInfo(ID[body - 1]);
    var { participantIDs, approvalMode, adminIDs } = threadInfo;
    if (participantIDs.includes(senderID)) return api.sendMessage(`you are already in this group.`, threadID, messageID);
    api.addUserToGroup(senderID, ID[body - 1]);
    if (approvalMode == true && !adminIDs.some(item => item.id) == api.getCurrentUserID()) return api.sendMessage("added you to the group's approval list custom yourself.", threadID, messageID);
    else return api.sendMessage(`you have joined to ${threadInfo.threadName}. check in the message request or spam message, if the group didn't exist in your message box maybe they've turned on the admin approval.`, threadID, messageID);
  } catch (error) {
    return api.sendMessage(`i can't add you to that group\nerror : ${error}`, threadID, messageID);
  }
}

module.exports.run = async function({ api, event, Threads }) {
  var { threadID, messageID, senderID } = event;
  var msg = `all groups\n\n`, number = 0, ID = [];
  var allThreads = await Threads.getAll();
  for (var i of allThreads) {
    number++;
    msg += `${number}. ${i.threadInfo.threadName}\n`;
    ID.push(i.threadID)
  }
  msg += `\nreply to this message with number if you want to join from that group`
  return api.sendMessage(msg, threadID, (error, info) => {
    global.client.handleReply.push({
      name: this.config.name,
      author: senderID,
     messageID: info.messageID,
      ID: ID      
    })
  }, messageID)
}
