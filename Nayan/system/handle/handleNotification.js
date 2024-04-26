module.exports = function ({ api }) {
    const moment = require("moment");
    const botID = api.getCurrentUserID();
    const form = {
        av: botID,
        fb_api_req_friendly_name: "CometNotificationsDropdownQuery",
        fb_api_caller_class: "RelayModern",
        doc_id: "5025284284225032",
        variables: JSON.stringify({
            "count": 5,
            "environment": "MAIN_SURFACE",
            "menuUseEntryPoint": true,
            "scale": 1
        })
    };
    try {
        api.httpPost("https://www.facebook.com/api/graphql/", form, (e, i) => {
            var a = JSON.parse(i);
            var data = a.data.viewer
            const get_minutes_of_time = (d1, d2) => {
                let ms1 = d1.getTime();
                let ms2 = d2.getTime();
                return Math.ceil((ms2 - ms1) / (60 * 1000));
            };
            for (let i of data.notifications_page.edges) {
                if (i.node.row_type !== 'NOTIFICATION') continue
                var audio = data.notifications_sound_path[1];
                var count = data.notifications_unseen_count
                var body = i.node.notif.body.text
                var link = i.node.notif.url
                var timestemp = i.node.notif.creation_time.timestamp
                var time = moment.tz("Asia/Manila").format("HH:mm:ss DD/MM/YYYY")
                if (get_minutes_of_time(new Date(timestemp * 1000), new Date()) <= 1) {
                    var msg = "" + 
                        "notification\n" +
                        "\ntime : " + time + 
                        "\nmessage : " + body +
                        "\n\nlink : " + link
                    api.sendMessage(msg, global.config.OPERATOR[0])
                }
            }
        });
    }
    catch(e) {
        logger.error(`an error occurred while sending the notification : ${e}`)
    }
}
