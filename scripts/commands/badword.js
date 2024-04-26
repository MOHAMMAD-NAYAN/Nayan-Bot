module.exports.config = {
    name: "badwords",
    version: "1.0.5",
    permission: 2,
    prefix: true,
    credits: "Nayan",
    description: "𝘿𝙤𝙣'𝙩 𝙨𝙖𝙮 𝙗𝙖𝙙𝙬𝙤𝙧𝙙𝙨 𝙥𝙡𝙚𝙖𝙨𝙚",
    category: "Utility",
    usage: "add [word]",
    cooldowns: 3,
    dependencies: {
        "fs-extra": "",
        "request": ""
    }
};

module.exports.onLoad = function () {
    const fs = global.nodemodule["fs-extra"];
    const path = global.nodemodule["path"];
    if (!fs.existsSync(path.join(__dirname, "./cache/badwords.json"))) {
        fs.writeFileSync(path.join(__dirname, `./cache/badwords.json`), JSON.stringify({}, null, 4), { mode: 0o666 });
    }
    if (!fs.existsSync(path.join(__dirname, "./cache/warnings.json"))) {
        fs.writeFileSync(path.join(__dirname, `./cache/warnings.json`), JSON.stringify({}, null, 4), { mode: 0o666 });
    }
};

module.exports.handleEvent = async ({ api, event }) => {
    const request = global.nodemodule["request"];
    const fs = global.nodemodule["fs-extra"];
    const path = global.nodemodule["path"];
    var data = JSON.parse(fs.readFileSync(path.join(__dirname, "./cache/badwords.json"), { encoding: "utf8" }));
    var warnings = JSON.parse(fs.readFileSync(path.join(__dirname, "./cache/warnings.json"), { encoding: "utf8" }));

    let user = await api.getUserInfo(event.senderID);
    let thread = await api.getThreadInfo(event.threadID);
    let name = user[event.senderID].name;

    var admin = ""; // Replace with admin bot's UID

    if (event.senderID == api.getCurrentUserID()) return;

    if (data[event.body]) {
        if (!warnings[event.senderID]) warnings[event.senderID] = 1;
        else warnings[event.senderID]++;

        fs.writeFileSync(path.join(__dirname, `./cache/warnings.json`), JSON.stringify(warnings, null, 4), { mode: 0o666 });

        if (warnings[event.senderID] >= 3) {
            api.removeUserFromGroup(event.senderID, event.threadID);
            delete warnings[event.senderID];
            fs.writeFileSync(path.join(__dirname, `./cache/warnings.json`), JSON.stringify(warnings, null, 4), { mode: 0o666 });
            return api.sendMessage(`User ${name} has been removed from the group due to multiple warnings for using bad words.`, event.threadID);
        }

        return api.sendMessage({
            body: `${name} violated the word ${event.body}?\nWhy are you cursing at the bot?\n\nWarning: ${warnings[event.senderID]}/3`,
            mentions: [{
                tag: name,
                id: event.senderID
            }]
        }, event.threadID);
    }
};

module.exports.run = async function ({ api, args, event }) {
    const fs = global.nodemodule["fs-extra"];
    const path = global.nodemodule["path"];
    var content = args.splice(1, args.length);
    if (!content) return api.sendMessage(`Missing content!`, event.threadID, event.messageID);
    var data = JSON.parse(fs.readFileSync(path.join(__dirname, "./cache/badwords.json"), { encoding: "utf8" }));

    if (!args[0]) return api.sendMessage(`Usage:\nbadwords add [word]`, event.threadID, event.messageID);

    if (args[0] == "add") {
        if (!content) return api.sendMessage(`Missing word to add!`, event.threadID, event.messageID);
        if (data[content]) return api.sendMessage(`The word ${content} is already in the list.`, event.threadID, event.messageID);
        data[content] = {};

        try {
            fs.writeFileSync(path.join(__dirname, `./cache/badwords.json`), JSON.stringify(data, null, 4), { mode: 0o666 });
            return api.sendMessage("Word added successfully!", event.threadID, event.messageID);
        } catch (err) {
            return api.sendMessage("Error: " + err, event.threadID, event.messageID);
        }
    } else if (args[0] == "del") {
        if (!data[content]) return api.sendMessage(`This word does not exist.`, event.threadID, event.messageID);
        delete data[content];

        try {
            fs.writeFileSync(path.join(__dirname, `./cache/badwords.json`), JSON.stringify(data, null, 4), { mode: 0o666 });
            return api.sendMessage("Word deleted successfully!", event.threadID, event.messageID);
        } catch (err) {
            return api.sendMessage("Error: " + err, event.threadID, event.messageID);
        }
    } else if (args[0] == "list") {
        var list = Object.keys(data);
        var msg = "List of banned words:\n";
        for (let text of list) {
            msg += `${text}\n`;
        }
        return api.sendMessage(msg, event.threadID, event.messageID);
    }
};