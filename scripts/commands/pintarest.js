module.exports = {
config: {
    name: "pinterest",
    version: "1.0.0",
    permission: 0,
    credits: "Nayan",
    description: "image search",
    prefix: true,
    category: "with prefix",
    usages: "pinterest (text) - (amount)",
    cooldowns: 10,
},


  languages: {
  "vi": {
    "missing": "phim hoạt hình - 10"
  },
      "en": {
          "missing": '/pinterest anime - 10'
      }
  },

  
start: async function({ nayan, events, args }) {
    const axios = require("axios");
    const fs = require("fs-extra");
    const request = require("request");
    const keySearch = args.join(" ");
  const { spotify, pintarest} = require('nayan-apis-server')
    if(keySearch.includes("-") == false) return nayan.reply(lang(" missing"), events.threadID, events.messageID)
    const keySearchs = keySearch.substr(0, keySearch.indexOf('-'))
    const numberSearch = keySearch.split("-").pop() || 6
    const res = await pintarest(`${encodeURIComponent(keySearchs)}`);
  console.log(res)
    const data = res.data;
    var num = 0;
    var imgData = [];
    for (var i = 0; i < parseInt(numberSearch); i++) {
      let path = __dirname + `/cache/${num+=1}.jpg`;
      let getDown = (await axios.get(`${data[i]}`, { responseType: 'arraybuffer' })).data;
      fs.writeFileSync(path, Buffer.from(getDown, 'utf-8'));
      imgData.push(fs.createReadStream(__dirname + `/cache/${num}.jpg`));
    }
    nayan.reply({
        attachment: imgData,
        body: numberSearch + ' images for '+ keySearchs
    }, events.threadID, events.messageID)
    for (let ii = 1; ii < parseInt(numberSearch); ii++) {
        fs.unlinkSync(__dirname + `/cache/${ii}.jpg`)
    }
}
}
