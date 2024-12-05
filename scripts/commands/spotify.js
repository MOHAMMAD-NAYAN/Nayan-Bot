module.exports = {
config: {
  name: "spotify",
  version: "0.0.2",
  permission: 0,
  prefix: true,
  credits: "Nayan",
  description: "",
  category: "admin",
  usages: "",
    cooldowns: 5,
},

  languages: {
  "vi": {},
      "en": {
          "missing": '[ ! ] Input Song Name.',
          "send": 'sending search result.',
        "error": '❌Error'
      }
  },

start: async function({ nayan, events, args, lang }) {
  if (!args[0]) return nayan.reply(lang("missing"), events.threadID, events.messageID);
    const axios = require("axios")
    const request = require("request")
    const fs = require("fs-extra")
  const { spotify} = require('nayan-api-server')
    const text = args.join(" ")
    nayan.reply(`searching for ${text}`, events.threadID, events.messageID);
    const res = await spotify(`${text}`);
  console.log(res);
    var data = res.data;
    var msg = [];
    let img1 = `${res.data.audio}`;
    let cp = `${res.data.title}`

    let imgs1 = (await axios.get(`${img1}`, {
        responseType: 'arraybuffer'
    })).data;
    fs.writeFileSync(__dirname + "/cache/img1.mp3", Buffer.from(imgs1, "utf-8"));
    var allimage = [];
    allimage.push(fs.createReadStream(__dirname + "/cache/img1.mp3"));

    {
        msg += `${cp}\n\n⇆ㅤ ㅤ◁ㅤ ❚❚ ㅤ▷ ㅤㅤ↻`
    }

   nayan.reply(lang("send"), events.threadID, events.messageID)
    return nayan.reply({
        body: msg,
        attachment: allimage
    }, events.threadID, events.messageID);
} 
}
