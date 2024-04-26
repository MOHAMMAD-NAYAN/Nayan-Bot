module.exports.config = {
  name: "photoxy",
  version: "2.0.0",
  permission: 2,
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
  if (!args[0]) return api.sendMessage(`🔰Use ${global.config.PREFIX}${this.config.name} [no.] [text]\n🔰Example:${global.config.PREFIX}${this.config.name} 1 nayan\n\n🔥Total Edit limit 25...`, threadID, messageID);


  const content = args.join(" ");
  const msg = content.split(" ");
  const num = msg[0].trim();
  const name = msg[1].trim();

  const {photoxy} = require('nayan-server')

  if (num == "1"){ var url = "https://photooxy.com/logo-and-text-effects/put-your-text-on-a-coffee-cup--174.html"}
  if (num == "2"){ var url = "https://photooxy.com/logo-and-text-effects/write-text-on-the-cup-392.html"}
  if (num == "3"){ var url ="https://photooxy.com/logo-and-text-effects/shadow-text-effect-in-the-sky-394.html"}
  if (num == "4"){ var url ="https://photooxy.com/logo-and-text-effects/romantic-messages-for-your-loved-one-391.html"}
  if (num == "5"){ var url ="https://photooxy.com/logo-and-text-effects/write-text-on-burn-paper-388.html"}
  if (num == "6"){ var url ="https://photooxy.com/logo-and-text-effects/put-text-on-the-cup-387.html"}
  if (num == "7"){ var url ="https://photooxy.com/logo-and-text-effects/create-a-picture-of-love-message-377.html"}
  if (num == "8"){ var url ="https://photooxy.com/logo-and-text-effects/make-quotes-under-grass-376.html"}
  if (num == "9"){ var url ="https://photooxy.com/logo-and-text-effects/write-art-quote-on-wood-heart-370.html"}
  if (num == "10"){ var url ="https://photooxy.com/logo-and-text-effects/text-inside-the-flower-heart-369.html"}
  if (num == "11"){ var url ="https://photooxy.com/logo-and-text-effects/writing-on-wooden-boards-368.html"}
  if (num == "12"){ var url ="https://photooxy.com/logo-and-text-effects/yellow-roses-text-360.html"}
  if (num == "13"){ var url ="https://photooxy.com/logo-and-text-effects/create-a-layered-leaves-typography-text-effect-354.html"}
  if (num == "14"){ var url ="https://photooxy.com/logo-and-text-effects/quotes-under-fall-leaves-347.html"}
  if (num == "15"){ var url ="https://photooxy.com/logo-and-text-effects/3d-text-effect-under-white-cube-217.html"}
  if (num == "16"){ var url ="https://photooxy.com/logo-and-text-effects/glow-rainbow-effect-generator-201.html"}
  if (num == "17"){ var url ="https://photooxy.com/logo-and-text-effects/write-stars-text-on-the-night-sky-200.html"}
  if (num == "18"){ var url ="https://photooxy.com/logo-and-text-effects/realistic-flaming-text-effect-online-197.html"}
  if (num == "19"){ var url ="https://photooxy.com/logo-and-text-effects/text-under-web-matrix-effect-185.html"}
  if (num == "20"){ var url ="https://photooxy.com/logo-and-text-effects/butterfly-text-with-reflection-effect-183.html"}
  if (num == "21"){ var url ="https://photooxy.com/logo-and-text-effects/carved-wood-effect-online-171.html"}
  if (num == "22"){ var url ="https://photooxy.com/logo-and-text-effects/smoke-typography-text-effect-170.html"}
  if (num == "23"){ var url ="https://photooxy.com/logo-and-text-effects/sweet-andy-text-online-168.html"}
  if (num == "24"){ var url ="https://photooxy.com/logo-and-text-effects/text-under-flower-165.html"}
  if (num == "25"){ var url ="https://photooxy.com/art-effects/flower-typography-text-effect-164.html"}
  // you added more link same as above


 try { 
  let data = await photoxy(url, name);
  console.log(data);
  var file = fs.createWriteStream(__dirname + '/cache/photoxy.jpg');

  const link = data.url;
  const rqs = request(encodeURI(`${link}`));
   api.setMessageReaction("✅", event.messageID, (err) => {
     }, true);
  rqs.pipe(file);  
  file.on('finish', () => {

    setTimeout(function() {

      return api.sendMessage({
        body: `❐ THIS IS YOUR NAME EDIT ✌️\n\n___________________________________\n\n❐ This Bot Name : ${global.config.BOTNAME} 🤖\n❐ This Bot Owner : Mohammad Nayan😘\n❐ Your Input Name : ${name}\n\n___________________________________`,
        attachment: fs.createReadStream(__dirname + '/cache/photoxy.jpg')
      }, threadID, messageID)
    }, 5000)
  })
    } catch (err) {
   api.setMessageReaction("❌", event.messageID, (err) => {
  }, true);
    api.sendMessage(`🔰Use ${global.config.PREFIX}${this.config.name} [no.] [text]\n🔰Example:${global.config.PREFIX}${this.config.name} 1 nayan\n\n🔥Total Edit limit 25...`, event.threadID, event.messageID);  
   }
};