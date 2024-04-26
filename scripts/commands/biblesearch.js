module.exports.config = {
    name: "biblesearch",
    version: "1.0.0",
    permission: 0,
    credits: "ryuko",
    description: "search for bible verse.",
    prefix: false,
    category: "without prefix",
    usages: "[john 3:16]",
    cooldowns: 2,
};
module.exports.run = async function({ api, event, args }) {
const axios = require("axios");
const { biblesearch } = global.apiNayan;
let { messageID, threadID, senderID, body } = event;
const responce = args.join(" ");
if (!args[0]) return api.sendMessage("wrong format.\n"+global.config.PREFIX+this.config.name+" "+this.config.usages, threadID, messageID);
try {
api.sendMessage("searching for "+responce, threadID, messageID);
const res = await axios.get(`${biblesearch}${responce}?translation=kjv`);
var bible = res.data.reference;
var bible2 = res.data.text;
var bible3 = res.data.error;
api.sendMessage("verse : "+bible+"\n\n"+bible2, threadID , messageID);
} catch (error) {
api.sendMessage("an error occurred while making the api request.", threadID , messageID);
}
};