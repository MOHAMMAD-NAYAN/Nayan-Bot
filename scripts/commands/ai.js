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
    }
  },

  start: async function({ nayan, events, args, Users, NAYAN }) {
    const axios = require("axios");
    const request = require("request");
    const fs = require("fs-extra");
    const id = nayan.getCurrentUserID()
    const uid = events.senderID;
    const nn = await Users.getNameUser(uid);
    const np = args.join(" ");
    const { gpt } = require("nayan-api-server");

    try {
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
            role: "assistant",
            content: `Hello, ${nn}! How are you today?`
          }
        ],
        prompt: `${np}`,
        model: "GPT-4",
        markdown: false
      }, async (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
console.log(data)
        const answer = data.gpt;
        await NAYAN.sendContact(answer, id, events.threadID);
      });
    } catch (error) {
      console.error("Error while processing GPT request:", error);
    }
  }
};
