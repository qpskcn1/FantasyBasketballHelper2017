chrome.storage.local.get(null, function(data) {
    if(typeof data == "undefined") {
        // That's kind of bad
    } else {
        output(data);
        //str = JSON.stringify(data)
		//document.getElementById("result").innerText = str;
    }
});


function output(data) {
	var now = new Date();
	$('#result').append($('<p> Last Action: '+ now + '</p>'));
	$.each(data, function(date, value) {
		date = date.replace(/\s+/g, '');
		resultStr = date + ": "
		if (value[0].length != 0) {
			resultStr += "- Alternate " + value[0];
		} else {
			resultStr += "Success!";
		}
		$('#result').append($('<br /><a href="' + value[1] + '">'+ resultStr + '</a>'));
		resultStr += "</a>\n";
	});
	return resultStr;
}

