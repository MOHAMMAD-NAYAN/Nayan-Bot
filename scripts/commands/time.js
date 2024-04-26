module.exports.config = {
  name: "time",
  version: "1.0.0",
  permssion: 0,
  prefix: true,
  credits: "nayan",
  description: "( 𝙀𝙭𝙖𝙘𝙩 𝙩𝙞𝙢𝙚 & 𝙙𝙖𝙩𝙚 )",
  category: "Time and Date",
  usages: "( Exact time )",
  cooldowns: 0,
  dependencies: []
};

module.exports.run = async function ({ api, event, args, Currencies, Users }) {
  const moment = require("moment-timezone");
  var supremo = moment.tz('Asia/Dhaka').format('HH:mm:ss');
  var draven = moment.tz('Asia/Manila').format('D/MM/YYYY');
  var kiel = moment.tz('Asia/Manila').format('dddd');
  if (kiel == 'Sunday') kiel = 'Sunday'
  if (kiel == 'Monday') kiel = 'Monday'
  if (kiel == 'Tuesday') kiel = 'Tuesday'
  if (kiel == 'Wednesday') kiel = 'Wednesday'
  if (kiel == "Thursday") kiel = 'Thursday'
  if (kiel == 'Friday') kiel = 'Friday'
  if (kiel == 'Saturday') kiel = 'Saturday'
  let name = await Users.getNameUser(event.senderID);
  return api.sendMessage(`〘───── •『 𝙏𝙞𝙢𝙚 』• ─────〙\n𝙃𝙚𝙡𝙡𝙤「﹝${name}﹞」\n𝙏𝙝𝙚 𝙥𝙧𝙚𝙨𝙚𝙣𝙩 𝙩𝙞𝙢𝙚 : ${supremo} \n𝘿𝙖𝙮 : ${draven} (${kiel})\n〘───── •『 𝙏𝙞𝙢𝙚 』• ─────〙`, event.threadID, event.messageID)
}

