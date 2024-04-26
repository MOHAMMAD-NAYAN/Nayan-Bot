module.exports.config = {
    name: 'admins',
    version: '1.0.0',
    permission: 0,
    credits: 'nayan',
    prefix: false,
    description: 'group administrator list.',
    category: 'without prefix',
    usages: 'admins',
    cooldowns: 5,
    dependencies: []
};

module.exports.run = async function({ api, event, args, Users }) {
    var threadInfo = await api.getThreadInfo(event.threadID);
    let qtv = threadInfo.adminIDs.length;
    var listad = '';
    var qtv2 = threadInfo.adminIDs;
    var fs = global.nodemodule["fs-extra"];
    dem = 1;
    for (let i = 0; i < qtv2.length; i++) {
        const info = (await api.getUserInfo(qtv2[i].id));
        const name = info[qtv2[i].id].name;
        listad += '' + `${dem++}` + '. ' + name + '\n';
    }

    api.sendMessage(
        `list of ${qtv} administrators includes :\n${listad}`,
        event.threadID,
        event.messageID
    );
};
