module.exports.config = {
	name: "getlink",
    version: "1.0.0",
    permission: 0,
    credits: "nayan",
    description: "Get the URL Download from Video, Audio is sent from the group",
    prefix: true,
    category: "user",
    usages: "",
    cooldowns: 5,
};

module.exports.languages = {
	"vi": {
		"invaidFormat": "❌ Tin nhắn bạn phản hồi phải là một audio, video, ảnh nào đó"
	},
	"en": {
		"invaidFormat": "❌ Your need reply a message have contain an audio, video or picture"
	}
}

module.exports.run = async ({ api, event, getText }) => {
	if (event.type !== "message_reply") return api.sendMessage(getText("invaidFormat"), event.threadID, event.messageID);
	if (!event.messageReply.attachments || event.messageReply.attachments.length == 0) return api.sendMessage(getText("invaidFormat"), event.threadID, event.messageID);
	if (event.messageReply.attachments.length > 1) return api.sendMessage(getText("invaidFormat"), event.threadID, event.messageID);
	return api.sendMessage(event.messageReply.attachments[0].url, event.threadID, event.messageID);
}