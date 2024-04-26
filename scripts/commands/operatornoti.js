const fs = require('fs');
const request = require('request');

module.exports.config = {
    name: "operatornoti",
    version: "1.0.0",
    permission: 3,
    credits: "NAYAN",
    description: "",
    prefix: true,
    category: "operator",
    usages: "[msg]",
    cooldowns: 5,
}

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

module.exports.handleReply = async function ({ api, event, handleReply, Users, Threads, getText }) {
    
    const moment = require("moment-timezone");
      var gio = moment.tz("Asia/Dhaka").format("DD/MM/YYYY - HH:mm:s");
    const { threadID, messageID, senderID, body } = event;
    let name = await Users.getNameUser(senderID);
    switch (handleReply.type) {
        case "sendnoti": {
            let text = `${name} replied to your announce\n\ntime : ${gio}\nreply : ${body}\n\nfrom group : ${(await Threads.getInfo(threadID)).threadName || "unknown"}`;
            if(event.attachments.length > 0) text = await getAtm(event.attachments, `${body}${name} replied to your announce\n\ntime : ${gio}\n\nfrom group : ${(await Threads.getInfo(threadID)).threadName || "unknown"}`);
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
            let text = `operator ${name} replied to you\n\nreply : ${body}\n\nreply to this message if you want to respond again.`;
            if(event.attachments.length > 0) text = await getAtm(event.attachments, `${body}${name} replied to you\n\nreply to this message if you want to respond again.`);
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
    if (!args[0]) return api.sendMessage("please input message", threadID);
    let allThread = global.data.allThreadID || [];
    let can = 0, canNot = 0;
    let text = `message from bot operators\n\ntime : ${gio}\noperator name : ${await Users.getNameUser(senderID)}\nmessage : ${args.join(" ")}\n\nreply to this message if you want to respond from this announce.`;
    if(event.type == "message_reply") text = await getAtm(messageReply.attachments, `message from bot operators\n\ntime : ${gio}\noperator name : ${await Users.getNameUser(senderID)}\nmessage : ${args.join(" ")}\n\nreply to this message if you want to respond from this announce.`);
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
    api.sendMessage(`send to ${can} thread, not send to ${canNot} thread`, threadID);
}