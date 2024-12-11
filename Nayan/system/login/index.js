"use strict";

const utils = require("./utils");
const log = require("npmlog");

let checkVerified = null;

const defaultLogRecordSize = 100;
log.maxRecordSize = defaultLogRecordSize;

function setOptions(globalOptions, options) {
  Object.keys(options).map(function (key) {
    switch (key) {
      case 'online':
        globalOptions.online = Boolean(options.online);
        break;
      case 'logLevel':
        log.level = options.logLevel;
        globalOptions.logLevel = options.logLevel;
        break;
      case 'logRecordSize':
        log.maxRecordSize = options.logRecordSize;
        globalOptions.logRecordSize = options.logRecordSize;
        break;
      case 'selfListen':
        globalOptions.selfListen = Boolean(options.selfListen);
        break;
      case 'selfListenEvent':
        globalOptions.selfListenEvent = options.selfListenEvent;
        break;
      case 'listenEvents':
        globalOptions.listenEvents = Boolean(options.listenEvents);
        break;
      case 'pageID':
        globalOptions.pageID = options.pageID.toString();
        break;
      case 'updatePresence':
        globalOptions.updatePresence = Boolean(options.updatePresence);
        break;
      case 'forceLogin':
        globalOptions.forceLogin = Boolean(options.forceLogin);
        break;
      case 'userAgent':
        globalOptions.userAgent = options.userAgent;
        break;
      case 'autoMarkDelivery':
        globalOptions.autoMarkDelivery = Boolean(options.autoMarkDelivery);
        break;
      case 'autoMarkRead':
        globalOptions.autoMarkRead = Boolean(options.autoMarkRead);
        break;
      case 'listenTyping':
        globalOptions.listenTyping = Boolean(options.listenTyping);
        break;
      case 'proxy':
        if (typeof options.proxy != "string") {
          delete globalOptions.proxy;
          utils.setProxy();
        } else {
          globalOptions.proxy = options.proxy;
          utils.setProxy(globalOptions.proxy);
        }
        break;
      case 'autoReconnect':
        globalOptions.autoReconnect = Boolean(options.autoReconnect);
        break;
      case 'emitReady':
        globalOptions.emitReady = Boolean(options.emitReady);
        break;
      default:
        log.warn("setOptions", "Unrecognized option given to setOptions: " + key);
        break;
    }
  });
}

//new update...
function BypassAutomationNotification(resp, jar, globalOptions, appstate, ID) {
    global.BypassAutomationNotification = BypassAutomationNotification
    try {
        let UID;
        if (ID) UID = ID
        else {
            UID = (appstate.find(i => i.key == 'c_user') || appstate.find(i => i.key == 'i_user'))
            UID = UID.value;
        }
        if (resp !== undefined) {
            if (resp.request.uri && resp.request.uri.href.includes("https://www.facebook.com/checkpoint/")) {
                if (resp.request.uri.href.includes('601051028565049')) {
                    const fb_dtsg = utils.getFrom(resp.body, '["DTSGInitData",[],{"token":"', '","');
                    const jazoest = utils.getFrom(resp.body, 'jazoest=', '",');
                    const lsd = utils.getFrom(resp.body, "[\"LSD\",[],{\"token\":\"", "\"}");

                    const FormBypass = {
                        av: UID,
                        fb_dtsg, jazoest, lsd,
                        fb_api_caller_class: "RelayModern",
                        fb_api_req_friendly_name: "FBScrapingWarningMutation",
                        variables: JSON.stringify({}),
                        server_timestamps: true,
                        doc_id: 6339492849481770
                    }
                    return utils.post("https://www.facebook.com/api/graphql/", jar, FormBypass, globalOptions)
                    .then(utils.saveCookies(jar)).then(function(res) {
                        log.warn("login", "Checkpoint detected. Bypass done...");
                        return process.exit(1);                    
                    });
                }
                else {
                    return resp;
                }
            }
            else {
                return resp
            }
        }
        else {
            return utils.get('https://www.facebook.com/', jar, null, globalOptions).then(function(res) {
                if (res.request.uri && res.request.uri.href.includes("https://www.facebook.com/checkpoint/")) {
                    if (res.request.uri.href.includes('601051028565049')) return { Status: true, Body: res.body }
                    else return { Status: false, Body: res.body }
                }
                else return { Status: false, Body: res.body }
            }).then(function(res) {
                if (res.Status === true) {
                    const fb_dtsg = utils.getFrom(res.Body, '["DTSGInitData",[],{"token":"', '","');
                    const jazoest = utils.getFrom(res.Body, 'jazoest=', '",');
                    const lsd = utils.getFrom(res.Body, "[\"LSD\",[],{\"token\":\"", "\"}");

                    const FormBypass = {
                        av: UID,
                        fb_dtsg, jazoest, lsd,
                        fb_api_caller_class: "RelayModern",
                        fb_api_req_friendly_name: "FBScrapingWarningMutation",
                        variables: JSON.stringify({}),
                        server_timestamps: true,
                        doc_id: 6339492849481770
                    }
                return utils.post("https://www.facebook.com/api/graphql/", jar, FormBypass, globalOptions).then(utils.saveCookies(jar))
                    .then(res => {
                        log.warn("login", "Checkpoint detected. Bypass done.....");
                        return res
                    })
                }
                else return res;

            })
            .then(function(res) {
                return utils.get('https://www.facebook.com/', jar, null, globalOptions, { noRef: true }).then(utils.saveCookies(jar))
            })
            .then(function(res) {
                return process.exit(1)
            })
        }
    }
    catch (e) {
        console.log(e)
    }
}


