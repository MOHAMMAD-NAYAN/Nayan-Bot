module.exports.config = {
    name: "alluser",
    version: "1.0.5",
    permission: 0,
    prefix: false,
    credits: "Deku",
    description: "Get all uid and names in Group.",
    category: "without prefix",
    cooldowns: 2
};
module.exports.run = async function ({ api, event, args, Users }) {
  
  function reply(d) {
    api.sendMessage(d, event.threadID, event.messageID)
  }
  var ep = event.participantIDs;
  msg = ""
  msgs = ""
  m = 0;
  for (let i of ep) {
    m += 1;
    const name = await Users.getNameUser(i);
    msg += m+". "+name+"\nuser id : "+i+"\nfacebook link: https://facebook.com/"+i+"\n\n";
  }
  msgs += "all users in this group\n\n"+msg;
  reply(msgs)
}