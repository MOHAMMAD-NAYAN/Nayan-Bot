module.exports.config = {
  name: "imgur",
  version: "1.0.0",
  permission: 0,
  credits: "Nayan",
  description: "",
  prefix: true,
  category: "user",
  usages: "Link",
  cooldowns: 5,
  dependencies: {
    "axios": "",
    "nayan-imgur-upload-api": ""
  }
};

module.exports.run = async ({ api, event, args }) => {
  const axios = global.nodemodule['axios'];
  const { imgur } = require("nayan-imgur-upload-apis");


  let linkanh = event.messageReply?.attachments[0]?.url || args.join(" ");

  if (!linkanh) {
    return api.sendMessage('[⚜️]➜ Please provide an image or video link.', event.threadID, event.messageID);
  }

  try {
    
    linkanh = linkanh.replace(/\s/g, '');

    
    if (!/^https?:\/\//.test(linkanh)) {
      return api.sendMessage('[⚜️]➜ Invalid URL: URL must start with http:// or https://', event.threadID, event.messageID);
    }

    
    const encodedUrl = encodeURI(linkanh);

    const attachments = event.messageReply?.attachments || [];
    const allPromises = attachments.map(item => {
      const encodedItemUrl = encodeURI(item.url);
      return imgur(encodedItemUrl);
    });

    const results = await Promise.all(allPromises);
    const imgurLinks = results.map(result => result.data.link); 

    return api.sendMessage(`Uploaded Imgur Links:\n${imgurLinks.join('\n')}`, event.threadID, event.messageID);
  } catch (e) {
    console.error(e);
    return api.sendMessage('[⚜️]➜ An error occurred while uploading the image or video.', event.threadID, event.messageID);
  }
};
