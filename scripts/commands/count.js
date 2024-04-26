module.exports.config = {
  name: "count",
  version: "0.0.2",
  permission: 0,
  prefix: true,
  credits: "Nayan",
  description: "..",
  category: "user",
  usages: "message/admin/member/male/female/gei/allgroup/alluser",
    cooldowns: 5,
};

module.exports.run = async function({ api,Threads,Users, event, args, client, __GLOBAL }) {
  //Làm cái gì ở đây tuỳ thuộc vào bạn ¯\_(ツ)_/¯ 
  var input =args.join();
      var nameMen = [];
    var gendernam = [];
    var gendernu = [];
    var nope = [];
        let threadInfo = await api.getThreadInfo(event.threadID);
        for (let z in threadInfo.userInfo) {
      var gioitinhone = threadInfo.userInfo[z].gender;
        if(gioitinhone == "MALE"){gendernam.push(gioitinhone)
        }else{
            if (gioitinhone=="FEMALE"){gendernu.push(gioitinhone)
              }else{nope.push(gioitinhone)}}}

    var out = (msg) => api.sendMessage(msg, event.threadID, event.messageID);
  var boxget = await Threads.getAll(['threadID'])
var userget = await Users.getAll(['userID'])
    if (input==""){out(`You have not entered a tag, use the following tags: message/admin/member/male/female/gei/allgroup/alluser`)}
    if (input=="message") {out(`This group has ${threadInfo.messageCount} message`)}
    if (input=="admin"){out(`The group you have ${threadInfo.adminIDs.length} administrator`)}
    if (input=="member"){out(`This group has ${threadInfo.participantIDs.length} member`)}
    if (input=="male"){out(`This group has ${gendernam.length} member is male`)}
    if (input=="female"){out(`This group has ${gendernu.length} member is female`)}
    if (input=="gei"){out(`This group has ${nope.length} member is Gei`)}
    if (input=="allgroup"){out(`Total yes ${boxget.length} group chat using bots`)}
    if (input=="alluser"){out(`Total yes ${userget.length} users using bots`)}
  }