module.exports.config = {
    name: "setdatauser",
    version: "1.0",
    permission: 2,
    credits: "ryuko",
    prefix: false,
    description: "set new data of users into data",
    category: "admin",
    usages: "",
    cooldowns: 5,
};


module.exports.run = async function ({ Users, event, args, api, Threads }) { 
    const { threadID, logMessageData } = event;
    const { setData, getData } = Users;
    var { participantIDs } = await Threads.getInfo(threadID) || await api.getThreadInfo(threadID);
    for (const id of participantIDs) {
    console.log(`data has been updated id : ${id}`)
    let data = await api.getUserInfo(id);
    data.name
    let userName = data[id].name
    await Users.setData(id, { name: userName, data: {} });
}
    console.log(`updated data of ${participantIDs.length} user in group`)
    return api.sendMessage(`updated the users data in the group`, threadID)
}