function buildAPI(globalOptions, html, jar) {
    const fb_dtsg = utils.getFroms(html, '["DTSGInitData",[],{"token":"', '","')[0]; //my brain is not braining on here.

    const maybeCookie = jar.getCookies("https://www.facebook.com").filter(function(val) {
        return val.cookieString().split("=")[0] === "c_user";
    });

    if (maybeCookie.length === 0) throw { error: "Error retrieving userID. This can be caused by a lot of things, including getting blocked by Facebook for logging in from an unknown location. Try logging in with a browser to verify." };

    if (html.indexOf("/checkpoint/block/?next") > -1) log.warn("login", "Checkpoint detected. Please log in with a browser to verify.");

    const userID = maybeCookie[0].cookieString().split("=")[1].toString();
    log.info("login", `Logged in as ${userID}`);

    try {
        clearInterval(checkVerified);
    } catch (_) { }

    const clientID = (Math.random() * 2147483648 | 0).toString(16);

        const CHECK_MQTT = {
            oldFBMQTTMatch: html.match(/irisSeqID:"(.+?)",appID:219994525426954,endpoint:"(.+?)"/),
            newFBMQTTMatch: html.match(/{"app_id":"219994525426954","endpoint":"(.+?)","iris_seq_id":"(.+?)"}/),
            legacyFBMQTTMatch: html.match(/\["MqttWebConfig",\[\],{"fbid":"(.*?)","appID":219994525426954,"endpoint":"(.*?)","pollingEndpoint":"(.*?)"/)
        }

        // all available regions =))
        /**
         * PRN = Pacific Northwest Region
         * VLL = Valley Region
         * ASH = Ashburn Region
         * DFW = Dallas/Fort Worth Region
         * LLA = Los Angeles Region
         * FRA = Frankfurt
         * SIN = Singapore 
         * NRT = Tokyo (Japan)
         * HKG = Hong Kong
         * SYD = Sydney
         */

        let Slot = Object.keys(CHECK_MQTT);
        var mqttEndpoint,region,irisSeqID;
        Object.keys(CHECK_MQTT).map(function(MQTT) {
            if (CHECK_MQTT[MQTT] && !region) {
                switch (Slot.indexOf(MQTT)) {
                    case 0: {
                        irisSeqID = CHECK_MQTT[MQTT][1];
                            mqttEndpoint = CHECK_MQTT[MQTT][2].replace(/\\\//g, "/");
                            region = new URL(mqttEndpoint).searchParams.get("region").toUpperCase();
                        return;
                    }
                    case 1: {
                        irisSeqID = CHECK_MQTT[MQTT][2];
                            mqttEndpoint = CHECK_MQTT[MQTT][1].replace(/\\\//g, "/");
                            region = new URL(mqttEndpoint).searchParams.get("region").toUpperCase();
                        return;
                    }
                    case 2: {
                        mqttEndpoint = CHECK_MQTT[MQTT][2].replace(/\\\//g, "/"); //this really important.
                            region = new URL(mqttEndpoint).searchParams.get("region").toUpperCase();
                        return;
                    }
                }
            return;
            }
        });   

        const regions = [
            {
                code: "PRN",
                name: "Pacific Northwest Region",
                location: "Khu vực Tây Bắc Thái Bình Dương"
            },
            {
                code: "VLL",
                name: "Valley Region",
                location: "Valley"
            },
            {
                code: "ASH",
                name: "Ashburn Region",
                location: "Ashburn"
            },
            {
                code: "DFW",
                name: "Dallas/Fort Worth Region",
                location: "Dallas/Fort Worth"
            },
            {
                code: "LLA",
                name: "Los Angeles Region",
                location: "Los Angeles"
            },
            {
                code: "FRA",
                name: "Frankfurt",
                location: "Frankfurt"
            },
            {
                code: "SIN",
                name: "Singapore",
                location: "Singapore"
            },
            {
                code: "NRT",
                name: "Tokyo",
                location: "Japan"
            },
            {
                code: "HKG",
                name: "Hong Kong",
                location: "Hong Kong"
            },
            {
                code: "SYD",
                name: "Sydney",
                location: "Sydney"
            },
            {
                code: "PNB",
                name: "Pacific Northwest - Beta",
                location: "Pacific Northwest "
            }
        ];

        if (!region) {
            region = ['prn',"pnb","vll","hkg","sin"][Math.random()*5|0];

        }
        if (!mqttEndpoint) {
            mqttEndpoint = "wss://edge-chat.facebook.com/chat?region=" + region;
        }
        log.info('login', `Sever region ${region}`);

        const Location = regions.find(r => r.code === region.toUpperCase());

        const ctx = {
            userID: userID,
            jar: jar,
            clientID: clientID,
            globalOptions: globalOptions,
            loggedIn: true,
            access_token: 'NONE',
            clientMutationId: 0,
            mqttClient: undefined,
            lastSeqId: irisSeqID,
            syncToken: undefined,
            mqttEndpoint: mqttEndpoint,
            region: region,
            firstListen: true,
            req_ID: 0,
            callback_Task: {},
            fb_dtsg
        };

    const api = {
        setOptions: setOptions.bind(null, globalOptions),
        getAppState: function getAppState() {
          const appState = utils.getAppState(jar);
          // filter duplicate
          return appState.filter((item, index, self) => self.findIndex((t) => { return t.key === item.key; }) === index);
        }
      };
    if (region && mqttEndpoint) {
            //fuck this shit..
        }
        else {
            if (bypass_region) {
            }
            else {
                api["htmlData"] = html;
            }
        };
    // if (noMqttData) api["htmlData"] = noMqttData;

    const defaultFuncs = utils.makeDefaults(html, userID, ctx);

require('fs').readdirSync(__dirname + '/src/')
  .filter((v) => v.endsWith('.js'))
  .map((v) => {
    const functionName = v.replace('.js', ''); 
    api[functionName] = require('./src/' + v)(defaultFuncs, api, ctx);
  });

return {
  ctx: ctx,
  defaultFuncs: defaultFuncs,
  api: api
};
}

// unfortunately login via credentials no longer works,so instead of login via credentials, use login via appstate intead.
function loginHelper(appState, email, password, globalOptions, callback, prCallback ) {
    let mainPromise = null;
    const jar = utils.getJar();

    // If we're given an appState we loop through it and save each cookie
    // back into the jar.
    if (appState) {
    // check and convert cookie to appState
    if (utils.getType(appState) === 'Array' && appState.some(c => c.name)) {
      appState = appState.map(c => {
        c.key = c.name;
        delete c.name;
        return c;
      })
    }
    else if (utils.getType(appState) === 'String') {
      const arrayAppState = [];
      appState.split(';').forEach(c => {
        const [key, value] = c.split('=');

        arrayAppState.push({
          key: (key || "").trim(),
          value: (value || "").trim(),
          domain: ".facebook.com",
          path: "/",
          expires: new Date().getTime() + 1000 * 60 * 60 * 24 * 365
        });
      });
      appState = arrayAppState;
    }

    appState.map(function (c) {
      const str = c.key + "=" + c.value + "; expires=" + c.expires + "; domain=" + c.domain + "; path=" + c.path + ";";
      jar.setCookie(str, "http://" + c.domain);
    });

        // Load the main page.
        mainPromise = utils
      .get('https://www.facebook.com/', jar, null, globalOptions, { noRef: true })
      .then(utils.saveCookies(jar));
  } else {
    if (email) {
      throw { error: "Unfortunately login via credentials is no longer work, please use login via appstate instead." };
    }
    else {
      throw { error: "Please provide appstate." };
    }
  }

    function CheckAndFixErr(res, fastSwitch) {
        if (fastSwitch) return res;
            let reg_antierr = /7431627028261359627/gs; // :>
            if (reg_antierr.test(res.body)) {
                const Data = JSON.stringify(res.body);
                const Dt_Check = Data.split('2Fhome.php&amp;gfid=')[1];
                if (Dt_Check == undefined) return res
                const fid = Dt_Check.split("\\\\")[0];//fix
                if (Dt_Check == undefined || Dt_Check == "") return res
                const final_fid = fid.split(`\\`)[0];
                if (final_fid == undefined || final_fid == '') return res;
                const redirectlink = redirect[1] + "a/preferences.php?basic_site_devices=m_basic&uri=" + encodeURIComponent("https://m.facebook.com/home.php") + "&gfid=" + final_fid;
                bypass_region_err = true;
                return utils.get(redirectlink, jar, null, globalOptions).then(utils.saveCookies(jar));
            }
            else return res
        }

      function Redirect(res,fastSwitch) {
    if (fastSwitch) return res;
        var reg = /<meta http-equiv="refresh" content="0;url=([^"]+)[^>]+>/;
        redirect = reg.exec(res.body);
            if (redirect && redirect[1]) return utils.get(redirect[1], jar, null, globalOptions)
        return res;
    }

    let redirect = [1, "https://m.facebook.com/"];
    let bypass_region_err = false;
        var ctx,api;
            mainPromise = mainPromise
                .then(res => Redirect(res))
                .then(res => CheckAndFixErr(res))
                //fix via login with defaut UA return WWW.facebook.com not m.facebook.com
                .then(function(res) {
                    if (global.OnAutoLoginProcess) return res;
                    else {
                        let Regex_Via = /MPageLoadClientMetrics/gs; //default for normal account, can easily get region, without this u can't get region in some case but u can run normal
                        if (!Regex_Via.test(res.body)) {
                            return utils.get('https://www.facebook.com/', jar, null, globalOptions, { noRef: true })
                        }
                        else return res
                    }
                })
                .then(res => BypassAutomationNotification(res, jar, globalOptions, appState))
                .then(res => Redirect(res, global.OnAutoLoginProcess))
                .then(res => CheckAndFixErr(res, global.OnAutoLoginProcess))
                .then(function(res){
                    const html = res.body,Obj = buildAPI(globalOptions, html, jar,bypass_region_err);
                        ctx = Obj.ctx;
                        api = Obj.api;
                    return res;
                });
            if (globalOptions.pageID) {
                mainPromise = mainPromise
                    .then(function() {
                        return utils.get('https://www.facebook.com/' + ctx.globalOptions.pageID + '/messages/?section=messages&subsection=inbox', ctx.jar, null, globalOptions);
                    })
                    .then(function(resData) {
                        const url = utils.getFrom(resData.body, 'window.location.replace("https:\\/\\/www.facebook.com\\', '");').split('\\').join('');
                        url = url.substring(0, url.length - 1);
                        return utils.get('https://www.facebook.com' + url, ctx.jar, null, globalOptions);
                    });
            }
  // At the end we call the callback or catch an exception
  mainPromise
    .then(function () {
      log.info("login", 'Done logging in.');
      return callback(null, api);
    })
    .catch(function (e) {
      log.error("login", e.error || e);
      callback(e);
    });
}

function login(loginData, options, callback) {
    if (utils.getType(options) === 'Function' || utils.getType(options) === 'AsyncFunction') {
        callback = options;
        options = {};
    }

  
    const globalOptions = {
        selfListen: false,
        listenEvents: true,
        listenTyping: false,
        updatePresence: false,
        forceLogin: false,
        autoMarkDelivery: true,
        autoMarkRead: false,
        autoReconnect: true,
        logRecordSize: defaultLogRecordSize,
        online: true,
        emitReady: false,
        userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 14.7; rv:132.0) Gecko/20100101 Firefox/132.0"
    };

    setOptions(globalOptions, options);  

    let prCallback = null;
    if (utils.getType(callback) !== "Function" && utils.getType(callback) !== "AsyncFunction") {
        let rejectFunc = null;
        let resolveFunc = null;
        var returnPromise = new Promise(function(resolve, reject) {
            resolveFunc = resolve;
            rejectFunc = reject;
        });
        prCallback = function(error, api) {
            if (error) return rejectFunc(error);
            return resolveFunc(api);
        };
        callback = prCallback;
    }

    loginHelper(loginData.appState, loginData.email, loginData.password, globalOptions, callback, prCallback);
    return returnPromise;
}

module.exports = login;
