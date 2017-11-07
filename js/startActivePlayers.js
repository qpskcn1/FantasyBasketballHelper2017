var days = 2;
var result = [];
var url = window.location.href;
var url_re = /https:\/\/basketball.fantasysports.yahoo.com\/nba\/\d+\/\d+/;
if (url.match(url_re)){
	var button = $("a:contains('Start Active Players')");
	var buttonClass = button.attr("class");
	var newButton = $("<span>", {"class":buttonClass});
	newButton.text("Start Active Players for Next 7 Days");
	$(newButton).insertAfter(button);
	$(newButton).click(function() {
  		execute(button.attr("href"));
	});
}

function execute(button_href) {
	var date_re = /([12]\d{3})-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])/;
	var currentDate = button_href.match(date_re);
	var executeDate = new Date(currentDate[0]);
	var execute_href = button_href;
	// Start Active Players For 'days'
	for (var i = 0; i < days; i++) { 
		executeDate.setDate(executeDate.getDate()+1);
		var dateStr = executeDate.toISOString().slice(0,10)
		execute_href = execute_href.replace(date_re, dateStr);
		openWindow(execute_href, dateStr);
	}
	// Start Active Players For current date
	var currentWnd = window.open(button_href);
	validation(currentWnd, currentDate[0])
	console.log(result)
}

function openWindow(execute_href, dateStr) {
	var wnd = window.open(execute_href);
	validation(wnd, dateStr)
}

function validation(wnd, dateStr) {
	wnd.onload = function() {
		var valid = false;
		var benchRows = $("tr[data-pos=BN] > .Ta-start.Nowrap.Bdrend > div")
		console.log(benchRows)
		result.push({
			key: dateStr,
			value: valid
		});
		wnd.close();
	};
}