const fs = require('fs');
const request = require('request');

module.exports.config = {
  name: "sendmsg",
	version: "0.0.2",
	permission: 2,
  prefix: true,
	credits: "Nayan",
	description: "sendmsg",
	category: "admin",
	usages: "sendmsg [user]/[thread] id msg",
    cooldowns: 5,
};

let atmDir = [];

const getAtm = (atm, body) => new Promise(async (resolve) => {
    let msg = {}, attachment = [];
    msg.body = body;
    for(let eachAtm of atm) {
        await new Promise(async (resolve) => {
            try {
                let response =  await request.get(eachAtm.url),
                    pathName = response.uri.pathname,
                    ext = pathName.substring(pathName.lastIndexOf(".") + 1),
                    path = __dirname + `/cache/${eachAtm.filename}.${ext}`
                response
                    .pipe(fs.createWriteStream(path))
                    .on("close", () => {
                        attachment.push(fs.createReadStream(path));
                        atmDir.push(path);
                        resolve();
                    })
            } catch(e) { console.log(e); }
        })
    }
    msg.attachment = attachment;
    resolve(msg);
})

module.exports.handleReply = async function ({ api, event, handleReply, Users, Threads }) {
    const moment = require("moment-timezone");
      var gio = moment.tz("Asia/Manila").format("DD/MM/YYYY - HH:mm:s");
    const { threadID, messageID, senderID, body } = event;
    let name = await Users.getNameUser(senderID);
    switch (handleReply.type) {
        case "sendnoti": {
            let text = `====== [ User Reply ] ======\n--------------\n『𝗧𝗶𝗺𝗲』: ${gio}\n\n--------------\n『Reply』 : ${body}\n\n--------------\nUser Name ${name}  From Group ${(await Threads.getInfo(threadID)).threadName || "Unknow"}`;
            if(event.attachments.length > 0) text = await getAtm(event.attachments, `====== [ User Reply ] ======\n--------------\n『𝗧𝗶𝗺𝗲』: ${gio}\n\n--------------\n『Reply』 : ${body}\n\n--------------\nUser Name: ${name} From Group ${(await Threads.getInfo(threadID)).threadName || "Unknow"}`);
            api.sendMessage(text, handleReply.threadID, (err, info) => {
                atmDir.forEach(each => fs.unlinkSync(each))
                atmDir = [];
                global.client.handleReply.push({
                    name: this.config.name,
                    type: "reply",
                    messageID: info.messageID,
                    messID: messageID,
                    threadID
                })
            });
            break;
        }
        case "reply": {
            let text = `==== [MESSAGE FROM 𝑨𝑫𝑴𝑰𝑵 ] ====\n--------------\n『𝗧𝗶𝗺𝗲』: ${gio}\n\n--------------\n『Message』 : ${body}\n\n--------------\n『Admin Name』 ${name}\n--------------\nReply to this Message if you want to respond to this Announce`;
            if(event.attachments.length > 0) text = await getAtm(event.attachments, `${body}==== [ MESSAGE FROM 𝑨𝑫𝑴𝑰𝑵 ] ====\n--------------\n『𝗧𝗶𝗺𝗲』: ${gio}\n\n--------------\n『Admin Name』 ${name}\n--------------\nReply to this Message if you want to respond to this Announce.`);
            api.sendMessage(text, handleReply.threadID, (err, info) => {
                atmDir.forEach(each => fs.unlinkSync(each))
                atmDir = [];
                global.client.handleReply.push({
                    name: this.config.name,
                    type: "sendnoti",
                    messageID: info.messageID,
                    threadID
                })
            }, handleReply.messID);
            break;
        }
    }
}

module.exports.run = async function ({ api, event, args, Users }) {
    const moment = require("moment-timezone");
      var gio = moment.tz("Asia/Manila").format("DD/MM/YYYY - HH:mm:s");
    const { threadID, messageID, senderID, messageReply } = event;
    if (!args[0]) return api.sendMessage("Please input message", threadID);
    let allThread = global.data.allThreadID || [];
    let can = 0, canNot = 0;
    let text = `====== [ MESSAGE FROM ADMIN ] ======\n--------------\n『𝗧𝗶𝗺𝗲』: ${gio}\n\n--------------\n『MESSAGE』 : ${args.join(" ")}\n\n--------------\n『ADMIN NAME』 ${await Users.getNameUser(senderID)} \n--------------\nReply to this Message if you want to respond to this Announce`;
    if(event.type == "message_reply") text = await getAtm(messageReply.attachments, `====== [ MESSAGE FROM ADMIN ] ======\n--------------\n『𝗧𝗶𝗺𝗲』: ${gio}\n\n--------------\n『MESSAGE』 : ${args.join(" ")}\n\n--------------\n『ADMIN NAME』 ${await Users.getNameUser(senderID)}\n--------------\nReply to this Message if you want to respond to this Announce`);
    await new Promise(resolve => {
        allThread.forEach((each) => {
            try {
                api.sendMessage(text, each, (err, info) => {
                    if(err) { canNot++; }
                    else {
                        can++;
                        atmDir.forEach(each => fs.unlinkSync(each))
                        atmDir = [];
                        global.client.handleReply.push({
                            name: this.config.name,
                            type: "sendnoti",
                            messageID: info.messageID,
                            messID: messageID,
                            threadID
                        })
                        resolve();
                    }
                })
            } catch(e) { console.log(e) }
        })
    })
    api.sendMessage(`Send to ${can} thread, not send to ${canNot} thread`, threadID);
                      }