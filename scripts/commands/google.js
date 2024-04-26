module.exports.config = {
    name: "google",
    version: "1.0.0",
    permission: 0,
    credits: "ryuko",
    prefix: false,
    description: "search results on google",
    category: "without prefix",
    usages: "google [text]",
    cooldowns: 5,
    dependencies: {
        "request":"",
        "fs":""
    }
};

module.exports.run = function({ api, event, args }) {
    let textNeedSearch = "";
    const regex = /(https?:\/\/.*?\.(?:png|jpe?g|gif)(?:\?(?:[\w_-]+=[\w_-]+)(?:&[\w_-]+=[\w_-]+)*)?(.*))($)/;
    (event.type == "message_reply") ? textNeedSearch = event.messageReply.attachments[0].url: textNeedSearch = args.join(" ");
    (regex.test(textNeedSearch)) ? api.sendMessage(`https://www.google.com/searchbyimage?&image_url=${textNeedSearch}`, event.threadID, event.messageID): api.sendMessage(`https://www.google.com.vn/search?q=${encodeURIComponent(textNeedSearch)}`, event.threadID, event.messageID);
}