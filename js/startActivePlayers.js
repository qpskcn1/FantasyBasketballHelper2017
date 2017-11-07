var days = 2;
var result = [];
var url = window.location.href;
var url_re = /https:\/\/basketball.fantasysports.yahoo.com\/nba\/\d+\/\d+/;
if (url.match(url_re)){
    var button = $("a:contains('Start Active Players')");
    // Make sure the button exists
    if (button.length != 0) {
        var buttonClass = button.attr("class");
        var newButton = $("<span>", {"class":buttonClass});
        newButton.text("Start Active Players for Next 7 Days");
        $(newButton).insertAfter(button);
        $(newButton).click(function() {
            // Clear local storage
            chrome.storage.local.clear(function() {
                var error = chrome.runtime.lastError;
                if (error) {
                    console.error(error);
                }
            });
            // var now = new Date();
            // chrome.storage.local.set({'time': now}, function() {
            //     console.log('Action time: %s', now);
            // });      
            execute(button.attr("href"));      
            console.log(result);
        });
    }
}

function execute(button_href) {
    // Get date from button href
    var date_re = /([12]\d{3})-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])/;
    var currentDate = button_href.match(date_re);
    var executeDate = new Date(currentDate[0]);
    var execute_href = button_href;
    // Start Active Players For 'days'
    for (var i = 0; i < days; i++) { 
        executeDate.setDate(executeDate.getDate()+1);
        execute_href = execute_href.replace(date_re, executeDate.toISOString().slice(0,10));
        var wnd = window.open(execute_href);
        validation(wnd);
    }
    // Start Active Players For current date
    var curWnd = window.open(button_href);
    validation(curWnd);
}

function validation(wnd, close = true) {
    $(wnd).on('load', function() {
    //wnd.addEventListener('DOMContentLoaded', function() {
        var altPlayers = [];
        var benchRows = wnd.document.querySelectorAll("tr[data-pos=BN] > .Ta-start.Nowrap.Bdrend");
        $(benchRows).each(function(index) { 
            altPlayers[index] = $(this).has('a').siblings('.player').find('.name').text();
        });
        // Remove empty strings
        altPlayers = altPlayers.filter(v=>v!="");
        date = wnd.document.getElementsByClassName("flyout-title")[0].textContent;
        if (close) wnd.close();
        chrome.storage.local.set({[date]: [altPlayers, wnd.location.href]}, function() {
            console.log(wnd.location.href)
            console.log('Validation result saved');
        });
    });
}