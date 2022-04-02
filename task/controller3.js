const RSVP = require('rsvp');
const request = require('request');
const common = require('./common');


//--------------------------------
// for task 3 , using Promises
//--------------------------------
function iWantTitleController(req, resp){
	common.debugLog('Using controler 3')

	var urls = [];
	var address = req.query.address;
	if(address){
		urls = urls.concat(address).map(function(url){ return url.trim()});
		common.debugLog(urls);
	}

	//make array of url getTitle promises , return url,title object for success
	var urlPromises = urls.map(function(url) {
		return getUrlTitlePromise(url);
	});

	//run all promises in parallel
	//making a new promise which return list of all success results of all promises
	RSVP.all(urlPromises)
	.then(function(urlObjList) {
		common.renderIWantTitle(req,resp,urlObjList);
	})
	.catch(function(err){
		common.debugLog(`something went unexpectedly wrong : ${err}`);
	});

}

function getUrlTitlePromise(url){

	var tUrl = url;
	if(!tUrl.startsWith("http://") && !tUrl.startsWith("https://")){
		tUrl = "http://" + tUrl
	}

	return new RSVP.Promise(function(resolve, reject){
        getUrlPromise(tUrl)
        .then(function(html){
        	var title = "";
        	//extract title tag using regex
			var titleRegex = new RegExp("<title>(.*?)</title>", "g");
			var matches = html.match(titleRegex);
			common.debugLog(matches);

			if(matches != null && matches.length > 0){
				title = matches[0].replace("<title>","").replace("</title>","");
			}
			else{
				//common.debugLog(html);
			}

			title = `"${title}"`;

			resolve({
				url : url,
				title : title
			});
        })
        .catch(function(err){
        	resolve({
				url : url,
				title : "NO RESPONSE"
			});
        });
    });
}


function getUrlPromise(url){
	common.debugLog("getURLPromise " + url);
	return new RSVP.Promise(function(resolve, reject){
        request(url, function(error, res, html){
        	// common.debugLog(`-------\n ${url}\n ${res}\n ${error}\n-------`);
            if(!error && res.statusCode == 200){
            	return resolve(html);
			}
			else{
				return reject(error);
			}
        });
    });
}

module.exports.iWantTitleController = iWantTitleController;