module.exports.config = {
  name: "ip",
  version: "0.0.2",
  permission: 0,
  prefix: true,
  credits: "Nayan",
  description: "info ip",
  category: "admin",
  usages: "address",
    cooldowns: 5,
};





module.exports.run = async function({ api, event, args }) {
    const axios = require("axios")
    const request = require("request")
    const fs = require("fs-extra")
  const prompt = args.join(" ")
  const { ip } = require("nayan-apis-server");
    const res = await ip(prompt);
  console.log(res)
        var msg = [];
  const {data} = res
  const avt = res.data.country_flag
  const rqs = request(encodeURI(`${avt}`));
fs.createWriteStream(__dirname + '/cache/flag.svg');


        {
            msg += `❐ IP: ${data.ip}\n❐ TYPE: ${data.type}\n❐ CONTINENT: ${data.continent}\n❐ CONTINENT CODE: ${data.continent_code}\n❐ COUNTRY: ${data.country}\n❐ COUNTRY CODE: ${data.country_code}\n❐ REGION: ${data.region}\n❐ CITY: ${data.city}\n❐ ORG: ${data.org}\n❐ ISP: ${data.isp}\n❐ ASN: ${data.asn}`
        }

        return api.sendMessage({
            body: msg,
           // attachment: allimage

        }, event.threadID, event.messageID);
    }
