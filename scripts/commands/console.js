module.exports.config = {
  name: "console",
  version: "1.0.0",
  permission: 3,
  credits: "Nayan",
  prefix: true,
  description: "",
  category: "system",
  usages: "",
  cooldowns: 0
};
module.exports.handleEvent = async function ({ api, args, Users, event, Threads, utils, client }) {
let { messageID, threadID, senderID, mentions } = event;
const chalk = require('chalk');
const moment = require("moment-timezone");
var time= moment.tz("Asia/Dhaka").format("LLLL");   
const thread = global.data.threadData.get(event.threadID) || {};
if (typeof thread["console"] !== "undefined" && thread["console"] == true) return;
if (event.senderID == global.data.botID) return;
let nameBox;
let userorgroup;
let threadid;
let Nayan;
let Nayan1;
try {
  const isGroup = await global.data.threadInfo.get(event.threadID).threadName || "name does not exist";
  nameBox = `${isGroup}\n`;
  threadid = `${threadID}\n`;
  Nayan = chalk.blue('group name : ');
  Nayan1 = chalk.blue('group id : ');
  userorgroup = `GROUP CHAT MESSAGE`;
} catch (error) {
  Nayan = "";
  Nayan1 = "";
  threadid = "";
  nameBox = "";
  userorgroup = `PRIVATE CHAT MESSAGE`;
}
var nameUser = await Users.getNameUser(event.senderID)
var msg = event.body||"photos, videos or special characters";

console.log(`\n` + chalk.green(`⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯\n              ${userorgroup}\n⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯\n`) + `\n` + Nayan + nameBox + Nayan1 + threadid + chalk.blue(`user name : ${chalk.white(nameUser)}`) + "\n" + chalk.blue(`user id : ${chalk.white(senderID)}`) + '\n' + chalk.blue(`message : ${chalk.blueBright(msg)}`) + `\n\n` + chalk.green(`⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯\n        ${time}`) + `\n` + chalk.green(`⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯`) + `\n`);
}

module.exports.run = async function ({ api, args, Users, event, Threads, utils, client }) {

}