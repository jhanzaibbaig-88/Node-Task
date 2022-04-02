const common = require('./common')

//--------------------------------
// for task 1 , without using any control flow abstracting library
//--------------------------------
function iWantTitleController(req, resp){
	common.debugLog('Using controler 1');

	var urls = []; //['http://www.google.com','asdfsdf','http://www.wikipedia.com']

	var address = req.query.address;
	if(address){
		urls = urls.concat(address).map(function(url){ return url.trim()});
		common.debugLog(urls);
	}

	var titleList = [];
	var respCount = 0;

	if(urls.length > 0 ){

		var setTitleAndRender = function(url, title){

			titleList[url] = title;
			respCount++;

			//if all urls processed then render response
			if(respCount === urls.length){

				var urlTitleList = urls.map(function(url){
					return {
						url : url,
						title  : titleList[url]
					};
				})

				common.renderIWantTitle(req,resp,urlTitleList);
			}
		}

		urls.forEach(function(url,i){

			common.getUrlTitle(url,setTitleAndRender)

		});

	}
	else{
		common.renderIWantTitle(req,resp,[]);
	}

}

module.exports.iWantTitleController = iWantTitleController;