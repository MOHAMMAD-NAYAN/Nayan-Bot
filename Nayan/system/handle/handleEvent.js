module.exports = function ({api ,models, Users, Threads, Currencies }) {
    const logger = require("../../catalogs/Nayanc.js");
    const moment = require("moment");
    return function ({ event }) {
        const timeStart = Date.now()
        const time = moment.tz("Asia/Manila").format("HH:MM:ss L");
        const { userBanned, threadBanned } = global.data;
        const { events } = global.client;
        const { allowInbox } = global.Nayan;
        const { developermode, APPROVED, approval, PREFIX } = global.config;
        var { senderID, threadID } = event;
        senderID = String(senderID);
        threadID = String(threadID);
      const notApproved = `this box is not approved.\nuse "${PREFIX}request" to send a approval request from bot operators`;
        if (!APPROVED.includes(threadID) && approval) {
          return api.sendMessage(notApproved, threadID, async (err, info) => {
            if (err) {
              return logger.error(`can't send the message`)
            }
            await new Promise(resolve => setTimeout(resolve, 5 * 1000));
            return api.unsendMessage(info.messageID); 
          });
        }
        if (userBanned.has(senderID)|| threadBanned.has(threadID) || allowInbox == ![] && senderID == threadID) return;
        for (const [key, value] of events.entries()) {
            if (value.config.eventType.indexOf(event.logMessageType) !== -1) {
                const eventRun = events.get(key);
                try {
                    const Obj = {};
                    Obj.api = api
                    Obj.event = event
                    Obj.models= models 
                    Obj.Users= Users 
                    Obj.Threads = Threads
                    Obj.Currencies = Currencies 
                    eventRun.run(Obj);
                    if (developermode == !![]) 
                      logger(global.getText('handleEvent', 'executeEvent', time, eventRun.config.name, threadID, Date.now() - timeStart) + '\n', 'event');
                } catch (error) {
                    logger(global.getText('handleEvent', 'eventError', eventRun.config.name, JSON.stringify(error)), "error");
                }
            }
        }
        return;
    };
}