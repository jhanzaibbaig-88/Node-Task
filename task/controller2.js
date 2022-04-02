const async = require('async');
const common = require('./common');


//--------------------------------
// for task 2 , using control flow library async.js
//--------------------------------
function iWantTitleController(req, resp){
	common.debugLog('Using controler 2');

	var urls = [];
	var address = req.query.address;
	if(address){
		urls = urls.concat(address).map(function(url){ return url.trim()});
		common.debugLog(urls);
	}

	var parallelFuncList = urls.map(function(url) {

		return function(callback){

			var setTitle = function(url,title){
				var retObj = {
					url : url,
					title : title
				};

				callback(null, retObj);
			};

			common.getUrlTitle(url, setTitle);
		};
	});


	async.parallel(parallelFuncList, function(err, urlObjList){
		if(err){
			common.debugLog(`something went unexpectedly wrong : ${err}`);
		}

		common.renderIWantTitle(req,resp,urlObjList);
	});

}

module.exports.iWantTitleController = iWantTitleController;