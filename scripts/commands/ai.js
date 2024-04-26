
module.exports = {
  config: {
  name: "ai",
  version: "1.0.0",
  permission: 0,
  credits: "Nayan",
  description: "",
  prefix: true, 
  category: "user", 
  usages: "query",
  cooldowns: 5,
  dependencies: {
    "nayan-server": ''
  }
  },

  start: async function({ nayan, events, args, Users }) {

    const axios = require("axios")
    const request = require("request")
    const fs = require("fs-extra")
  const uid = events.senderID;
  var nn = await Users.getNameUser(uid);
  let np = args.join(" ");
  const { gpt } = require("nayan-server");

gpt({
    messages: [
        {
            role: "assistant",
            content: "Hello! How are you today?"
        },
        {
            role: "user",
            content: `Hello, my name is ${nn}.`
        },
        {
            role: "assitant",
            content: `Hello, ${nn}! How are you today?`
        }
    ],
    prompt: `${np}`,
    model: "GPT-4",
    markdown: false
}, (err, data) => {
    console.log(data)
  const answer = data.gpt
    var msg = [];
    {
        msg += `${answer}`
    }
    return nayan.reply({
        body: msg

    }, events.threadID, events.messageID);
  });

  }
};