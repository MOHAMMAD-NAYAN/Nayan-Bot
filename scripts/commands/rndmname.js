module.exports = {
config: {
  name: "rndm",
  version: "0.0.2",
  permission: 0,
  prefix: true,
  credits: "Nayan",
  description: "rndm video",
  category: "user",
  usages: "name",
    cooldowns: 5,
},

  languages: {
  "vi": {},
      "en": {
          "missing": `[ ! ] Input Name.\nEx: ${global.config.PREFIX}rndm nayan`
      }
  },

start: async function({ nayan, events, args, lang }) {
  const axios = require("axios")
  const fs = require("fs")
  const np = args.join(" ");
  if (!args[0]) return nayan.reply(lang("missing"), events.threadID, events.messageID)
  const apis = await axios.get('https://raw.githubusercontent.com/MOHAMMAD-NAYAN/Nayan/main/api.json')
  const n = apis.data.api;
  const res = await axios.get(`${n}/random?name=${np}`)
  console.log(res.data)
  var msg = [];
  let video = `${res.data.data.url}`;
  let name = `${res.data.data.name}`;
  let cp = `${res.data.data.cp}`
  let ln = `${res.data.data.length}`

  let videos = (await axios.get(`${video}`, {
        responseType: 'arraybuffer'
    })).data;
    fs.writeFileSync(__dirname + "/cache/video.mp4", Buffer.from(videos, "utf-8"));
    var allvideo = [];
      allvideo.push(fs.createReadStream(__dirname + "/cache/video.mp4"));

  {
      msg += `${cp}\n\n𝐓𝐨𝐭𝐚𝐥 𝐕𝐢𝐝𝐞𝐨𝐬: [${ln}]\n𝐀𝐝𝐝𝐞𝐝 𝐓𝐡𝐢𝐬 𝐕𝐢𝐝𝐞𝐨 𝐓𝐨 𝐓𝐡𝐞 𝐀𝐩𝐢 𝐁𝐲 [${name}]`
  }

  return nayan.reply({
      body: msg,
      attachment: allvideo
  }, events.threadID, events.messageID);
}
}