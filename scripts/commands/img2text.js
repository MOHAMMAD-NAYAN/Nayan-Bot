module.exports = {
  config: {
       name: "text",
       version: "1.0.0",
       permission: 0,
       credits: "Nayan",
       description: "",
       prefix: true, 
       category: "user", 
       usages: "Link",
       cooldowns: 5,
       dependencies: {
  }
  },

start: async function({ nayan, events, args }) {
  const linkanh = events.messageReply.attachments[0].url || args.join(" ");
    const axios = require("axios")
    const request = require("request")
    const fs = require("fs-extra")
const { img2text} = require('nayan-apis-server')
    const data = await img2text(`${linkanh}`);
  console.log(data);
        var msg = [];
  const text = data.text
        {
            msg += `${text}`
        }
    return nayan.reply({
        body: msg

    }, events.threadID, events.messageID);
  }
}
