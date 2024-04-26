 const num = 3 //number of times spam gets banned -1, for example 5 times 6 times will get banned
 const timee = 10 // During `timee` spam `num` times will be banned
 module.exports.config = {
    name: "antispam",
    version: "1.0.0",
    permission: 0,
    credits: "nayan",
    description: "automatically ban spammer",
    prefix: true,
    category: "system",
    usages: "none",
    cooldowns: 0,
};

module.exports.languages = {
  "vi": {},
  "en": {}
}

module.exports.run = async function ({api, event})  {
  return api.sendMessage(`automatically ban users if spam ${num} times\ntime : ${timee}s`, event.threadID, event.messageID);
};

module.exports.handleEvent = async function ({ Users, Threads, api, event})  {
  let { senderID, messageID, threadID } = event;
  var datathread = (await Threads.getData(event.threadID)).threadInfo;
  
  if (!global.client.autoban) global.client.autoban = {};
  
  if (!global.client.autoban[senderID]) {
    global.client.autoban[senderID] = {
      timeStart: Date.now(),
      number: 0
    }
  };
  
  const threadSetting = global.data.threadData.get(threadID) || {};
  const prefix = threadSetting.PREFIX || global.config.PREFIX;
  if (!event.body || event.body.indexOf(prefix) != 0) return;
  
  if ((global.client.autoban[senderID].timeStart + (timee*1000)) <= Date.now()) {
    global.client.autoban[senderID] = {
      timeStart: Date.now(),
      number: 0
    }
  }
  else {
    global.client.autoban[senderID].number++;
    if (global.client.autoban[senderID].number >= num) {
      var namethread = datathread.threadName;
      const moment = require("moment-timezone");
      const timeDate = moment.tz("Asia/Manila").format("DD/MM/YYYY HH:mm:ss");
      let dataUser = await Users.getData(senderID) || {};
      let data = dataUser.data || {};
      if (data && data.banned == true) return;
      data.banned = true;
      data.reason = `spam bot ${num} times/${timee}s` || null;
      data.dateAdded = timeDate;
      await Users.setData(senderID, { data });
      global.data.userBanned.set(senderID, { reason: data.reason, dateAdded: data.dateAdded });
      global.client.autoban[senderID] = {
        timeStart: Date.now(),
        number: 0
      };
      api.sendMessage(senderID + " \nname : " + dataUser.name + `\nreason : spam bot ${num} times\nautomatically unban after ${timee} seconds\n\nreport sent to admins`, threadID,
    () => {
    var idad = global.config.ADMINBOT;
    for(let ad of idad) {
        api.sendMessage(`spam ban notification\n\nspam offenders ${num}/${timee}s\nname: ${dataUser.name} \nuser id: ${senderID}\ngroup ID: ${threadID} \ngroup name: ${namethread} \ntime: ${timeDate}`, 
          ad);
    }
    })
    }
  }
};
