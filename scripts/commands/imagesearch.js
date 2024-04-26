
module.exports.config = {

	name: "searchimage",
	version: "1.0.0",
	permission: 0,
	credits: "nayan",
	prefix: true,
	description: "search an image",
	category: "with prefix",
	usages: "searchimage [text]",
	cooldowns: 60,
	dependencies: {
		"axios":"",
		"fs-extra":"",
		"googlethis":"",
    "cloudscraper":""
	}
};




module.exports.run = async ({matches, event, api, extra, args}) => {
    
    const axios = global.nodemodule['axios'];
    const google = global.nodemodule["googlethis"];
const cloudscraper = global.nodemodule["cloudscraper"];
const fs = global.nodemodule["fs"];

var query = (event.type == "message_reply") ? event.messageReply.body : args.join(" ");
  //let query = args.join(" ");
  api.sendMessage(`searching for ${query}`, event.threadID, event.messageID);
  
  let result = await google.image(query, {safe: false});
  if(result.length === 0) {
    api.sendMessage(`your image search did not return any result.`, event.threadID, event.messageID)
    return;
  }
  
  let streams = [];
  let counter = 0;
  
  console.log(result)
  
  for(let image of result) {
    // Only show 6 images
    if(counter >= 20)
      break;
      
    console.log(`${counter} : ${image.url}`);
    
    // Ignore urls that does not ends with .jpg or .png
    let url = image.url;
    if(!url.endsWith(".jpg") && !url.endsWith(".png"))
      continue;
    
   let path = __dirname + `/cache/search-image-${counter}.jpg`;
    let hasError = false;
    await cloudscraper.get({uri: url, encoding: null})
      .then((buffer) => fs.writeFileSync(path, buffer))
      .catch((error) => {
        console.log(error)
        hasError = true;
      });
      
    if(hasError)
      continue;
    
    console.log(`pushed to streams : ${path}`) ;
    streams.push(fs.createReadStream(path).on("end", async () => {
      if(fs.existsSync(path)) {
        fs.unlink(path, (err) => {
          if(err) return console.log(err);
            
          console.log(`deleted file : ${path}`);
        });
      }
    }));
    
    counter += 1;
  }
  
  api.sendMessage("sending search result.", event.threadID, event.messageID)
  
  let msg = {
    body: `image search result for ${query}\n\nfound : ${result.length} image${result.length > 1 ? 's' : ''}\nonly showing : 20 images.`,
    attachment: streams
  };
  
  api.sendMessage(msg, event.threadID, event.messageID);
};



  