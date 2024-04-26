module.exports.config = {
  name: "scan",
  version: "1.0.0",
  permission: 0,
  credits: "Nayan",
  description: " ",
  prefix: true, 
  category: "user", 
  usages: "reply qrcode",
  cooldowns: 5,
  dependencies: {
    "jimp": "",
    "qrcode-reader": "",
    "image-downloader": ""
  }
};

module.exports.run = async function({ api, event, args }) {
  const fs = require('fs');
  const jimp = require('jimp');
  const QrCode = require('qrcode-reader');
  const path = __dirname + "/cache/qrcode.png";

  const { threadID, messageID, type, messageReply } = event;
  if (type != "message_reply" || messageReply.attachments.length > 1) return api.sendMessage("[⚜️]➜ Bạn phải reply ảnh qrcode cần quét!", threadID, messageID);

  if (messageReply.attachments[0].type == 'photo') {
    await require("image-downloader").image({ url: messageReply.attachments[0].url, dest: path })
    const img = await jimp.read(fs.readFileSync(path));
    const qr = new QrCode();
    const value = await new Promise((resolve, reject) => {
      qr.callback = (err, v) => err != null ? reject(err) : resolve(v);
      qr.decode(img.bitmap);
    });
    return api.sendMessage(`[✅]➜ Result: ${value.result}`, threadID, messageID);
  }
  return api.sendMessage("[❌]➜ Error! An error occurred. Please try again later!", threadID, messageID);
}