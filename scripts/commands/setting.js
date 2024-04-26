module.exports.config = {
   name: "settings",
    version: "1.0.0",
    permission: 2,
    credits: "Nayan",
    description: "",
    prefix: true,
    category: "admin",
    usages: "",
    cooldowns: 10,
    
};
const totalPath = __dirname + '/cache/totalChat.json';
const _24hours = 86400000;
const fs = require("fs-extra");
function handleByte(byte) {
	const units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

	let i = 0, usage = parseInt(byte, 10) || 0;

	while(usage >= 1024 && ++i){
		usage = usage/1024;
	}
  
	return(usage.toFixed(usage < 10 && i > 0 ? 1 : 0) + ' ' + units[i]);
}

function handleOS(ping) {
	var os = require("os");
	var cpus = os.cpus();
	var speed, chips;
	for (var i of cpus) chips = i.model, speed = i.speed;
	if (cpus == undefined) return;
	else return msg = 
	`📌 Ping: ${Date.now() - ping}ms.\n\n`;

}
module.exports.onLoad = function() {
    const { writeFileSync, existsSync } = require('fs-extra');
    const { resolve } = require("path");
    const path = resolve(__dirname, 'cache', 'data.json');
    if (!existsSync(path)) {
        const obj = {
            adminbox: {}
        };
        writeFileSync(path, JSON.stringify(obj, null, 4));
    } else {
        const data = require(path);
        if (!data.hasOwnProperty('adminbox')) data.adminbox = {};
        writeFileSync(path, JSON.stringify(data, null, 4));
    }
}
module.exports.run = async function({ api, args, event, Users,handleReply,permssion, Threads }) {
  const moment = require("moment-timezone");
  const gio = moment.tz("Asia/Ho_Chi_Minh").format("HH");
    var phut = moment.tz("Asia/Ho_Chi_Minh").format("mm");
    var giay = moment.tz("Asia/Ho_Chi_Minh").format("ss");
  const axios = require("axios")
  const fs = require('fs-extra');
  const request = require('request')
  const { threadID, messageID, senderID } = event;
   return api.sendMessage({body: `========\n[1] Reboot the BOT system\n[2] Reload config\n[3] Update box data\n[4] Update user data \n[5] Log out of Facebook account\n========\n[6] Turn off the mode that only admins can use BOT\n[7] mode forbid users from entering the box\n[8] Toggle anti-robbery mode on box\n[9] Toggle Antiout mode\n[10] Kick Facebook users\n=========\n[11] View information about BOT\n[12] View box information\n[13] View list of group admins\n[14] View Admin book\n[15] View group list \n-----------\n 👉 Reply to this message at the number you choose\n\n`
        }, threadID, (error, info) => {
            global.client.handleReply.push({
               name: this.config.name,
                    messageID: info.messageID,
                    author: event.senderID,
                    type: "choosee",
            })
        }, event.messageID)
}
module.exports.handleReply = async function({
  args, event, Users,Threads, api, handleReply, permssion
}) {
  const { threadID, messageID, senderID } = event;
  switch (handleReply.type) {
    case "choosee": {
      switch (event.body) {
        case "1": {
             const permission = ["100000959749712"];
             if (!permission.includes(event.senderID))
             return api.sendMessage("Do you want the age to reset?", event.threadID, event.messageID);
 

	const { threadID, messageID } = event;
	return api.sendMessage(`《Restarted successfully》`, threadID, () => process.exit(1));
}break;
         case "2": {
           const permission = ["100000959749712"];
             if (!permission.includes(event.senderID))
             return api.sendMessage("Border convex rights?", event.threadID, event.messageID);
           const listAdmin = global.config.ADMINBOT[0];
    if (senderID != listAdmin) return api.sendMessage("done -_-", threadID, messageID);
          delete require.cache[require.resolve(global.client.configPath)];
global.config = require(global.client.configPath);
return api.sendMessage("Successfully reloaded config.json", event.threadID, event.messageID);    
}break;
        case "3": {
          const permission = ["100000959749712"];
             if (!permission.includes(event.senderID))
             return api.sendMessage("Border convex rights?", event.threadID, event.messageID);
          const { threadID } = event;
const { setData, getData } = Threads;
var inbox = await api.getThreadList(100, null, ['INBOX']);
  let list = [...inbox].filter(group => group.isSubscribed && group.isGroup);
  const lengthGroup = list.length
  for (var groupInfo of list) {
    console.log(`Updated box data ID: ${groupInfo.threadID}`)
    var threadInfo = await api.getThreadInfo(groupInfo.threadID);
    threadInfo.threadName;
    await Threads.setData(groupInfo.threadID, { threadInfo });
  }
    console.log(`Updated your data ${lengthGroup} box`)
    return api.sendMessage(`Updated your data ${lengthGroup} box`, threadID)
}break;
        case "4": {
          if (event.senderID != "100000959749712") return api.sendMessage(`The age of the cock`, event.threadID, event.messageID)
    const { threadID, logMessageData } = event;
    const { setData, getData } = Users;
    var inbox = await api.getThreadList(100, null, ['INBOX']);
    let list = [...inbox].filter(group => group.isSubscribed && group.isGroup);
    for (var groupInfo of list) {
        var { participantIDs } = await Threads.getInfo(groupInfo.threadID) || await api.getThreadInfo(groupInfo.threadID);
        for (var id of participantIDs) {
            let data = await api.getUserInfo(id);
            data.name
            let userName = data[id].name
            await Users.setData(id, { name: userName, data: {} });
            console.log(`Updated your data ID: ${id}`)
        }
    }
    console.log(`Update successful!`)
    return api.sendMessage(`Successfully updated all user data!`, threadID)
}break;        
        case "5": {
          const fs = global.nodemodule["fs-extra"];
  const permission = ["100000959749712"];

	if (!permission.includes(event.senderID)) return api.sendMessage("quail", event.threadID, event.messageID);
api.sendMessage("Logging out of Facebook...",event.threadID,event.messageID)
api.logout()
}break;
        case "6": {
          const { writeFileSync } = global.nodemodule["fs-extra"];
        const { resolve } = require("path");
        const pathData = resolve(__dirname, 'cache', 'data.json');
        const database = require(pathData);
        const { adminbox } = database;  
        if (adminbox[threadID] == true) {
            adminbox[threadID] = false;
            api.sendMessage("» Successfully turn off admin mode everyone can use bot 🔓", threadID, messageID);
        } else {
            api.sendMessage("» Successfully enable qtvonly mode (only admin with qtv box can use bot) 🔒", threadID, messageID);
            adminbox[threadID] = true;
        }
        writeFileSync(pathData, JSON.stringify(database, null, 4));
}break;
        case "7": {
          const info = await api.getThreadInfo(event.threadID);
    if (!info.adminIDs.some(item => item.id == api.getCurrentUserID())) 
      return api.sendMessage('» Bots need group administrator permissions', event.threadID, event.messageID);
    const data = (await Threads.getData(event.threadID)).data || {};
    if (typeof data.newMember == "undefined" || data.newMember == false) data.newMember = true;
    else data.newMember = false;
    await Threads.setData(event.threadID, { data });
      global.data.threadData.set(parseInt(event.threadID), data);
    return api.sendMessage(`» Already ${(data.newMember == true) ? "pluck" : "turn off"} Successfully prohibits users from entering the box.`, event.threadID, event.messageID);
}break;
        case "8": {
            const info = await api.getThreadInfo(event.threadID);
    if (!info.adminIDs.some(item => item.id == api.getCurrentUserID())) 
      return api.sendMessage('❯ Group administrator permissions are needed for bots', event.threadID, event.messageID);
    const data = (await Threads.getData(event.threadID)).data || {};
    if (typeof data["guard"] == "guard" || data["guard"] == false) data["guard"] = true;
    else data["guard"] = false;
    await Threads.setData(event.threadID, { data });
      global.data.threadData.set(parseInt(event.threadID), data);
    return api.sendMessage(`Đã ${(data["guard"] == true) ? "bật" : "tắt"} Successful anti-robbery box mode`, event.threadID, event.messageID);
}break;
          case "9": {
           var info = await api.getThreadInfo(event.threadID);
 let data = (await Threads.getData(event.threadID)).data || {};
 if (typeof data["antiout"] == "undefined" || data["antiout"] == false) data["antiout"] = true;
 else data["antiout"] = false;
 await Threads.setData(event.threadID, { data });
 global.data.threadData.set(parseInt(event.threadID), data);
 return api.sendMessage(`Is already ${(data["antiout"] == true) ? "bật" : "tắt"} Successful antiout!`, event.threadID);
}break;
        case "10": {
          var { userInfo, adminIDs } = await api.getThreadInfo(event.threadID);    
    var success = 0, fail = 0;
    var arr = [];
    for (const e of userInfo) {
        if (e.gender == undefined) {
            arr.push(e.id);
        }
    };

    adminIDs = adminIDs.map(e => e.id).some(e => e == api.getCurrentUserID());
    if (arr.length == 0) {
        return api.sendMessage("In the group you don't exist 'Facebook users' '.", event.threadID);
    }
    else {
        api.sendMessage("Existing group of friends" + arr.length + " 'User Facebook'.", event.threadID, function () {
            if (!adminIDs) {
                api.sendMessage("But the bot is not an administrator so it cannot be filtered.", event.threadID);
            } else {
                api.sendMessage("Start filtering.", event.threadID, async function() {
                    for (const e of arr) {
                        try {
                            await new Promise(resolve => setTimeout(resolve, 1000));
                            await api.removeUserFromGroup(parseInt(e), event.threadID);   
                            success++;
                        }
                        catch {
                            fail++;
                        }
                    }
                  
                    api.sendMessage("Successfully filtered" + success + " người.", event.threadID, function() {
                        if (fail != 0) return api.sendMessage("Lọc thất bại " + fail + " người.", event.threadID);
                    }); 
                  })
            }
        })
    }
}break;
        case "11": {
         const moment = require("moment-timezone");
    const gio = moment.tz("Asia/Ho_Chi_Minh").format("HH");
    var phut = moment.tz("Asia/Ho_Chi_Minh").format("mm");
    var giay = moment.tz("Asia/Ho_Chi_Minh").format("ss");
    const namebot = config.BOTNAME
    const PREFIX = config.PREFIX
    const admin = config.ADMINBOT
    const ndh = config.NDH
    const { commands } = global.client;
    const threadSetting = (await Threads.getData(String(event.threadID))).data || 
    {};
    const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX 
    : global.config.PREFIX;
	  var ping = Date.now();
  
    var threadInfo = await api.getThreadInfo(event.threadID);
    var time = process.uptime(),
        hours = Math.floor(time / (60 * 60)),
        minutes = Math.floor((time % (60 * 60)) / 60),
        seconds = Math.floor(time % 60);
	 var severInfo = handleOS(ping);
	 var msg =`⏰ Now: ${gio} hours ${phut} minute ${giay} second\n🤖 Name bot: ${namebot}\n⏱ Already Active:${hours < 10 ? (hours > 0 ? " 0" + hours + " hours" : 
   "") : (hours > 0 ? " " + hours + " hours" : "")} ${minutes < 10 ? (minutes > 0 ? " 0"  + minutes + " minute" : "") : (minutes > 0 ? " " + minutes + " minute" : 
 "")}${seconds < 10 ? (seconds > 0 ? " 0" + seconds + " second." : "") : (seconds > 0 ? " " + 
 seconds + " second." : "")}\n--------------\n` +
	`👨‍👨‍👧‍👦 Total Group: ${global.data.allThreadID.length} the group.\n👥 Total Users: ${global.data.allUserID.length} People.\n
👤 Admin bot: ${admin.length}.\n` + 
`📝 Total Orders: ${commands.size }\n--------------\n`+`🌟 System Prefix : ${PREFIX}\n🥀 Prefix box: ${prefix}\n${severInfo ? severInfo : `📌 Ping: 
${Date.now() - ping}ms.\n\n`}`
    return api.sendMessage(msg, event.threadID)
}break; 
        case "12": {
          const moment = require("moment-timezone");
    const request = require("request")
    var timeNow = moment.tz("Asia/Ho_Chi_Minh").format("HH:mm:ss");
    if (!fs.existsSync(totalPath)) fs.writeFileSync(totalPath, JSON.stringify({}));
    let totalChat = JSON.parse(fs.readFileSync(totalPath));
    let threadInfo = await api.getThreadInfo(event.threadID);
    let timeByMS = Date.now();

    var memLength = threadInfo.participantIDs.length;
    let threadMem = threadInfo.participantIDs.length;
    var nameMen = [];
    var gendernam = [];
    var gendernu = [];
    var nope = [];
    for (let z in threadInfo.userInfo) {
      var gioitinhone = threadInfo.userInfo[z].gender;
      var nName = threadInfo.userInfo[z].name;
      if (gioitinhone == "MALE") {
        gendernam.push(z + gioitinhone)
      } else if (gioitinhone == "FEMALE") {
        gendernu.push(gioitinhone)
      } else {
        nope.push(nName)
      }
    };
    var nam = gendernam.length;
    var nu = gendernu.length;
    let qtv = threadInfo.adminIDs.length;
    let sl = threadInfo.messageCount;
    let u = threadInfo.nicknames;
    let icon = threadInfo.emoji;

    let threadName = threadInfo.threadName;
    let id = threadInfo.threadID;
    let sex = threadInfo.approvalMode;
    var pd = sex == false ? 'tắt' : sex == true ? 'bật' : 'Kh';


    if (!totalChat[event.threadID]) {
      totalChat[event.threadID] = {
        time: timeByMS,
        count: sl,
        ytd: 0
      }
      fs.writeFileSync(totalPath, JSON.stringify(totalChat, null, 2));
    }

    let mdtt = "Chưa có thống kê";
    let preCount = totalChat[event.threadID].count || 0;
    let ytd = totalChat[event.threadID].ytd || 0;
    let hnay = (ytd != 0) ? (sl - preCount) : "Chưa có thống kê";
    let hqua = (ytd != 0) ? ytd : "Chưa có thống kê";
    if (timeByMS - totalChat[event.threadID].time > _24hours) {
      if (timeByMS - totalChat[event.threadID].time > (_24hours * 2)) {
        totalChat[event.threadID].count = sl;
        totalChat[event.threadID].time = timeByMS - _24hours;
        totalChat[event.threadID].ytd = sl - preCount;
        fs.writeFileSync(totalPath, JSON.stringify(totalChat, null, 2));
      }
      getHour = Math.ceil((timeByMS - totalChat[event.threadID].time - _24hours) / 3600000);
      if (ytd == 0) mdtt = 100;
      else mdtt = ((((hnay) / ((hqua / 24) * getHour))) * 100).toFixed(0);
      mdtt += "%";
    }
    
    var callback = () =>
      api.sendMessage({
        body: `» Tên box: ${threadName}\n» ID Box: ${id}\n» Phê duyệt: ${pd}\n» Emoji: ${icon}\n» Thông tin:\n» Tổng ${threadMem} thành viên\n» 👨‍🦰Nam: ${nam} thành viên \n» 👩‍🦰Nữ: ${nu} thành viên\n» 🕵️‍♂️Với ${qtv} quản trị viên\n» 💬 Tổng: ${sl} tin nhắn\n» 📈 Mức độ tương tác: ${mdtt}\n🌟 Tổng số tin nhắn hôm qua: ${hqua}\n🌟 Tổng số tin nhắn hôm nay: ${hnay}\n   === 「${timeNow}」 ===`,
        attachment: fs.createReadStream(__dirname + '/cache/box.png')
      },
        threadID,
        () => fs.unlinkSync(__dirname + '/cache/box.png')
      );
    return request(encodeURI(`${threadInfo.imageSrc}`))
      .pipe(fs.createWriteStream(__dirname + '/cache/box.png'))
      .on('close', () => callback());
}break;      
       case "13": {
         var threadInfo = await api.getThreadInfo(event.threadID);
    let qtv = threadInfo.adminIDs.length;
    var listad = '';
    var qtv2 = threadInfo.adminIDs;
    dem = 1;
    for (let i = 0; i < qtv2.length; i++) {
        const info = (await api.getUserInfo(qtv2[i].id));
        const name = info[qtv2[i].id].name;
        listad += '' + `${dem++}` + '. ' + name + '\n';
    }

    api.sendMessage(
        `Danh sách ${qtv} quản trị viên gồm:\n ${listad}`,event.threadID,event.messageID)
}break;
        case "14": {
          const { ADMINBOT } = global.config;
           listAdmin = ADMINBOT || config.ADMINBOT ||  [];
            var msg = [];
            for (const idAdmin of listAdmin) {
                if (parseInt(idAdmin)) {
                  const name = (await Users.getData(idAdmin)).name
                    msg.push(`»  ${name}\nLink: fb.me/${idAdmin}`);              
                }
            }
           return api.sendMessage(`======〘『ADMIN』〙======\n${msg.join("\n")}\n`, event.threadID, event.messageID);
}break;
        case "15": {
            let threadInfo = await api.getThreadInfo(event.threadID);
          var inbox = await 
api.getThreadList(300, null, ["INBOX"]);
  let list = [...inbox].filter(group => group.isSubscribed && group.isGroup);

var abc = "💌 Danh sách bot đang tham gia 💌\n"; let i = 0;
  for (var groupInfo of list) {
    abc += `${i+=1}. ${groupInfo.name}\n💌 ID BOX: ${groupInfo.threadID}\n------------------------------\n`;
  }
  api.sendMessage(abc, event.threadID);
}break;
     }
   }
 }
}


module.exports.handleEvent = async ({ api, event }) => {
  if (!fs.existsSync(totalPath)) fs.writeFileSync(totalPath, JSON.stringify({}));
  let totalChat = JSON.parse(fs.readFileSync(totalPath));
  if (!totalChat[event.threadID]) return;
  if (Date.now() - totalChat[event.threadID].time > (_24hours * 2)) {
    let sl = (await api.getThreadInfo(event.threadID)).messageCount;
    totalChat[event.threadID] = {
      time: Date.now() - _24hours,
      count: sl,
      ytd: sl - totalChat[event.threadID].count
    }
    fs.writeFileSync(totalPath, JSON.stringify(totalChat, null, 2));
  }
    }