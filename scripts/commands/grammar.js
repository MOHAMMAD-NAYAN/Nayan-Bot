module.exports.config = {
  name: "grammar",
  version: "2.0.0",
  permission: 0,
  credits: "ryuko",
  description: "grammar is a command that helps improve grammar by suggesting corrections and providing recommendations.",
  prefix: false,
  category: "without prefix",
  usages: "[senteces/paragraph]",
  cooldowns: 5,
};

module.exports.run = async function ({ api, event, args }) {
  const axios = require("axios");
  const { execSync } = require('child_process');
  let { threadID, messageID } = event;
  const mahiro = args.join(" ");
  if (!mahiro) return api.sendMessage(`syntax error\nuse : ${this.config.name} ${this.config.usages}`, threadID, messageID);

  try {
    const res = await axios.get(`https://grammarcorrection.mahirochan1.repl.co/grammar?text=${mahiro}`);
    const { message } = res.data;
    api.sendMessage(`correct grammar :\n${message}`, threadID, messageID);
  } catch (error) {
    console.error(error);
    api.sendMessage("an error occurred while making the API request.", threadID, messageID);
  }
};
