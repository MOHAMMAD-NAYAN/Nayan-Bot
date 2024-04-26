

const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs-extra');
const path = require('path');
const {image} = require('image-downloader');


module.exports.run = async function({
    api, event, args
}){
    try {
      var tpk = `🖼️=== [ REMOVING BACKGROUND ] ===🖼️
━━━━━━━━━━━━━━━
[⚜️]➜ Api By MOHAMMAD NAYAN`;
        if (event.type !== "message_reply") return api.sendMessage("[⚜️]➜ You must reply to a photo", event.threadID, event.messageID);
        if (!event.messageReply.attachments || event.messageReply.attachments.length == 0) return api.sendMessage("[⚜️]➜ You must reply to a photo", event.threadID, event.messageID);
        if (event.messageReply.attachments[0].type != "photo") return api.sendMessage("[⚜️]➜ This is not an image", event.threadID, event.messageID);

        const content = (event.type == "message_reply") ? event.messageReply.attachments[0].url : args.join(" ");
        const KeyApi = ["qReKoWSpkMAi2vbi6RUEHctA","ho37vvCUppqTKcyfjbLXnt4t","ytr2ukWQW2YrXV8dshPbA8cE"]
        const inputPath = path.resolve(__dirname, 'cache', `photo.png`);
         await image({
        url: content, dest: inputPath
    });
        const formData = new FormData();
        formData.append('size', 'auto');
        formData.append('image_file', fs.createReadStream(inputPath), path.basename(inputPath));
        axios({
            method: 'post',
            url: 'https://api.remove.bg/v1.0/removebg',
            data: formData,
            responseType: 'arraybuffer',
            headers: {
                ...formData.getHeaders(),
                'X-Api-Key': KeyApi[Math.floor(Math.random() * KeyApi.length)],
            },
            encoding: null
        })
            .then((response) => {
                if (response.status != 200) return console.error('Error:', response.status, response.statusText);
                fs.writeFileSync(inputPath, response.data);
                return api.sendMessage({body:tpk, attachment: fs.createReadStream(inputPath)},event.threadID, () => fs.unlinkSync(inputPath));
            })
            .catch((error) => {
                return console.error('Request failed:', error);
            });
     } catch (e) {
        console.log(e)
        return api.sendMessage(`[⚜️]➜ Nayan Server Is Busy Now`, event.threadID, event.messageID);
  }
};

module.exports.config = {
    name: "removebg",
    version: "1.0.0",
    permission: 0,
    credits: "Nayan",
    description: "",
    prefix: true,
    category: "prefix",
    usages: "reply",
    cooldowns: 10,
    dependencies: {
       'form-data': '',
       'image-downloader': ''
    }
};