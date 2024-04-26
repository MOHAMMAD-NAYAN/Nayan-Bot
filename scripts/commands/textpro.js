module.exports.config = {
  name: "textpro",
  version: "2.0.0",
  permission: 0,
  credits: "Nayan",
  description: "",
  prefix: true,
  category: "user",
  usages: "text",
  cooldowns: 5,
  dependencies: {
        'image-downloader': '',
    'nayan-server': ''
  }
};
module.exports.run = async function({ api, event, args }) {


  const { messageID, threadID } = event;
  const fs = require("fs");
  const axios = require("axios");
  const request = require("request");

  const prompt = args.join(" ");
  if (!args[0]) return api.sendMessage(`🔰Use ${global.config.PREFIX}${this.config.name} [no.] [text]\n🔰Example:${global.config.PREFIX}${this.config.name} 1 nayan\n\n🔥Total Edit limit 10...`, threadID, messageID);


  const content = args.join(" ");
  const msg = content.split(" ");
  const num = msg[0].trim();
  const name = msg[1].trim();

  const {textpro} = require('nayan-server')


  if (num == "1"){ var urlpro = "https://textpro.me/blue-gem-text-effect-830.html"} 
  if (num == "2"){ var urlpro = "https://textpro.me/pink-candy-text-effect-832.html"}
  if (num == "3"){ var urlpro = "https://textpro.me/eroded-metal-text-effect-834.html"}
  if (num == "4"){ var urlpro = "https://textpro.me/bronze-glitter-text-effect-835.html"}
  if (num == "5"){ var urlpro = "https://textpro.me/silver-glitter-text-effect-837.html"}
  if (num == "6"){ var urlpro = "https://textpro.me/purple-glitter-text-effect-840.html"}
  if (num == "7"){ var urlpro = "https://textpro.me/blue-glitter-text-effect-841.html"}
  if (num == "8"){ var urlpro = "https://textpro.me/hexa-golden-text-effect-842.html"}
  if (num == "9"){ var urlpro = "https://textpro.me/hot-metal-text-effect-843.html"}
  if (num == "10"){ var urlpro = "https://textpro.me/purple-gem-text-effect-853.html"}
// you added more link same as above


 try { 
  let data = await textpro(urlpro, name);
  console.log(data);
  var file = fs.createWriteStream(__dirname + '/cache/textpro.jpg');

  const link = data.url;
  const rqs = request(encodeURI(`${link}`));
   api.setMessageReaction("✅", event.messageID, (err) => {
     }, true);
  rqs.pipe(file);  
  file.on('finish', () => {

    setTimeout(function() {

      return api.sendMessage({
        body: `❐ THIS IS YOUR NAME EDIT ✌️\n\n___________________________________\n\n❐ This Bot Name : ${global.config.BOTNAME} 🤖\n❐ This Bot Owner : Mohammad Nayan😘\n❐ Your Input Name : ${name}\n\n___________________________________`,
        attachment: fs.createReadStream(__dirname + '/cache/textpro.jpg')
      }, threadID, messageID)
    }, 5000)
  })
    } catch (err) {
   api.setMessageReaction("❌", event.messageID, (err) => {
  }, true);
    api.sendMessage(`🔰Use ${global.config.PREFIX}${this.config.name} [no.] [text]\n🔰Example:${global.config.PREFIX}${this.config.name} 1 nayan\n\n🔥Total Edit limit 10...`, event.threadID, event.messageID);  
   }
};