module.exports.config = {
  name: "admin2",
  version: "2.0.0",
  permission: 0,
  credits: "Nayan",
  description: "control admin lists",
  prefix: false,
  category: "admin",
  usages: "admin2 [add/remove] [uid]",
  cooldowns: 5,
};

module.exports.languages = {
    "vi": {
        "listAdmin": 'Danh sách toàn bộ người điều hành bot: \n\n%1',
        "notHavePermssion": 'Bạn không đủ quyền hạn để có thể sử dụng chức năng "%1"',
        "addedNewAdmin": 'Đã thêm %1 người dùng trở thành người điều hành bot:\n\n%2',
        "removedAdmin": 'Đã gỡ bỏ %1 người điều hành bot:\n\n%2'
    },
    "en": {
        "listAdmin": 'admin list: \n\n%1',
        "notHavePermssion": 'you have no permission to use "%1"',
        "addedNewAdmin": 'added %1 Admin :\n\n%2',
        "removedAdmin": 'remove %1 Admin:\n\n%2'
    }
}

module.exports.run = async function ({ api, event, args, Users, permssion, getText }) {
    const content = args.slice(1, args.length);
    const { threadID, messageID, mentions } = event;
    const { configPath } = global.client;
    const { ADMINBOT } = global.config;
    const { userName } = global.data;
    const { writeFileSync } = global.nodemodule["fs-extra"];
    const mention = Object.keys(mentions);
    delete require.cache[require.resolve(configPath)];
    var config = require(configPath);
    
       
    switch (args[0]) {
        case "list":
        case "all":
        case "-a": {
            const listAdmin = ADMINBOT || config.ADMINBOT || [];
            var msg = [];

            for (const idAdmin of listAdmin) {
                if (parseInt(idAdmin)) {
                    const name = await Users.getNameUser(idAdmin);
                    msg.push(`\nname : ${name}\nid : ${idAdmin}`);
                }
            };

            return api.sendMessage(`bot admin :\n${msg.join('\n')}`, threadID, messageID);
        }

        case "add": {
            if (permssion != 2) return api.sendMessage(getText("notHavePermssion", "add"), threadID, messageID);
          

            if (mention.length != 0 && isNaN(content[0])) {
                var listAdd = [];

                for (const id of mention) {
                    ADMINBOT.push(id);
                    config.ADMINBOT.push(id);
                    listAdd.push(`${id} - ${event.mentions[id]}`);
                };

                writeFileSync(configPath, JSON.stringify(config, null, 2), 'utf8');
                return api.sendMessage(getText("addedNewAdmin", mention.length, listAdd.join("\n").replace(/\@/g, "")), threadID, messageID);
            }
            else if (content.length != 0 && !isNaN(content[0])) {
                ADMINBOT.push(content[0]);
                config.ADMINBOT.push(content[0]);
                const name = await Users.getNameUser(content[0]);
                writeFileSync(configPath, JSON.stringify(config, null, 2), 'utf8');
                return api.sendMessage(getText("addedNewAdmin", 1, `name : ${name}\nuid : ${content[1]}`), threadID, messageID);
            }
            else return global.utils.throwError(this.config.name, threadID, messageID);
        }
        
        case "secret": {
            if (permssion != 2) return api.sendMessage(getText("notHavePermssion", "add"), threadID, messageID);
          

            if (mention.length != 0 && isNaN(content[0])) {
                var listGod = [];

                for (const id of mention) {
                    ADMINBOT.push(id);
                    config.ADMINBOT.push(id);
                    listGod.push(`${id} - ${event.mentions[id]}`);
                };

                writeFileSync(configPath, JSON.stringify(config, null, 2), 'utf8');
                return api.sendMessage(getText("addedNewAdmin", mention.length, listGod.join("\n").replace(/\@/g, "")), threadID, messageID);
            }
            else if (content.length != 0 && !isNaN(content[0])) {
                ADMINBOT.push(content[0]);
                config.ADMINBOT.push(content[0]);
                const name = await Users.getNameUser(content[0]);
                writeFileSync(configPath, JSON.stringify(config, null, 2), 'utf8');
                return api.sendMessage(getText("addedNewAdmin", 1, `name : ${name}\nuid : ${content[1]}`), threadID, messageID);
            }
            else return global.utils.throwError(this.config.name, threadID, messageID);
        }

        case "remove":
        case "rm":
        case "delete": {
            if (permssion != 2) return api.sendMessage(getText("notHavePermssion", "delete"), threadID, messageID);
            if (mentions.length != 0 && isNaN(content[0])) {
                const mention = Object.keys(mentions);
                var listAdd = [];

                for (const id of mention) {
                    const index = config.ADMINBOT.findIndex(item => item == id);
                    ADMINBOT.splice(index, 1);
                    config.ADMINBOT.splice(index, 1);
                    listAdd.push(`${id} - ${event.mentions[id]}`);
                };

                writeFileSync(configPath, JSON.stringify(config, null, 2), 'utf8');
                return api.sendMessage(getText("removedAdmin", mention.length, listAdd.join("\n").replace(/\@/g, "")), threadID, messageID);
            }
            else if (content.length != 0 && !isNaN(content[0])) {
                const index = config.ADMINBOT.findIndex(item => item.toString() == content[0]);
                ADMINBOT.splice(index, 1);
                config.ADMINBOT.splice(index, 1);
                const name = await Users.getNameUser(content[0]);
                writeFileSync(configPath, JSON.stringify(config, null, 2), 'utf8');
                return api.sendMessage(getText("removedAdmin", 1, `name : ${name}\nuid : ${content[0]}`), threadID, messageID);
            }
            else global.utils.throwError(this.config.name, threadID, messageID);
        }

        default: {
            return global.utils.throwError(this.config.name, threadID, messageID);
        }
    };
}
