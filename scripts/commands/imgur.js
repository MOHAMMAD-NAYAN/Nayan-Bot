module.exports.config = {
  name: "imgur",
  version: "1.0.0",
  permission: 0,
  credits: "Nayan",
  description: "",
  prefix: true, 
  category: "user", 
  usages: "Link",
  cooldowns: 5,
  dependencies: {
    "imgur-upload-api": ''
  }
};

module.exports.run = async function({ api, event, args }) {
  const linkanh = event.messageReply.attachments[0].url || args.join(" ");
    const axios = require("axios")
    const request = require("request")
    const fs = require("fs-extra")
  var imgur = require('imgur-upload-api'),
  path = require('path');
  const myClientID = 'Client-ID 3fb071726880bbb'
  imgur.setClientID(myClientID);

  imgur.upload(linkanh, function (err,res) {
    console.log(res)
    const link = res.data.link;
    const type = res.data.type;
    var msg = [];
    {
        msg += `TYPE: ${type}\nLINK: ${link}`
    }
    return api.sendMessage({
        body: msg

    }, event.threadID, event.messageID);
  });

}