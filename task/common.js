const request = require('request');

function renderIWantTitle(req,resp,urlList){

	var html  = `
<html>
<head></head>
<body>
    <h1> Following are the titles of given websites: </h1>
    <ul>
`
	urlList.forEach(function(obj,i){
		html += `<li> ${obj.url} - ${obj.title} </li> `
	});

	html += `
    </ul>
</body>
</html>
`

	resp.send(html)

}


function getUrlTitle(url, setTitle){

	var tUrl = url;
	if(!tUrl.startsWith("http://") && !tUrl.startsWith("https://")){
		tUrl = "http://" + tUrl;
	}
	request(tUrl, function(error, res, html){
		var title = "";
		if(!error && res.statusCode == 200){

			//extract title tag using regex
			var titleRegex = new RegExp("<title>(.*?)</title>", "g");
			var matches = html.match(titleRegex);
			//debugLog(matches);

			if(matches != null && matches.length > 0){
				title = matches[0].replace("<title>","").replace("</title>","");
			}
			else{
				//no title tag found
			}

			title = `"${title}"`;

		}
		else{
			title = "NO RESPONSE";
		}
		debugLog(`${url} - ${title}`);
		setTitle(url,title);
    })
}


var isDebug = true;
function setDebug(debug){
	isDebug = debug;
}
function debugLog(str){
	if(isDebug){
		console.log(str);
	}
}


module.exports.renderIWantTitle = renderIWantTitle;
module.exports.getUrlTitle = getUrlTitle;
module.exports.setDebug = setDebug;
module.exports.debugLog = debugLog;