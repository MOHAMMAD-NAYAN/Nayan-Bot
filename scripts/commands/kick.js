module.exports.config = {
  name: "kick",
  version: "1.0.0", 
  permssion: 2,
  prefix: true,
  credits: "Mirai Team",
  description: "Xoá người bạn cần xoá khỏi nhóm bằng cách tag",
  category: "other", 
  usages: "[tag]", 
  cooldowns: 0,
};

module.exports.run = function({ api, event }) {
  var mention = Object.keys(event.mentions);
  return api.getThreadInfo(event.threadID, (err, info) => {
    if (err) return api.sendMessage("An error has occurred!",event.threadID);
    if (!info.adminIDs.some(item => item.id == api.getCurrentUserID())) return api.sendMessage('Need group admin rights\Please add and try again!', event.threadID, event.messageID);
    if(!mention[0]) return api.sendMessage("You must tag the person to kick",event.threadID);
    if (info.adminIDs.some(item => item.id == event.senderID)) {
      for (let o in mention) {
        setTimeout(() => {
          api.removeUserFromGroup(mention[o],event.threadID) 
        },3000)
      }
    }
  })
      }
