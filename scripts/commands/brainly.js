const axios = require("axios");

module.exports.config = {
  name: "brainly",
  version: "1",
  permission: 0,
  credits: "ryuko",
  description: "brainly.",
  prefix: false,
  category: "without prefix",
  usages: "brainly <ask>",
  cooldowns: 5,
};

module.exports.run = async function({ api, event, args }) {
          let { threadID, messageID } = event;
          const question = event.body.slice(8).trim();

          if (!question) {
            api.sendMessage("please provide a question.", threadID, messageID);
            return;
          }

          try {
            api.sendMessage("searching for an answer, please wait.", threadID, messageID);
            const res = await axios.get(`https://testapi.heckerman06.repl.co/api/other/brainly?text=${encodeURIComponent(question)}`);
            const data = res.data;

            if (data.question && data.answer) {
              const response = `question : ${data.question}\nanswer : ${data.answer}`;
              api.sendMessage(response, threadID, messageID);
            } else {
              api.sendMessage("no answer found for the given question.", threadID, messageID);
            }
          } catch (error) {
            console.error(error);
            api.sendMessage("error occurred while fetching data from the brainly API.", threadID, messageID);
  }
};