const fs = require('fs-extra');
const pathFile = __dirname + '/autoseen/autoseen.txt';

module.exports.config = {
  name: "autoseen",
  version: "1.0.0",
  permission: 2,
  credits: "ryuko",
  description: "turn on/off automatically seen when new messages are available",
  prefix: true,
  category: "system",
  usages: "on/off",
  cooldowns: 5,
};

module.exports.handleEvent = async ({ api, event, args }) => {
if (!fs.existsSync(pathFile))
   fs.writeFileSync(pathFile, 'false');
   const isEnable = fs.readFileSync(pathFile, 'utf-8');
   if (isEnable == 'true')
     api.markAsReadAll(() => {});
};

module.exports. run = async ({ api, event, args }) => {
   try {
     const logger = require("../../Nayan/catalogs/Nayanc.js");
     if (args[0] == 'on') {
       fs.writeFileSync(pathFile, 'true');
       api.sendMessage('the autoseen function is now enabled for new messages.', event.threadID, event.messageID);
     } else if (args[0] == 'off') {
       fs.writeFileSync(pathFile, 'false');
       api.sendMessage('the autoseen function has been disabled for new messages.', event.threadID, event.messageID);
     } else {
       api.sendMessage('incorrect syntax', event.threadID, event.messageID);
     }
   }
   catch(e) {
     logger("unexpected error while using autoseen function", "system");
   }
};