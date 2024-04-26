const axios = require('axios');

module.exports.config = {
  name: "quotes",
  version: "1.0.0",
  permission: 2,
  credits: "ryuko",
  description: "randomly receive quotes",
  prefix: false,
  category: "without prefix",
  usages: "quotes",
  cooldowns: 10,
};

module.exports.run = async function({ api, event }) {
  try {
    const response = await axios.get('https://api.quotable.io/random');
    const quote = response.data;
    const content = quote.content;
    const author = quote.author;
    const message = `"${content}" - ${author}`;
    api.sendMessage(message, event.threadID, event.messageID);
  } catch (error) {
    console.error('something went wrong : ', error);
    api.sendMessage('an error occurred while fetching from the API. please try again.', event.threadID, event.messageID);
  }
};
