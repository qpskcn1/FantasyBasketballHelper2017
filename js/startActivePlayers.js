var days = 4;
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
		result = []
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
		execute_href = execute_href.replace(date_re);
		openWindow(execute_href);
	}
	// Start Active Players For current date
	var currentWnd = window.open(button_href);
	validation(currentWnd, currentDate[0])
	console.log(result)
}

function openWindow(execute_href) {
	var wnd = window.open(execute_href);
	validation(wnd)
}

function validation(wnd) {
	$(wnd).load(function() {
		var altPlayers = [];
		var benchRows = $("tr[data-pos=BN] > .Ta-start.Nowrap.Bdrend");
		$("tr[data-pos=BN] > .Ta-start.Nowrap.Bdrend").each(function(index) { 
			altPlayers[index] = $(this).has('a').siblings('.player').find('.name').text()
		});
		result.push({
			key: $(".flyout-title")[0].textContent,
			value: altPlayers
		});
		wnd.close();
	});
}